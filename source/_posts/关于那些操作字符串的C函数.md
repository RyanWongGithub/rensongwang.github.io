---
title: 关于那些操作字符串的C函数
tags:
  - Web服务器用到的C函数
categories:
  - C语言
date: 2019-08-20 19:43:36
photo:
---

{% note default %}
在开发并发Web服务器的时候，用到了很多C函数，以前学C语言的时候并不是很用心，这些函数也都没有影响，但是我逐渐发现，如果真的要开发底层的很细节的东西，还是要用原始的C函数。用那些封装好了的有时候并不能处理很多细节。
{% endnote %}

<!-- more -->

## strcasecmp：忽略大小写字符串比较函数

---

表头文件 #include <strings.h>（不是C/C++的标准头文件，区别于string.h）
函数说明 strcasecmp()用来比较参数s1和s2字符串，比较时会自动忽略大小写的差异。

```
int strcasecmp (const char *s1, const char *s2);

返回值 若参数s1和s2字符串相等则返回0。s1大于s2则返回大于0 的值，s1 小于s2 则返回小于0的值。
```
注意与str**n**casecmp()的区别，strncasecmp 只比较前 n 个字符。后面多一个参数n

## stat：获取文件元数据的函数

---

表头文件:  	#include <sys/stat.h>
			#include <unistd.h>

定义函数:    int stat(const char \*file_name, struct stat \*buf);

函数说明:    通过文件名filename获取文件信息，并保存在buf所指的结构体stat中

返回值:      执行成功则返回0，失败返回-1，错误代码存于errno

stat的结构体
```
#include <sys/stat.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    struct stat buf;
    stat("/etc/hosts", &buf);
    printf("/etc/hosts file size = %d\n", buf.st_size);
}

/*************************************************************************/
struct stat {
    dev_t         st_dev;       //文件的设备编号
    ino_t         st_ino;       //节点
    mode_t        st_mode;      //文件的类型和存取的权限
    nlink_t       st_nlink;     //连到该文件的硬连接数目，刚建立的文件值为1
    uid_t         st_uid;       //用户ID
    gid_t         st_gid;       //组ID
    dev_t         st_rdev;      //(设备类型)若此文件为设备文件，则为其设备编号
    off_t         st_size;      //文件字节数(文件大小)
    unsigned long st_blksize;   //块大小(文件系统的I/O 缓冲区大小)
    unsigned long st_blocks;    //块数
    time_t        st_atime;     //最后一次访问时间
    time_t        st_mtime;     //最后一次修改时间
    time_t        st_ctime;     //最后一次改变时间(指属性)
};
```
在我的项目里面，我重点要的是st_mode和st_size。
而st_mode 则定义了下列数种情况：
```
S_IFMT   0170000    文件类型的位遮罩
    S_IFSOCK 0140000    scoket
    S_IFLNK 0120000     符号连接
    S_IFREG 0100000     一般文件
    S_IFBLK 0060000     区块装置
    S_IFDIR 0040000     目录
    S_IFCHR 0020000     字符装置
    S_IFIFO 0010000     先进先出

    S_ISUID 04000     文件的(set user-id on execution)位
    S_ISGID 02000     文件的(set group-id on execution)位
    S_ISVTX 01000     文件的sticky位

    S_IRUSR(S_IREAD) 00400     文件所有者具可读取权限
    S_IWUSR(S_IWRITE)00200     文件所有者具可写入权限
    S_IXUSR(S_IEXEC) 00100     文件所有者具可执行权限

    S_IRGRP 00040             用户组具可读取权限
    S_IWGRP 00020             用户组具可写入权限
    S_IXGRP 00010             用户组具可执行权限

    S_IROTH 00004             其他用户具可读取权限
    S_IWOTH 00002             其他用户具可写入权限
    S_IXOTH 00001             其他用户具可执行权限
```
在Web项目中用到的是S_IRUSR。
上述的文件类型在POSIX中定义了检查这些类型的宏定义：
```
S_ISLNK (st_mode)    判断是否为符号连接
    S_ISREG (st_mode)    是否为一般文件
    S_ISDIR (st_mode)    是否为目录
    S_ISCHR (st_mode)    是否为字符装置文件
    S_ISBLK (s3e)        是否为先进先出
    S_ISSOCK (st_mode)   是否为socket
```
在Web项目中我们用到的是S_ISREG，来检查目标文件是不是普通文件。

## strstr：子串判断（PHP语言函数）

---

strstr(str1,str2) 函数用于判断字符串str2是否是str1的子串。
如果是，则该函数返回 str1字符串从 str2第一次出现的位置开始到 str1结尾的字符串；否则，返回NULL。
```
string strstr( string1，string2);

```
注意：如果只是要査找某字符串是否存在于另一字符串中，则建议使用 strpos这个函数, strpos函数执行的速度会比 strstr快，而且使用更少的内存。strpos() 函数返回字符串在另一个字符串中第一次出现的位置。如果没有找到该字符串，则返回 false。

## strcopy:复制字符串

---

strcpy是一种C语言的标准库函数，strcpy把含有'\0'结束符的字符串复制到另一个地址空间，返回值的类型为char\*。
```
char *strcpy(char* dest, const char *src);

```
把从src地址开始且含有NULL结束符的字符串复制到以dest开始的地址空间。
src和dest所指内存区域不可以重叠且dest必须有足够的空间来容纳src的字符串。
返回指向dest的指针。
一般来说，strcpy的复制并没有指定大小，所以容易越界，更推荐使用strncopy。
注意：**如果src串'\0'后面还有内容，也是复制不了的，这跟strcat是类似的，并且，如果这个时候dest串比src长，最后完美复制是一个假象，只是把dest截断了，在后面补了个'\0'**。
后面我会写一篇这些相关的指针的博文。

## strcat：将两个字符串进行拼接

---

```
#include <string.h>
extern char *strcat(char *dest, const char *src);
```
在C中，函数原型存在 <string.h>头文件中。
在C++中，则存在于<cstring>头文件中。	
把src所指向的字符串（包括“\0”）复制到dest所指向的字符串后面（删除*dest原来末尾的“\0”）。要保证*dest足够长，以容纳被复制进来的*src。*src中原有的字符不变。返回指向dest的指针。src和dest所指内存区域不可以重叠且dest必须有足够的空间来容纳src的字符串。
注意：**strcat函数只把uri中'\0'之前的包括'\0'进行连接，之后的不管。**

## index：定位函数

---

index()用来找出参数s 字符串中第一个出现的参数c地址，然后将该字符出现的地址返回。字符串结束字符(NULL)也视为字符串一部分。
```
char *index(const char *s, int c);
```
如果找到指定的字符则返回该字符所在地址，否则返回NULL
rindex()用来找出参数s 字符串中最后一个出现的参数c 地址。

## sprintf和sscanf：加了s也很形象

---

我们都知道，scanf和printf默认是针对标准输入和标准输出的，那么前面加了s就是**针对字符串**进行格式化输入输出的。
```
int sscanf(const char *str, const char *format, ...);

int sprintf(char *str, const char *format, ...);
```
sscanf将参数str的字符串根据参数format字符串来转换并格式化数据，转换后的结果存于对应的参数内。如果熟悉标准输入的scanf应该很好理解。
sscanf一般的功能就是：
- **根据格式从字符串中提取数据。如从字符串中取出整数、浮点数和字符串等**。
- 取指定长度的字符串
- 取到指定字符为止的字符串
- 取仅包含指定字符集的字符串
- 取到指定字符集为止的字符串

而sprintf是把格式化的数据写入某个字符串缓冲区。
如果成功，则返回写入的字符总数，不包括字符串追加在字符串末尾的空字符。如果失败，则返回一个负数。
sprintf一般的功能是：
- **将数字变量转换为字符串**。
- 得到整型变量的16进制和8进制字符串。
- **连接多个字符串**。
但是sprintf并不能防止字符串的溢出，所以一般也可以选snprintf作为更安全的版本。

--- 

<div align="center">
	**本文作者**：王仁松
	仅供本人记录学习过程与学习交流之用，未经同意，禁止转载！
</div>