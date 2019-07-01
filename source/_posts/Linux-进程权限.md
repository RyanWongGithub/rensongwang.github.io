---
title: Linux-进程权限
tags:
  - Linux
categories:
  - UNIX环境高级编程
date: 2019-07-01 09:54:53
photo:
---

{% note default %}
Linux进程数据结构（中）- 进程树和进程权限
{% endnote %}

<!-- more -->



## 修改文件或目录权限
首先要了解的是，像以下这种
```
-rwxr-x--x 1 song song  8816 6月		2 18:25 aa.out
```
```
是通过ls -l aa.out命令打印出来的
我们这里关注前面的-rwxr-x--x，第一个-代表的aa.out这个文件是一个普通文件，当然还有其他比如d（目录）什么的
后面的9位rwxr-x--x，分别代表的是文件所有者对这个文件的权限，所有者所在组对这个文件的权限，其他用户对这个文件的权限
如果用二进制表示的话，那么有这个权限就置1，三位二进制数就可以表示0~7。
```
因此，如果用chmod命令修改该文件的具体权限的话，比如
```
chmod 000 aa.out
```
我们再看一下aa.out的权限信息
```
---------- 1 song song  8816 6月		2 18:25 aa.out
```
相当于权限全部被置为0，任何人都没有权限了，这就是一般的文件的权限
当然，chmod命令来修改命令还有其他方式
注意逗号
```
chmod u=rwx，g=rx，o=rx abc //同上u=用户权限，g=组权限，o=不同组其他用户权限

chmod u-x，g+w abc //给abc去除用户执行的权限，增加组写的权限

chmod a+r abc //给所有用户添加读的权限
```

**其他还有重要的权限位：**
- setuid位：SUID位。这个是有效用户位。下面会讲
- stick  bit(粘滞位)
**有效用户位：**对一个属主为root的可执行文件，如果设置了SUID位，则其他所有普通用户都将可以以root身份运行该文件，获取相应的系统资源。
setuid，setuid的作用是让执行该命令的用户以该命令拥有者的权限去执行，比如普通用户执行passwd时会拥有root的权限，这样就可以修改/etc/passwd这个文件了。它的标志为：s，会出现在x的地方，例：-rwsr-xr-x  。而setgid的意思和它是一样的，即让执行文件的用户以该文件所属组的权限去执行。

**stick  bit(粘滞位)：**
我们知道/tmp是系统的临时文件目录，所有的用户在该目录下拥有所有的权限，也就是说在该目录下可以任意创建、修改、删除文件，那如果用户A在该目录下创建了一个文件，用户B将该文件删除了，这种情况我们是不能允许的。为了达到该目的，就出现了stick  bit(粘滞位)的概念。它是针对目录来说的，如果该目录设置了stick  bit(粘滞位)，则该目录下的文件除了该文件的创建者和root用户可以删除和修改/tmp目录下的stuff，别的用户均不能动别人的，这就是粘滞位的作用。标志为t


## 进程的运行统计信息
```
u64				utime;//⽤⼾态消耗的CPU时间
u64				stime;//内核态消耗的CPU时间
unsigned long	nvcsw;//⾃愿(voluntary)上下⽂切换计数
unsigned long	nivcsw;//⾮⾃愿(involuntary)上下⽂切换计数
u64				start_time;//进程启动时间，不包含睡眠时间
u64				real_start_time;//进程启动时间，包含睡眠时间
```
## 进程亲缘关系
进程维护一个进程树
```
struct	task_struct_rcu	*real_parent;	/*	real	parent	process	*/
struct	task_struct_rcu	*parent;		/*	recipient	of	SIGCHLD,	wait4()	reports	*/
struct	list_head	children;				/*	list	of	my	children	*/
struct	list_head	sibling;				/*	linkage	in	my	parent's	children	list	*/
```
parent：指当前进程的父进程，该进程终止时，要向其父进程发送信号
children：指当前进程的子进程，指向链表的头部，链表中所有元素都是它的子进程
sibling：用于把当前进程插入到兄弟链表中

## 进程权限
Linux中，对进程权限的定义：
```
/* Objective and real subjective task credentials (COW): */
const struct cred_rcu *real_cred;
/* Effective (overridable) subjective task credentials (COW): */
const struct cred_rcu *cred;
```
关于权限，无非是两种情况，一种是“谁能操作我”，另一种就是“我能操作谁”。
Objective的中文意思就是“目标，目的”，subjective的中文意思是“主观的”。
这里有点绕，不好理解，我个人这么理解。
从subjective上来说，我作为个体，我主观的去想要操作某些对象。
那么**这个subjective（cred）指的就是我能操作的哪些对象**
而Objective呢，是我自身作为一个其他对象的目标，那么也就是**谁能操作我**
**real_cred**指的就是哪些对象能够操作我。

“操作”就是一个对象对另外一个对象进行某些动作，那么在动作实施的时候，就应该审核权限。
这里**有意思的地方就是**，上面讲过进程权限是两个部分，一个是“谁能操作我”，一个是“我能操作谁”。
那么审核权限的时候，就应该审核两边的权限一不一致(有待进一步理解)。

下面给出cred的定义：
```
struct	cred	{
......
		kuid_t			uid;				/*	real	UID	of	the	task	*/
		kgid_t			gid;				/*	real	GID	of	the	task	*/
		kuid_t			suid;				/*	saved	UID	of	the	task	*/
		kgid_t			sgid;				/*	saved	GID	of	the	task	*/
		kuid_t			euid;				/*	effective	UID	of	the	task	*/
		kgid_t			egid;				/*	effective	GID	of	the	task	*/
		kuid_t			fsuid;				/*	UID	for	VFS	ops	*/
		kgid_t			fsgid;				/*	GID	for	VFS	ops	*/
......
		kernel_cap_t	cap_inheritable;	/*	caps	our	children	can	inherit	*/
		kernel_cap_t	cap_permitted;		/*	caps	we're	permitted	*/
		kernel_cap_t	cap_effective;		/*	caps	we	can	actually	use	*/
		kernel_cap_t	cap_bset;			/*	capability	bounding	set	*/
		kernel_cap_t	cap_ambient;		/*	Ambient	capability	set	*/
......
}	__randomize_layout;
```

uid/gid就是实际的用户（组）id。
euid/egid，注释是effective	user/group	id，就是**有效的**用户（组）id，这里有效的，是指起作用的，一般就看这个权限。
fsuid和fsgid，也就是filesystem	user/group	id。这个是对文件操作会审核的权限。

前面讲过文件权限，这里我们要讲的是进程权限。
什么意思呢？前面我们还说过，进程权限就是两种情况：谁能操作我，我能操作谁。
这么去理解，不管怎么样，还是得看我本身的权限够不够。
那产生了一个进程，对应的也有了这个进程的权限。
我们不妨把这个进程看作是一个对象A，因为正在运行的进程也可能去操作其他对象B。
那我们怎么知道这个进程A有没有操作B的权限呢。
所以啊，进程权限里面的uid/gid、euid/egid、fsuid和fsgid就起了作用了。
你会发现，这些uid指的就是用户id，哪个用户启动了这个进程，那么这个进程的权限（这些uid）就是这个用户id。
那我进程A要操作B，是不是就要看具体哪个用户有没有这个权限呢？
用户有没有权限访问文件，你想到了什么？对！
就是文件权限。（当然也有进程权限，只是目前我没有探索清楚）
追根究底，我们又回到了文件权限，所以啊：
那9位，真的挺强大的。

继续讲，这里我们主要看euid/egid，就是有效用户ID，相信你也知道了，如果这个有效用户ID对应的用户没有操作对象B的相应权限。
那么对应的，进程A是不是就没有操作对象B的权限？

这个时候，我们怎么才能让A有这个权限呢？
当然，设置以下B的文件权限位，让A的有效用户ID能够访问就行了。

但是，一般情况是：
{% note defalut %}
创建进程A，前提是执行一个可执行文件file，这个可执行文件的所有者是R
当用户T去执行该可执行文件file时（会检查T有没有执行权限），创建进程，这个时候如果file没有设置SUID位的话
那么进程A的uid、euid、fsuid等都会是T的id，这个时候如果进程A要去操作同样属于R的另一个对象B（没有设置T能够操作的权限）的时候，就无法成功。
因为这个时候进程A的有效用户ID是T，T没有对B的操作相应权限。
{% endnote %}
这个时候怎么办呢？解决方法如下：
这个时候我们就可以设置可执行文件file的setuid位（SUID位）来让创建的进程A的euid、fsuid是用户R的ID，这个时候进程A就可以操作同样属于R的对象B了，也就是说，别的用户创建的进程A也能操作对象B。这是因为：上面讲过
```
setuid的作用是让执行该命令的用户以该命令拥有者的权限去执行
```
另外还可以通过setuid或seteuid函数（系统调用）的方式来设置uid，具体见下(出自饶超勋
stevenrao.blog.chinaunix.net)：
```
int main(int argc, char *argv[])
{
    if( setuid(503) < 0) perror ("setuid error");
    while(1)sleep(1);
}
   $>ll
   -rwxr-xr-x. 1 test1 test 6780 Sep 16 15:32 a.out 
   使用root用户执行
   $>./a.out
   查看状态，所有uid都变成test2用户。
   503   503   503   503  3592 a.out

   把代码中setuid改成seteuid函数，会把euid和fuid改成test2用户
   0   503     0   503  3614 a.out
   
   把代码中setuid改成setfsuid函数，会把fuid改成test2用户
   0     0     0   503  3636 a.out

   当把代码改成下面样子
if( seteuid(503) < 0) perror ("seteuid error");
if( setfsuid(504) < 0) perror ("setfsuid error");
while(1)sleep(1);
   或者
if( setfsuid(504) < 0) perror ("setfsuid error");
if( setfeuid(503) < 0) perror ("seteuid error");
while(1)sleep(1);
   用root用户执行，得到都是一样的结果
   0   503     0   503  3614 a.out  
   
   到了这里我来总结一下：1、setuid和seteuid是有区别的，setuid是永久的放弃root用户权限，转让给非root用户后，无法再restore到root用户，seteuid是临时放弃root用户权限，可以通过seteuid(0),restore到root权限。这点应该是总所周知的特点，本文就不举例子演示。2、seteuid 会同时改变euid和fuid都为设置的euid值。3、root用户可以通过调用setxxuid 来改变权限用户。非root用户是无法改变和转让权限用户。
```

当然还有函数setfsuid什么的，慢慢摸索

最后讲一下权限的继承，：
当使用fork子进程的时候，子进程全部继承父进程四个uid，和父进程uid相同。
当使用exec系列函数时候，会把suid置为euid。
{% note warning %}
个人总结一下：个人理解，进程权限其实理解成用户权限的化身更好一些，就像是用户的化身一样去执行各种操作，而在操作对象时，要检查这个化身有没有相应的权限。
{% endnote %}

Linux还有另一个机制就是capabilities。后期补充。

//进程数据结构（下）用户态函数栈和**内核栈**
## 进程执行过程中，发生系统调用怎么办
在程序执行过程中，一旦调用到系统调用，就需要进入内核继续执
行。那如何将用户态的执行和内核态的执行串起来呢？

就需要以下两个重要的成员变量：
```
struct	thread_info		thread_info;
void		*stack;
```
用户态函数栈较好理解，在CSAPP就有涉及，里面讲的是64位的。
内核栈较为复杂。后期补充。


调度
后续更新或另起博文。














--- 

<div align="center">
	**本文作者**：王仁松
	仅供本人记录学习过程与学习交流之用，未经同意，禁止转载！
</div>