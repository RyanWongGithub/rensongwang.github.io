---
title: next主题的一些问题以及改动
tags:
  - myblog
categories:
  - 博客维护
date: 2019-03-20 13:53:56
photo:
---

{% note default %}
主要是一些小改动，记录一下。
{% endnote %}

<!-- more -->

## 点击阅读全文以后，从头开始阅读，而不是定位到后面
```
<!-- more -->
//这个是阅读全文的按钮在文章中的设置
```

但是一般在首页点击了阅读全文以后，会直接定位到摘要后面的位置开始阅读。
如果想要从头开始阅读。如下设置主题文件：
```
# Automatically scroll page to section which is under <!-- more --> mark.
scroll_to_more: false
```















--- 

