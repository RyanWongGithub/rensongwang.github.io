---
title: 个人博客hexo + NexT + Mist的美化

date: 2019-04-17 00:12:58
tags:
- myblog
categories:
- 博客维护
photo:
---

{% note default %}

之前用的是Gemini，并做了一系列的美化，但始终让我感觉不是很让我喜欢。因为我对于这个个人博客主要是用来记录自己的学习过程，做一个积累，所以不用太华丽，却又想与众不同。Gemini风格感觉太过于大众化。在Gemini基础上美化了很多，最后发现华而不实。我现在又是喜欢极简，喜欢那种极为简单却十分有内涵有气质的（滑稽）。所以我看了其他博主的博客风格之后，彻底想对我的博客页面进行更新，于是换了Mist主题，并做了一些简单的美化，因为本人还是比较喜欢这次的美化，在这里将过程做一个简单的记录。
其中基本上大都是操作的主题文件和custom.styl，所以很方便也很简单，不需要做很多繁琐的操作。
{% endnote %}

<!-- more -->
## 1. 更换主题
在主题文件中搜索Scheme Settings，换成Mist。

## 2. 发现了F12的好用处
之前我都是按照别人的教程一步一步照猫画虎，后面看了一位博主的一篇关于美化next主题的文章之后，我也学着用F12去具体选择我自己的网站上的元素，然后直接在调试器上（F12）更改，它会在网页上实时更新你所做的改动。虽然我的方向并不是前端，但是还是觉得很强大。
在网页上直接改动，改成自己喜欢的，就复制粘贴到source/css\_custom/custom.styl
在本地localhost上刷新一下就能看到效果。

我在这里说一下，其实以前看别人照猫画虎的，很多都是对其他文件做了改动，其实根本没有必要。next主题提供了custom.styl就是可以让不同的人自定义自己的博客风格，这点真的很棒。所以我更倾向于在custom.styl做改动。因为比较统一，只要分清楚模块，我觉得这是一个很好的方式。因此后面，我会分别给出我在主题文件或其他文件上做出的改动，以及我的custom.styl，区分开来。

## 3. 在主题文件或其他文件上做出的改动
#### 修改文章底部的那个带#号的标签
修改模板/themes/next/layout/\_macro/post.swig，搜索 rel="tag">#，将 # 换成<i class="fa fa-tag"></i>

#### 侧栏隐藏
打开 主题配置文件 找到sidebar字段设置：
display：hide

#### 返回顶部按钮与阅读进度
在 next/\_config.yml 里找到 b2t 这个地方进行如下配置：
```
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: false
  # Scroll percent label in b2t button.
  scrollpercent: true
```
设置：
scrollpercent: true

#### 在侧栏添加邮箱一类的
在主题文件中搜索Social Links，想要哪个解注释即可

#### 阅读次数
在主题文件中搜索busuanzi_count，设置：
enable: true

#### 打赏功能
在主题文件中搜索reward_settings，设置：
enable: true
再把你的收款二维码放到images/，然后设置：
{% note default %}
reward:
  wechatpay: /images/wechat-reward.png
  alipay: /images/alipay-reward.jpg
{% endnote %}

#### note
在主题文件中搜索note:
{% note default %}
note:
  \# Note tag style values:
  \#  - simple    bs-callout old alert style. Default.
  \#  - modern    bs-callout new (v2-v3) alert style.
  \#  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  \#  - disabled  disable all CSS styles import of note tag.
  style: simple
{% endnote %}
将style设置成flat，下面还有icons，可以根据个人喜好设置显不显示图标，显示就true。

#### Label 标签
在主题配置文件中搜索# Label tag，设置
label: trues

#### 文章的模板文件
文章的模板文件在scaffolds/post.md里改，每次new了之后会生成模板

#### 设置代码高亮主题
在主题文件中搜索highlight_theme
改成你喜欢的主题就OK了
```bash
\# Code Highlight theme
\# Available values: normal | night | night eighties | night blue | night bright
\# https://github.com/chriskempson/tomorrow-theme
highlight_theme: night eighties
```

#### 订阅微信公众号
在主题文件中搜索Wechat Subscriber，设置如下：
```bash
wechat_subscriber:
  enable: true
  #qcode: /path/to/your/wechatqcode e.g. /uploads/wechat-qcode.jpg
  qcode: /images/wechat-qcode.jpg
  #description: e.g. subscribe to my blog by scanning my public wechat account
  description: 学习交流
```

#### 更换个人网站图标
自己去做一个自己喜欢的网站图标，替换images里面对应的网站图标即可
favicon-16x16-next.png
favicon-32x32-next.png

## 4. 我的custom.styl
```
// Custom styles.

// 侧栏头像显示框去掉以及上下位置
.site-author-image {
	border: none;
	margin-top: 25%;
	border-radius: 8px;// 圆角
}
// 文章标题动态效果
.posts-expand .post-title-link::before {
	background-image: linear-gradient(90deg, #a166ab 0%, #ef4e7b 25%, #f37055 50%, #ef4e7b 75%, #a166ab 100%);
}

//首页头部样式
.header {
	background: url("http://hddesktopwallpapers.in/wp-content/uploads/2018/06/rick-and-morty-wallpaper-680x425.jpg");
    //background-color: red;
    padding: 30px 0px;
}
// 浮动
.site-meta {
    float: none;
}
.menu {
    float: none;
}
// 取消标题上下滑动横线
.logo-line-before,
.logo-line-after {
    display: none;
}
// 菜单方块
.menu .menu-item a {
    font-size: 25px;
    color: rgb(255, 255, 255);

    border-radius: 5px;//设置圆角
}
.menu-item-active a, .menu .menu-item a:hover, .menu .menu-item span.exturl:hover {
    background: linear-gradient(90deg, #a166ab 0%, #ef4e7b 25%, #f37055 50%, #ef4e7b 75%, #a166ab 100%);// 设置移至颜色为炫彩
}
// title区域
.site-meta {
    margin-left: 0px;
    text-align: left;
}
// 设置title字体内容
.site-meta .site-title {
    font-size: 30px;
    font-family: 'Comic Sans MS', sans-serif;
    color: #fff;
}

//首页尾部样式
.footer {
    background: none;
    font-size: 16px;
}
.footer-inner {
    font-family: 'Comic Sans MS', sans-serif;
    text-align: center;
    color: #4c618f;
}
//侧边栏信息样式修改

.sidebar {
    box-shadow: inset 2px 2px 40px #bdb2b2;// 阴影
    //background: url("http://hddesktopwallpapers.in/wp-content/uploads/2015/07/tron-wallpapers-download-680x425.png");
    background: white;
}
// 侧栏名字
.site-author-name {
    margin: 30px 0 0;
    color: #090909;
    font-family: 'Comic Sans MS', sans-serif;
}
.links-of-blogroll {
    font-size: 14px;
    margin-bottom: 42px;
}
.links-of-author {
    margin-top: 30px;
    margin-bottom: 58px;
}
.sidebar-inner {
    color: #649ab6;
}

.sidebar a {
    color: #649ab6;
    border-bottom-color: #649ab6;
    border-bottom: none;
}
.sidebar a:hover {
    color: #0c0b0b;
}
.site-state-item {
    display: inline-block;
    padding: 8px 28px;
    border-left: 1px solid #649ab6;
}
.sidebar-nav .sidebar-nav-active {
    color: #649ab6;
    border-bottom-color: #649ab6;
}
.sidebar-nav li:hover {
    color: #0c0b0b;
}
//侧栏按钮样式
.sidebar-toggle {
    background: #649ab6;
}
.back-to-top {
    background: #649ab6;
}
//文章目录样式
.post-toc .nav .active>a {
    color: #4f7e96;
}
.post-toc ol a:hover {
    color: #7784ba;
}
.sidebar-nav .sidebar-nav-active:hover {
    color: #37596c;
}
a {
    border-bottom: none;
}

//首页阅读全文样式
.post-button .btn {
    color: #555 !important;
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    font-size: 15px;
    box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
    border: none !important;
    transition-property: unset;
    padding: 0px 15px;
}
.post-button .btn:hover {
    color: rgb(255, 255, 255) !important;
    border-radius: 6px;
    font-size: 15px;
    box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
    background-image: linear-gradient(90deg, #a166ab 0%, #ef4e7b 25%, #f37055 50%, #ef4e7b 75%, #a166ab 100%);
}
// 修改文章内链接文本样式
.post-body p a{
  color: #0593d3;
  border-bottom: none;

  &:hover {
    color: #0477ab;
    text-decoration: underline;
  }
}
```
css样式后期改动会更新。
本篇第一个打赏由Tank给出，感谢支持。
---
---

<div align="center">
	**本文作者**：王仁松
	仅供本人记录学习过程与学习交流之用，未经同意，禁止转载！
</div>