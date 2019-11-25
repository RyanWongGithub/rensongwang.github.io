---
title: 个人项目：基于预线程化的并发Web服务器
tags:
  - 并发Web服务器
categories:
  - 项目
date: 2019-08-20 15:47:14
photo:
---

{% note default %}
之前根据学习的HTTP事务学着写了一个Web服务器，在这个基础上，想要实现服务器同时服务多个客户端我知道的，可以用多进程实现，之前写的回射服务器就是，IO多路复用也行，后期打算深入理解一下IO多路复用，多线程并发也许很好？但是后面看了C10K的问题，最后根据自己的参考资料确定就用预线程化的并发。
{% endnote %}

<!-- more -->
## 基于预线程化实现并发的思路

---

利用一个生产者多个消费者的生产者-消费者模型来实现并发。
服务器的监听描述符负责接收客户端连接，从accept返回后将**已连接描述符**加入缓冲区，预先可以设置缓冲区大小。
那么服务端就是那一个生产者，负责往缓冲区里放入资源，要争夺的是一个可以放资源的空槽位。
消费者就是我们的工作线程，往缓冲区里抢资源，争夺的是一个可用资源。

那么我们总共需要三个信号量，一个互斥锁、一个空槽位、一个可用资源。其中空槽位和可用资源是相对的。这里我们直接使用了CSAPP中的SBUF包，但是我觉得可能还不够，可以还在这个基础上再做改进。最后会放所有源代码。

## 在预线程化的基础上的拓展

---

我们知道C10K问题就是：当某一时刻客户访问量很大时，服务端的负载也很急剧增大，如果单纯使用多进程或是多线程来实现并发的话，会耗费系统很大的资源与空间，最后同样也会崩溃。一般来说，解决C10K问题的方法就是采用多路复用：epoll。

那么给我们的预线程化的Web服务器带来的思考是什么呢？
这个预线程化的模型就好像是**在一个限定空间里有多个买票窗口一样**（比喻不是很贴切，但是也很直观）。工作线程就像是买票窗口。如果一时间内，买票客户突然增多，那么就只有几个窗口肯定忙不过来，缓冲区里的已连接描述符就会累积起来，最后挤满缓冲区，服务器阻塞在往缓冲区里插入资源，买票的人少了，我开那么窗口也是闲着。
因此我们需要的是根据客流情况也就是**缓冲区中的满空情况来动态增减工作线程的数量**。

## 开发过后一些个人的思考

---

开发过后经过测试，当缓冲区为满时，会把当前工作线程的数量增加至两倍，当缓冲区为空时，会将当前工作线程的数量降为一半。
**但是**,我细细思考过后，发现一个**很严重的问题**，增加工作线程很好办，但是减少工作线程意味着要把这个线程取消，终止线程，涉及到的函数就是pthread_cancel(pthread_t tid)，这倒也没什么，问题在于我写的代码中，在服务器的循环接收请求的主体中通过判断缓冲区为空还是慢的情况来进行操作线程的数量，增加线程，pthread_create就好了，**然而取消线程却有着复杂的逻辑问题**。

我在往缓冲区里放入资源时，判断为不为空，为空的话就减少一半的线程，可要是某一时刻（判断为空与插入资源中间入，这个时候缓冲区为空），我的工作线程全都在工作（忙于处理跟客户的业务，不能抢资源接活），恰好我还有一个空闲的线程，等我一插入，空闲线程接了活，我一判断，为空，然后开始杀死一半的线程，可是**我的线程都在努力的工作呀**。
**<font color="red">总结一下，这个问题就是，缓冲区为空与否并不能直接代表我的线程是否空闲!</font>**，相当于我写的程序里，只默认一种情况，那就是为空，那么好多人都空闲着，裁员。

**然而，判断一个线程的工作情况是什么样的，是阻塞在抢资源呢？还是忙于工作呢？目前的我根本没有办法判断。**
所以我设计的这个服务器是目前只支持短连接，也就是说，你买完票就走（不存在线程一直服务的情况），不能一直占着窗口不走，其实这种情况也还好，长连接总有个超时时间，问题就在于这个服务器的稳定性与安全性，如果在短时间内遇到大量的那种只连接不干事（占着茅坑不拉屎）的客户（刚刚好占了所有窗口），服务器就会很容易误以为客流量很少，会不断杀死线程，最后导致效率下降。

动态增减线程不够，动态扩缩容缓冲区？
---
还是买票那个例子，虽然处理效率还是得看工作线程，但是为了**不让服务器阻塞在插入资源**，缓冲区的大小也可以考虑动态的扩缩容。

最后减少线程数量测试结果
---

---

减少线程数量是没有问题的，BUG还是我上面说的问题，还在忙呢您给开除了，结果是客户这边输入什么东西都得不到响应，是未知错误。

## 源码以及实现细节
服务器
```
//基于上一个版本通过预线程化来实现并发
//通过简单的200多行代码来实现一个虽小但是功能齐全的Web服务器。
//先实现迭代服务器，客户端的请求用doit函数封装。
//另外还需要错误处理函数，提供静态内容函数，提供动态内容函数，获取文件类型函数，忽略请求报头函数，解析URI函数

#include "csapp.h"
#include "sbuf.h"

void doit(int fd);
void clienterror(int fd, char *cause, char *errnum, char *shortmsg, char *longmsg);
void serve_static(int fd, char *filename, int filesize);
void serve_dynamic(int fd, char *filename, char *cgiargs);
void get_filetype(char *filename, char *filetype);
void read_requesthdrs(rio_t *rp);
int parse_uri(char *uri, char *filename, char *cgiargs);

void *thread(void *vargp);

#define SBUFSIZE 4
#define NTHREADS 4

sbuf_t sbuf;

int main(int argc, char **argv)
{
	int listenfd, connfd;
	char hostname[MAXLINE], port[MAXLINE];
	socklen_t clientlen;
	struct sockaddr_in clientaddr;

	int pthreadsize = 4;
	int i;
	pthread_t *tid = (pthread_t *)Calloc(pthreadsize, sizeof(pthread_t));

	/*if(argc != 2)
	{
		fprintf(stderr, "usage: %s <port>\n", argv[0]);
		exit(1);
	}*/

	listenfd = Open_listenfd(7777);

	sbuf_init(&sbuf, SBUFSIZE);
	for(i = 0; i < NTHREADS; ++i)
	{
		Pthread_create(&tid[i], NULL, thread, NULL);
	}

	while(1)
	{
		if((sbuf.rear - sbuf.front) == 0)
		{
			//限制最小工作线程数量，不能一直减没有底线！
			//if(pthreadsize >= 8)
			//{
				int j;
				pthread_t *newtid = (pthread_t *)Calloc(pthreadsize/2, sizeof(pthread_t));
				for(j = 0; j < pthreadsize/2; j++)
				{
					newtid[j] = tid[j];
				}
				for(; j < pthreadsize; j++)
				{
					pthread_cancel(tid[j]);
				}
				pthread_t *tmp = tid;
				tid = newtid;
				Free(tmp);
				pthreadsize = pthreadsize / 2;
				printf("half now:%d\n", pthreadsize);
			//}
		}

		if((sbuf.rear - sbuf.front) == sbuf.n)
		{
			int j;
			pthread_t *newtid = (pthread_t *)Calloc(pthreadsize*2, sizeof(pthread_t));
			for(j = 0; j < pthreadsize; j++)
			{
				newtid[j] = tid[j];
			}
			for(; j < pthreadsize*2; j++)
			{
				//这里之前写成tid[j],我还以为是我操作动态内存不当！
				Pthread_create(&newtid[j], NULL, thread, NULL);
			}
			pthread_t *tmp = tid;
			tid = newtid;
			Free(tmp);

			pthreadsize = pthreadsize * 2;
			printf("double now:%d\n", pthreadsize);
		}

		clientlen = sizeof(clientaddr);
		connfd = Accept(listenfd, (SA *)&clientaddr, &clientlen);
		//Getnameinfo((SA *) &clientaddr, clientlen, hostname, MAXLINE, port, MAXLINE, 0);
		//这里getnameinfo不知道怎么搞得用不了，所以我还是用的inep_ntoa
		printf("Accept from %s %d\n", inet_ntoa(clientaddr.sin_addr), clientaddr.sin_port);

		sbuf_insert(&sbuf, connfd);
		//doit(connfd);//HTTP事务处理
		//Close(connfd);//处理事务完毕直接关闭连接
		//这里睡两秒的原因是，之前测试一直很难有减少线程的情况，所以我猜想应该是工作线程还没来得及抢的原因！
		sleep(2);
	}
}

void *thread(void *vargp)
{
	Pthread_detach(pthread_self());
	while(1)
	{
		//pthread_testcancel();//测试取消
		int connfd = sbuf_remove(&sbuf);
		doit(connfd);
		Close(connfd);

		//测试取消放后面是因为等工作完了再取消。这个与pthread_testcancel()函数有关！
		//但是实践证明，在处理事务中就被关闭啦，可能是因为doit里面有涉及系统调用！
		pthread_testcancel();
	}
}


void doit(int fd)
{
	int is_static;
	struct stat sbuf;
	char buf[MAXLINE], method[MAXLINE], uri[MAXLINE], version[MAXLINE];
	char filename[MAXLINE], cgiargs[MAXLINE];
	rio_t rio;

	//从客户端fd读取请求行和请求头到buf
	Rio_readinitb(&rio, fd);
	Rio_readlineb(&rio, buf, MAXLINE);

	printf("request header:%s\n", buf);

	sscanf(buf, "%s %s %s", method, uri, version);

	//只处理GET方法，其他一律返回错误信息
	if(strcasecmp(method, "GET"))
	{
		clienterror(fd, method, "501", "Not implemented", "Song does not implement this method");
		return ;
	}

	//忽略请求报头
	read_requesthdrs(&rio);

	//解析uri
	is_static = parse_uri(uri, filename, cgiargs);

	//
	if(stat(filename, &sbuf) < 0)
	{
		clienterror(fd, filename, "404", "Not found", "Song can't find the file");
		return;
	}

	if(is_static)
	{
		if(!(S_ISREG(sbuf.st_mode)) || !(S_IRUSR & sbuf.st_mode))
		{
			clienterror(fd, filename, "403", "Forbidden", "Song can't read the file");
			return;
		}
		serve_static(fd, filename, sbuf.st_size);
	}
	else
	{
		if(!(S_ISREG(sbuf.st_mode)) || !(S_IRUSR & sbuf.st_mode))
		{
			clienterror(fd, filename, "403", "Forbidden", "Song can't run the file");
			return;
		}
		serve_dynamic(fd, filename, cgiargs);
	}

}

void clienterror(int fd, char *cause, char *errnum, char *shortmsg, char *longmsg)
{
	char buf[MAXLINE], body[MAXLINE];

	//
	sprintf(body, "<html><title>Song Error</title>");
	sprintf(body, "%s<body bgcolor=""ffffff"">\r\n", body);
	sprintf(body, "%s%s: %s\r\n", body, errnum, shortmsg);
	sprintf(body, "%s<p>%s: %s\r\n", body, longmsg, cause);
	sprintf(body, "%s<hr><em>The Song Web server</em>\r\n", body);

	//
	sprintf(buf, "HTTP/1.0 %s %s\r\n", errnum, shortmsg);
	Rio_writen(fd, buf, strlen(buf));

	sprintf(buf, "Conent-Type: text/html\r\n");
	Rio_writen(fd, buf, strlen(buf));

	sprintf(buf, "Conent-Length: %d\r\n", (int)strlen(body));
	Rio_writen(fd, buf, strlen(buf));

	Rio_writen(fd, body, strlen(body));
}

void read_requesthdrs(rio_t *rp)
{
	char buf[MAXLINE];

	Rio_readlineb(rp, buf, MAXLINE);
	while(strcmp(buf, "\r\n"))
	{
		Rio_readlineb(rp, buf, MAXLINE);
		printf("%s\n", buf);
	}
	return;
}

int parse_uri(char *uri, char *filename, char *cgiargs)
{
	char *ptr;
	if(!strstr(uri, "cgi-bin"))
	{
		strcpy(cgiargs, "");
		strcpy(filename, ".");
		strcat(filename, uri);
		if(uri[strlen(uri) - 1] == '/')
		{
			strcat(filename, "home.html");
		}
		return 1;
	}
	else
	{
		ptr = index(uri, '?');
		if(ptr)
		{
			strcpy(cgiargs, ptr+1);
			*ptr = '\0';
		}
		else
			strcpy(cgiargs, "");

		strcpy(filename, ".");
		strcat(filename, uri);

		return 0;
		
	}
}

void serve_static(int fd, char *filename, int filesize)
{
	int srcfd;
	char *srcp, filetype[MAXLINE], buf[MAXLINE];

	//
	get_filetype(filename, filetype);
	sprintf(buf, "HTTP/1.0 200 OK\r\n");
	sprintf(buf, "%sServer: Song Web Server\r\n", buf);
	sprintf(buf, "%sConnection: colse\r\n", buf);
	sprintf(buf, "%sContent-Type: %s\r\n", buf, filetype);
	sprintf(buf, "%sContent-Length: %d\r\n\r\n", buf, filesize);

	Rio_writen(fd, buf, strlen(buf));
	printf("Response header: %s\n", buf);

	srcfd = Open(filename, O_RDONLY, 0);
	srcp = Mmap(0, filesize, PROT_READ, MAP_PRIVATE, srcfd, 0);
	Close(srcfd);

	Rio_writen(fd, srcp, filesize);
	Munmap(srcp, filesize);
}

void get_filetype(char *filename, char*filetype)
{
	if(strstr(filename, ".html"))
	{
		strcpy(filetype, "text/html");
	}
	else if(strstr(filename, ".gif"))
	{
		strcpy(filetype, "image/gif");
	}
	else if(strstr(filename, ".png"))
	{
		strcpy(filetype, "image/png");
	}
	else if(strstr(filename, ".jpg"))
	{
		strcpy(filetype, "image/jpeg");
	}
	else	
		strcpy(filetype, "text/plain");
}

void serve_dynamic(int fd, char *filename, char *cgiargs)
{
	char buf[MAXLINE], *emptylist[] = { NULL };

	sprintf(buf, "HTTP/1.0 200 OK\r\n");
	Rio_writen(fd, buf, strlen(buf));

	sprintf(buf, "Server: Song Web Server\r\n");
	Rio_writen(fd, buf, strlen(buf));

	if(Fork() == 0)
	{
		setenv("QUERY_STRING", cgiargs, 1);
		Dup2(fd, STDOUT_FILENO);
		Execve(filename, emptylist, environ);
	}
	Wait(NULL);
}
```

SBUF包
```
#ifndef __SBUF_H__
#define __SBUF_H__

#include "csapp.h"

/* $begin sbuft */
typedef struct {
    int *buf;          /* Buffer array */         
    int n;             /* Maximum number of slots */
    int front;         /* buf[(front+1)%n] is first item */
    int rear;          /* buf[rear%n] is last item */
    sem_t mutex;       /* Protects accesses to buf */
    sem_t slots;       /* Counts available slots */
    sem_t items;       /* Counts available items */
} sbuf_t;
/* $end sbuft */

void sbuf_init(sbuf_t *sp, int n);
void sbuf_deinit(sbuf_t *sp);
void sbuf_insert(sbuf_t *sp, int item);
int sbuf_remove(sbuf_t *sp);

#endif /* __SBUF_H__ */

```
```
/* $begin sbufc */
#include "csapp.h"
#include "sbuf.h"

/* Create an empty, bounded, shared FIFO buffer with n slots */
/* $begin sbuf_init */
void sbuf_init(sbuf_t *sp, int n)
{
    sp->buf = Calloc(n, sizeof(int)); 
    sp->n = n;                       /* Buffer holds max of n items */
    sp->front = sp->rear = 0;        /* Empty buffer iff front == rear */
    Sem_init(&sp->mutex, 0, 1);      /* Binary semaphore for locking */
    Sem_init(&sp->slots, 0, n);      /* Initially, buf has n empty slots */
    Sem_init(&sp->items, 0, 0);      /* Initially, buf has zero data items */
}
/* $end sbuf_init */

/* Clean up buffer sp */
/* $begin sbuf_deinit */
void sbuf_deinit(sbuf_t *sp)
{
    Free(sp->buf);
}
/* $end sbuf_deinit */

/* Insert item onto the rear of shared buffer sp */
/* $begin sbuf_insert */
void sbuf_insert(sbuf_t *sp, int item)
{
    P(&sp->slots);                          /* Wait for available slot */
    P(&sp->mutex);                          /* Lock the buffer */
    sp->buf[(++sp->rear)%(sp->n)] = item;   /* Insert the item */
    V(&sp->mutex);                          /* Unlock the buffer */
    V(&sp->items);                          /* Announce available item */
}
/* $end sbuf_insert */

/* Remove and return the first item from buffer sp */
/* $begin sbuf_remove */
int sbuf_remove(sbuf_t *sp)
{
    int item;
    P(&sp->items);                          /* Wait for available item */
    P(&sp->mutex);                          /* Lock the buffer */
    item = sp->buf[(++sp->front)%(sp->n)];  /* Remove the item */
    V(&sp->mutex);                          /* Unlock the buffer */
    V(&sp->slots);                          /* Announce available slot */
    return item;
}
/* $end sbuf_remove */
/* $end sbufc */


```












--- 

