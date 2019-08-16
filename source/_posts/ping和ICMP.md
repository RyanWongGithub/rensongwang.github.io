---
title: ping和ICMP
tags:
  - ICMP
categories:
  - 计算机网络
date: 2019-08-08 20:10:30
photo:
---

{% note default %}
平时我们测试某个ip可不可达的时候，会ping一下，但是ping到底干了些什么呢？
{% endnote %}

<!-- more -->

## ICMP
ping是基于ICMP协议工作的，准确得来说，是根据ICMP的**查询报文类型**工作的。

ICMP：互联网控制报文协议。
关键是控制。

ICMP有很多类型，最常用的是主动请求为8，主动应答为0。

- 查询报文类型
- 差错报文类型

Traceroute用的是差错报文类型













--- 

<div align="center">
	**本文作者**：王仁松
	仅供本人记录学习过程与学习交流之用，未经同意，禁止转载！
</div>