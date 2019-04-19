---
title: 持续优化-加速hexo博客
date: 2019-04-19 12:53:55
tags:
- myblog
categories:
- 博客维护
photo:
---

{% note default %}
在将我的个人博客经过一系列美化与维护之后，总感觉有一点美中不足。因为是hexo + next + GitHub Pages，导致国内访问速度特别慢，这对于有一点小小强迫症的我是有点无法接受的，因此想办法对hexo博客的加载速度做了优化。
感慨：相对于之前我博客的访问速度，我只能说，优化了过后简直快如闪电。
{% endnote %}

<!-- more -->
## 1. 推荐
我的整个优化过程来源于<a href="https://reuixiy.github.io/technology/computer/computer-aided-art/2018/05/30/speed-up-hexo.html">这篇</a>文章，在此感谢这位博主。

## 2. 插件以及具体配置
需要用到：
- InstantClick
- hexo-service-worker
- hexo-filter-optimize

### InstantClick
官网文档：<a href="http://instantclick.io/">instantclick.io</a>
需要：<a href="http://instantclick.io/v3.1.0/instantclick.min.js">instantclick.min.js</a>，点击之后直接在浏览器右键，另存为，我这里是存到themes\next-reloaded\source\js\下
然后在themes/next/layout/\_layout.swig添加代码（直接在最下面）：
```bash
+ <script type="text/javascript" src= "/js/instantclick.min.js" data-no-instant></script>
+ <script data-no-instant>InstantClick.init();</script>
</body>
</html>
```
搞定之后加载网页的时候，顶部会有加载条，不喜欢可以去掉：
直接在custom.styl里添加：
```bash
#instantclick {
  display: none;
}
```

### hexo的插件
插件：
- hexo-service-worker
- hexo-filter-optimize

先在博客根目录安装插件(我的是cnpm)：
```
cnpm install hexo-service-worker hexo-filter-optimize --save
```
然后在站点配置文件中添加：
```
# offline config passed to sw-precache.//安装了service_worker和filter_optimize的配置
service_worker:
  maximumFileSizeToCacheInBytes: 5242880
  staticFileGlobs:
  - public/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}
  stripPrefix: public
  verbose: true

filter_optimize:
  enable: true
  # remove static resource query string
  #   - like `?v=1.0.0`
  remove_query_string: true
  # remove the surrounding comments in each of the bundled files
  remove_comments: true
  css:
    enable: true
    # bundle loaded css file into the one
    bundle: true
    # use a script block to load css elements dynamically
    delivery: true
    # make specific css content inline into the html page
    #   - only support the full path
    #   - default is ['css/main.css']
    inlines:
    excludes:
  js:
    # bundle loaded js file into the one
    bundle: true
    excludes:
  # set the priority of this plugin,
  # lower means it will be executed first, default is 10
  priority: 12
```

完成之后在重新部署到远端查看效果便是。

## 3. 遇到的问题
我之前是在主题文件中配置了静态资源加速的，所以后面重新部署没有问题，可是我觉得速度还是不快，可能是错觉，也可能是我参考的是别人的vendors字段设置（本人也不是很懂cdn加速），所以我想自己调试一下，看怎么样才是最有效的。
- 把主题文件中的vendors字段设置恢复成原样，结果是网站的图标都不显示了
- 看别人的反馈，我给fontawesome设置了一个cdn地址，这个时候上面是_internal: lib而不是_internal: vendors
结果还是不行。
- 所以我又设置了_internal: vendors，结果是页面基本是空白的，但是实际上能点的地方还是能点
- 把fontawesome的cdn地址换成了主题文件中自带的示例，还是不行。
- 所以我就试着在_internal:后面是vendors的基础上把fontawesome包括在内的前面字段的全部的cdn地址都设置成示例的。
**结果成功**。
试了一下，博客的访问速度还是挺快的，哈哈。

本人的安装过程是：先安装的hexo的两个插件，然后弄的nstantClick。具体为什么会出现上述问题我也不是很清楚，但是博客的访问速度确实有了很明显的增强，用了三个不同的浏览器，清楚了缓存，试了几次，速度很不错。
具体可以用F12查看具体的速度。

附上我的vendors字段：
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

--- 

<div align="center">
	**本文作者**：王仁松
	仅供本人记录学习过程与学习交流之用，未经同意，禁止转载！
</div>