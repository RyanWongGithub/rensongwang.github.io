---
title: qt + opencv320 + EasyPR的车牌识别环境搭建
tags:
  - qt + opencv320 + EasyPR的车牌识别环境搭建
categories:
  - qt + opencv320 + EasyPR的车牌识别环境搭建
date: 2019-10-20 14:58:11
photo:
---

{% note default %}
学校最近要求做一个实验，一个停车收费管理系统，我负责的就是车牌识别的部分，我想到的就是利用现有的库搭建一个可以实现这样功能的环境。这篇是一个总结，在这个过程中还是遇到了不少问题，收获还是蛮多的。记录下来，很有帮助。
{% endnote %}

<!-- more -->

## 环境：前提说清楚环境是很重要的！
操作系统：win10
qt版本：5.10.1（搭建过程中我使用的是qt Creator）
opencv版本：3.2.0（实际上由于EasyPR编译错误我下了很多版本，切记，要看EasyPR使用文档）
EasyPR版本：这个实际上我也不太清楚，我最开始下的好像是1.6的版本，但是在GitHub上下很慢，建议去码云下。

另外，在qt Creator中创建项目时可以选择是基于VS(比如MSVC2015)还是自带的MinGW编译器。
我在搭建过程中，两个都试了一下。
我主要遇到的问题就是：EasyPR加入项目后的编译问题。

## 准备，qt和opencv的安装
当然，上面说的东西全都下好，建议去官网上下载。这里简单说一下qt和opencv的安装。
对于qt，官网上地址：
<a href="http://download.qt.io/archive/qt/"></a>
选择合适自己操作系统的版本下载安装。
不停下一步即可，主要说一下，到了**组件安装页面**（跟安装vs是一个道理，需要什么安装什么，电脑好的可以全装），我安装的是VS2015，因此勾选MSVC 2015 64-bit，以及MinGW 5.10.1 32 bit，然后Sources至Qt Script(Deprecated)都勾选，在工具组件(Tools)则勾选了Qt Creator 4.5.1 CDB Debug以及MinGW 5.10.1。
然后等待安装完成即可，这个过程在我电脑上是挺长的。

对于opencv，官网上下载如果很慢的话，网上有那种博客整合了一下，是exe格式的，下下来直接安装即可（如果是下载的压缩包的话可能要配环境变量）。

## qt中配置opencv
如果你去网上搜索qt中配置opencv，会有很多教程，但是大多没说清楚环境，也就是版本。其中很多需要Cmake来对opencv进行编译，实际上，这种方法是以前的版本的做法，现在opencv的版本不断更新，已经不需要过多复杂的配置了。
我觉得还是蛮方便的。

多说一些：qt和opencv都是开源库，在自己的项目中使用别的库，需要懂一点链接。
通俗一点就是，如果要使用别人的东西，你得告诉别人，去哪能找到。
那这个去哪找到，怎么告诉qt Creator中你的项目呢：**.pro文件**。这个文件是qt 搭建一个项目的配置文件。

具体跟这个.pro文件说些什么呢？
我们打开opencv的安装目录，找到主要的三个部分：
- 包含目录（包含.h头文件）
- 库目录（包含.lib文件）
- 执行目录（包含.dll文件)
我的包含目录路径：
```
D:/Opencv320/opencv/build/include
D:/Opencv320/opencv/build/include/opencv
D:/Opencv320/opencv/build/include/opencv2
              
```
我的库目录路径：x64表示64位，vc14表示编译器版本，VS2015选vc14
```
D:/Opencv320/opencv/build/x64/vc14/lib
```
我的执行目录路径：
```
D:/Opencv320/opencv/build/x64/vc14/bin
```

我们打开项目的.pro文件，在里面添加以下：
```
#包含目录
INCLUDEPATH+= D:/Opencv320/opencv/build/include/opencv2 \
              D:/Opencv320/opencv/build/include/opencv \
              D:/Opencv320/opencv/build/include

#库文件
LIBS+=D:/Opencv320/opencv/build/x64/vc14/lib/opencv_world320d.lib
```
这里说一下，这是qt的.pro文件中的配置写法。
**\反斜杠**是指另起一行，也就是下一个的意思。
而库文件除了上面那种写法，也可以写成以下：
```
LIBS += -LD:/Opencv320/opencv/build/x64/vc14/lib -lopencv_world320d
```
**-L**是指目录，**-l**是指具体哪个文件（库）。

接着我们右键我们的项目，qmake一下（因为修改了.pro文件）。然后随便写个程序调用以下opencv里面的方法测试一下即可。
不出意外，include头文件的时候会自动弹出所需要的头文件。

## qt中配置EasyPR
我们从EasyPR的官方仓库（GitHub和码云（推荐））上下载下来之后，将我们需要的以下六个文件夹复制到我们的项目工作目录中。
<img src="http://rensongwang.gitee.io/my_drawing_bed/EasyPR导入文件夹.png">

然后在Qt Creator中右键对应的文件夹，选择Add Existing Directory。也就是现有文件夹，一个一个添加到你的项目中也就可以。操作完之后再去.pro文件里面看，会发现你的项目文件目录结构多了很多东西。没错，到时候要用什么东西得知道去哪里找才行。这一步才是真正的导入。

解释一下：
- 我们需要在头文件夹（Headers）中导入include(这个文件夹中都是头文件)、test（只需要将里面的头文件导入即可，实际上会自动选好，不用操作点确定即可）、thirdparty。
- 在Sources导入src（都是源文件）、thirdparty（里面的源文件）。
- 在项目总的文件夹右键导入model、resource以及thirdparty里面的除了头文件和源文件之外的所有东西。

导入完成之后的目录结构如下：
<img src="http://rensongwang.gitee.io/my_drawing_bed/EasyPR导入成功之后.JPG">

## 紧接着我们点击运行，会提示很多错误信息：
- 找不到文件或文件夹。一种是找不到库的错误，一种是include包导入的有问题，这种错误很容易发现，点击对应的错误会发现很多你导入的源文件里面include的头文件说是找不到，这是因为相对路径的问题，可以一个一个改，也可以重新导入一遍（推荐），**上图我导入的目录就是我自己根据问题重新导入的**，解决头文件路径问题。

- 还有一种错误是说什么SVM啊、ANN啥的用作表达式非法的问题，这个就是版本对应问题，你配置的Opencv版本不匹配，里面的很多方法可能更新了。这个时候实际上在EasyPR的官方使用文档上就有解决方法，就是在include文件夹里面的easypr文件夹里面的config.h里面把#define CV_VERSION_THREE_ZROE改成#define CV_VERSION_THREE_TWO。

- 还有一种错误就是congfig里面的这个地方：
```
static const char* kDefaultSvmPath = "C:/Users/10184/Documents/EasyPRtest2/model/svm_hist.xml";
static const char* kLBPSvmPath = "C:/Users/10184/Documents/EasyPRtest2/model/svm_lbp.xml";
static const char* kHistSvmPath = "C:/Users/10184/Documents/EasyPRtest2/model/svm_hist.xml";

static const char* kDefaultAnnPath = "C:/Users/10184/Documents/EasyPRtest2/model/ann.xml";
static const char* kChineseAnnPath = "C:/Users/10184/Documents/EasyPRtest2/model/ann_chinese.xml";
static const char* kGrayAnnPath = "C:/Users/10184/Documents/EasyPRtest2/model/annCh.xml";

//This is important to for key transform to chinese
static const char* kChineseMappingPath = "C:/Users/10184/Documents/EasyPRtest2/model/province_mapping";
```
尽量改成绝对路径，相对路径可能会出现错误说是找不到文件啥的。

- 紧接着可能还会出现一下问题：
```
error LNK2019: 无法解析的外部符号 __imp_IsTextUnicode以及__imp_MessageBoxA等。
找不到xmlParser.obj啥的。
```
这种问题一般就是window下面的环境问题。
一般出现这种问题可以考虑为库文件的丢失，可以在main.cpp中加入如下格式的代码来添加库文件：
```
#pragma comment(lib,"Ws2_32.lib" )//表示链接Ws2_32.lib这个库，是winsock2的库文件。
#pragma comment(lib, "User32.lib")//函数MessageBoxA所对应的库
#pragma comment(lib,"Advapi32.lib")//函数IsTextUnicode所对应的库
#pragma comment(lib,"oleaut32.lib")//函数SysFreeString和SysAllocStringByteLen所对应的库
#pragma comment(lib,"wsock32")// CSocket在WSock32.dll中实现
#pragma comment(lib,"ws2_32"）// Socket API在ws2_32.dll实现
```
以上意思总之就是在链接的时候去找到这些库。
我是全部添加进去一个一个排除。

- 前面所有的都解决之后，运行一下，可能会出现程序异常退出的错误。这个时候建议在.pro文件里面添加以下：
```
INCLUDEPATH += D:/Opencv320/opencv/build/include
CONFIG(debug, debug|release): {
LIBS += -LD:/Opencv320/opencv/build/x64/vc14/bin \
-lopencv_world320
-lopencv_world320d
} else:CONFIG(release, debug|release): {
LIBS += -LD:/Opencv320/opencv/build/x64/vc14/bin \
-lopencv_world320
-lopencv_world320d
}
```
qmake之后再次运行，发现成功了。

- 成功之后，修改项目之后，可能会出现再次运行又不成功了，说是找不到(打不开)opencv320.lib。
这个问题我是把上面添加的删了运行一下，异常退出，还有再加上，又成功了。
我想了一下，应该是环境变量的设置问题。或者是我电脑本身的原因。

参考资料：
<a href="https://www.jianshu.com/p/22617e584f28">Qt+opencv+EasyPR（车牌识别系统，从配置环境到成功运行）</a>

<a href="https://blog.csdn.net/czl389/article/details/79137566">Windows下QT Creator配置OpenCV(VC版)</a>

<a href="https://blog.csdn.net/beiergelaide/article/details/77896898">已解决error LNK2019: 无法解析的外部符号 \__imp_IsTextUnicode以及__imp_MessageBoxA等</a>

<a href="https://blog.csdn.net/qq_34039018/article/details/80115069">Qt opencv 程序异常结束，crashed</a>


--- 

