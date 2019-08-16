---
title: socket编程实现tcp并发回射服务器客户端程序
tags:
  - tcp编程
categories:
  - 网络编程
date: 2019-08-16 14:58:37
photo:
---

{% note default %}
由于对于多种IO模型不熟悉，并且，以前写的上传下载服务器早已遗忘，且对于网络编程这一块理解还不够透彻，于是通过编写一个简单的服务器客户端程序来理一遍，也对于高并发服务器开发的认识做一个铺垫。
{% endnote %}

<!-- more -->

## 预备知识
在进行编程之前，我们先要准备一些备菜。
套接字：socket。
从操作系统的角度来看，套接字就是一个文件，内核为每一个套接字分配一个文件描述符。就像操作磁盘啊其他什么设备一样，我们可以利用IO对文件进行读写，套接字就是用来在网络上对其他主机上的进程进行读写。
所以，我们可以通俗得把套接字理解成是网络的**插口、插槽**。

套接字由两个部分组成：ip地址+端口号。
不用多说，通过两个东西就可以找到对应的应用程序。

因此就有了套接字地址结构来规定以上两个甚至是其他东西。实际上套接字地址结构有很多，这里我就不一一说明，只说我编程中用到的IPv4套接字地址结构。
```
struct sockaddr_in 
{
	unit8_t sin_len;
	sa_family_t sin_family;
	in_port_t sin_port;

	struct in_addr sin_addr;

	char sin_zero[8];
}
```
我们主要用到三个东西：sin_family、sin_port、sin_addr。其中我们注意到sin_addr的类型是一个结构体，如下。
```
struct in_addr
{
	in_addr_t s_addr;
}
```
实际上直接定义成32位的变量即可，这是因为历史遗留的产物，且应用到大部分网络中。

由于网络上的字节序和主机上的字节序可能不一致，于是有了下面的函数：
```
#include <netinet/in.h>

unit16_t htons(unit16_t host16bitvalue);

unit32_t htonl(unit32_t host32bitvalue);

unit16_t ntons(unit16_t host16bitvalue);

unit32_t ntonl(unit32_t host32bitvalue);
```
h就是主机host的意思，n是network网络的意思，s：short,l：long。

当然，我们还需要字符串和网络字节序的二进制值（这是存放在套接字地址结构中的值）之间的转换。
```
#include <arpa/inet.h>

int inet_aton(const char* strptr, struct in_addr *addrptr);
char* inet_ntoa(struct in_addr inaddr);

//以下是随IPv6出的新函数，p是表示的意思
int inet_pton(int family, const char *strptr, void *addrptr);
const char* inet_ntop(int family, const void *addptr, char *strptr, size_t len)
```
实际上还有一个函数inet_addr()，但是如今已被弃用，所以这里就不讲了，inet_aton，看名字就是从字符串转ipv4地址的网络字节序。通过addrptr来存储。

## 配菜完了上工具
```
#include <sys/socket.h>

int socket(int family, int type, int protocol);

int connect(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen);

int bind(int sockfd, const struct sockaddr *myaddr, socklen_t addrlen);

int listen(int sockfd, int backog);

int accept(int sockfd, struct sockaddr *cliaddr, socklen_t *addrlen);
```
socket函数的family是指协议族，IPv4就是AF_INET，type是指这个socket是哪种类型，tcp就是SOCK_STREAM，protocol就是用啥协议，一般写0，表示默认由前两个。

这里说一下，addrlen就是套接字地址结构的大小，因为有了指针，我还得知道取多少内容。

## 开始炒菜
不管是客户端还是服务端，我们都需要声明一个变量来存储我们的套接字文件描述符。socket函数就是帮我们申请一个套接字文件描述符，但是这个时候，我们并不能对这个文件描述符做什么，一般来说，它的权限是被限定的，当我们完整的完成网络TCP的连接之后，我们就可以对它具体操作了。

- 对于客户端来说，我需要connect，和谁连接呢？servaddr和addrlen搞定，成功之后，我这个客户端的sockfd就和远端进行了连接，我就可以通过这个sockfd与远端进行通信了。

- 对于服务端来说，虽然我申请了一个文件描述符，但是它是指哪个文件啊，我作为服务端，别人需要找到我呀，所以套接字地址结构派上用场，bind函数进行绑定，这个时候还是不行，我需要通过listen函数将这个申请的且绑定的文件描述符转换成一个监听描述符，专门为我监听那些想和我取得连接的客户。当有客户进来的时候，我通过accept函数，重新申请一个连接描述符，然后这个连接描述符就和客户沟通去吧，我的监听描述符还是继续监听。

{% note warning %}
通过上述描述，我们知道，**监听描述符至始至终只有一个（一般来说），而连接描述符可以有多个**，为什么这样设计，正是因为我们的服务器不能永远只处理一个客户请求，我得同时处理多个客户请求，**这样设计的目的就在于可以进行高并发服务器的开发**。
{% endnote %}

## 重要内容总结
- 事实上，内核为**监听描述符**维护两个队列，一个是已连接队列，一个是未完成队列。accept函数会在已连接队列中取一个连接进行处理，如果没有，就会**阻塞**。直到有一个连接加入。

- 进行多进程的高并发服务器的编写的时候，我们要注意，accept一个新的连接给子进程，子进程是完全复制的，那么子进程也会有相同的打开文件描述符，多一个子进程，相应的文件描述符的**引用计数就加1**，所以在子进程的处理中，必须关闭监听描述符close(listenfd)，当然这个是不是必要的呢，因为子进程调用exit，内核会关闭该进程的所有的打开资源，相应的文件描述符引用计数会减1。个人认为，要符合规范。

- 当然，在父进程中要关闭已连接描述符，不显示关闭会有以下严重后果：1文件描述符会耗尽。2子进程关闭不了连接描述符。因为文件描述符只有在引用计数为0的时候才会关闭相应的资源。

## 程序
服务端程序
```
#include "csapp.h"
void str_echo(int sockfd)
{
	ssize_t n;
	char buf[MAXLINE];

again:
	while((n = read(sockfd, buf, MAXLINE)) > 0)
	{
		write(sockfd, buf, n);
	}
	if(n < 0 && errno == EINTR)
		goto again;
	else if (n < 0)
		printf("wrong!\n");
}

int main(int argc, char** argv)
{
	char buf[MAXLINE];
	int listenfd, confd;
	struct sockaddr_in servaddr, cliaddr;
	socklen_t clilen;
	pid_t chipid;

	listenfd = socket(AF_INET, SOCK_STREAM, 0);
	servaddr.sin_family = AF_INET;
	servaddr.sin_port = htons(6666);
	servaddr.sin_addr.s_addr = htonl(INADDR_ANY);

	bind(listenfd, (const struct sockaddr *)&servaddr, sizeof(servaddr));
	listen(listenfd, LISTENQ);

	while(1)
	{
		clilen = sizeof(cliaddr);
		confd = accept(listenfd, (struct sockaddr *)&cliaddr, &clilen);
		printf("one cli is :%s :%d\n", inet_ntop(AF_INET, &cliaddr.sin_addr, buf, sizeof(buf)), ntohs(cliaddr.sin_port));
		if((chipid = fork()) == 0)
		{
			close(listenfd);
			str_echo(confd);
			exit(0);
		}
		close(confd);
	}
}

```

客户端程序
```
#include "csapp.h"
void str_cli(FILE* fp, int sockfd)
{
	char sendline[MAXLINE], recvline[MAXLINE];
	while(fgets(sendline, MAXLINE, fp) != NULL)
	{
		write(sockfd, sendline, strlen(sendline));
		if(read(sockfd, recvline, MAXLINE) == 0)
			printf("server is ouot\n");
		fputs(recvline, stdout);
	}
}

int main(int argc, char **argv)
{
	int clisock;
	struct sockaddr_in servaddr;
	clisock = socket(AF_INET, SOCK_STREAM, 0);
	servaddr.sin_family = AF_INET;
	servaddr.sin_port = htons(6666);
	inet_aton("127.0.0.1", &servaddr.sin_addr);

	connect(clisock, (const struct sockaddr *)&servaddr, sizeof(servaddr));
	str_cli(stdin, clisock);
	exit(0);

}

```

实践出来确定能够达到同时处理多个客户请求，但是实际运行中会有BUG，也就是回射到后面并不能正常工作，我估计是输入输出的问题，跟缓存区有关，只不过我写的这个是简单，也没有异常处理。

--- 

<div align="center">
	**本文作者**：王仁松
	仅供本人记录学习过程与学习交流之用，未经同意，禁止转载！
</div>