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
#### 实现在手机上也可以显示侧栏按钮（b2t返回顶部上面那个）
在主题文件中搜索sidebar:
```
# Sidebar offset from top menubar in pixels (only for Pisces | Gemini).
  offset: 12
  # Enable sidebar on narrow view (only for Muse | Mist).在窄视图上启用侧边栏
  onmobile: true
```
将onmobile设为true就OK。

#### 取消侧栏文章目录对标题的自动编号
在主题文件中搜索toc: 
```
toc:
  enable: true
  # Automatically add list number to toc.
  number: false
```
将number设为false即可

#### 静态资源 cdn 加速
在主题配置文件中，找到vendors，cdn 地址来自 bootcdn，设置如下：
{% note default %}
vendors:
  \# Internal path prefix. Please do not edit it.
  \_internal: vendors
  \# Internal version: 2.1.3
  jquery: //cdn.bootcss.com/jquery/2.1.3/jquery.min.js
  \# Internal version: 2.1.5
  \# Fancybox: http://fancyapps.com/fancybox/
  fancybox: //cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.pack.js
  fancybox_css: //cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css
  \# Internal version: 1.0.6
  fastclick: //cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js
  \# Internal version: 1.9.7
  lazyload: //cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js
  \# Internal version: 1.2.1
  velocity: //cdn.bootcss.com/velocity/1.3.1/velocity.min.js
  \# Internal version: 1.2.1
  velocity_ui: //cdn.bootcss.com/velocity/1.3.1/velocity.ui.min.js
  \# Internal version: 0.7.9
  ua_parser: //cdn.bootcss.com/UAParser.js/0.7.12/ua-parser.min.js//这里我没在我的主题文件里找到
  \# Internal version: 4.4.0
  \# http://fontawesome.io/
  fontawesome: //cdn.bootcss.com/font-awesome/4.6.2/css/font-awesome.min.css
{% endnote %}
这是参考别人的主题文件配置，本人通过测试调试，发现自带的示例也是可以用的，如下：
```
vendors:
  # 在这里我测试一下，有副本，不行就注释回去OK，上面的是原来的，改到fontawesome
  # Internal path prefix. Please do not edit it.
  #_internal: lib
  _internal: vendors
  # Internal version: 2.1.3
  # Example:
  # jquery: //cdn.jsdelivr.net/npm/jquery@2/dist/jquery.min.js
  # jquery: //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
  jquery: //cdn.jsdelivr.net/npm/jquery@2/dist/jquery.min.js
  #jquery: //cdn.bootcss.com/jquery/2.1.3/jquery.min.js
  # 放大镜效果

  # Internal version: 2.1.5 & 3.5.7
  # See: https://fancyapps.com/fancybox
  # Example:
  # fancybox: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.js
  # fancybox: //cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.js
  # fancybox_css: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.css
  # fancybox_css: //cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.css
  fancybox: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.js
  fancybox_css: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.css
  #fancybox: //cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.pack.js
  #fancybox_css: //cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css
  # 图片预览

  # Internal version: 1.0.6
  # See: https://github.com/ftlabs/fastclick
  # Example:
  # fastclick: //cdn.jsdelivr.net/npm/fastclick@1/lib/fastclick.min.js
  # fastclick: //cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min.js
  fastclick: //cdn.jsdelivr.net/npm/fastclick@1/lib/fastclick.min.js
  #fastclick: //cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js
  # 快速点击？

  # Internal version: 1.9.7
  # See: https://github.com/tuupola/jquery_lazyload
  # Example:
  # lazyload: //cdn.jsdelivr.net/npm/jquery-lazyload@1/jquery.lazyload.min.js
  # lazyload: //cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.7/jquery.lazyload.min.js
  lazyload: //cdn.jsdelivr.net/npm/jquery-lazyload@1/jquery.lazyload.min.js
  #lazyload: //cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js
  # 懒加载

  # Internal version: 1.2.1
  # See: http://velocityjs.org
  # Example:
  # velocity: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.min.js
  # velocity: //cdnjs.cloudflare.com/ajax/libs/velocity/1.2.1/velocity.min.js
  # velocity_ui: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.ui.min.js
  # velocity_ui: //cdnjs.cloudflare.com/ajax/libs/velocity/1.2.1/velocity.ui.min.js
  velocity: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.min.js
  velocity_ui: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.ui.min.js
  #velocity: //cdn.bootcss.com/velocity/1.3.1/velocity.min.js
  #velocity_ui: //cdn.bootcss.com/velocity/1.3.1/velocity.ui.min.js

  # Internal version: 4.6.2
  # See: https://fontawesome.com
  # Example:
  # fontawesome: //cdn.jsdelivr.net/npm/font-awesome@4/css/font-awesome.min.css
  # fontawesome: //cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css
  #fontawesome:
  fontawesome: //cdn.jsdelivr.net/npm/font-awesome@4/css/font-awesome.min.css
  # 图标
```

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