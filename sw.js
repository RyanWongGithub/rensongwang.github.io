/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2019/03/17/个人博客hexo + NexT + Mist的美化/index.html","dd87dfbd7ca49b24248b963515ebae71"],["/2019/03/17/个人博客整体改动/index.html","23a995f7dcef7f0404209318d1936cc2"],["/2019/03/18/利用Git分支管理博客资源/index.html","b4fd1969997a75b640abd793b6db6178"],["/2019/03/19/持续优化-加速hexo博客/index.html","265fe82ba5032431872df8ce4b2f8d3b"],["/2019/03/20/next主题的一些问题以及改动/index.html","b3353fca9bf80c5b2ba08869dc2e1a5f"],["/2019/03/27/C11-and-常用总结（持续更新）/index.html","100a92ebae276369bceda3491317c218"],["/2019/03/28/csapp：信息的表示和处理/index.html","fb4c7c7ab611edfcb1603f50718f84fb"],["/2019/04/03/csapp：程序的机器级表示/index.html","5139ea4429248e17b87c7ad0e0b67c8c"],["/2019/04/08/小知识点总结/index.html","39bcbf81af773b2f54f9a0f0690948be"],["/2019/04/14/csapp：对于优化程序性能的理解/index.html","5492b86e5ffc8ced34929923b2d26d36"],["/2019/04/15/csapp：对于高速缓存的理解/index.html","da520932e572ca1fbf7622c5fb6ae486"],["/2019/04/22/对于异常控制流的理解/index.html","dffc36674e479d79fc6ccbafd0c59132"],["/2019/04/24/信息安全概论漫游/index.html","09d8eb0a90d33172a19f2f5ee49453bb"],["/2019/05/07/虚拟内存到底是啥，有多强大/index.html","6c6bf042a74764bfb19869ee94250b63"],["/2019/05/15/算法的入门：排序/index.html","750b378adbe4c73d6ee304ad38527b8a"],["/2019/05/26/数据库基础知识小总结/index.html","bbb9497ebc11666816d40f6084078718"],["/2019/07/01/Linux-开始/index.html","24b1aa9d0eb10c26628cd905fbd1119c"],["/2019/07/01/Linux-进程权限/index.html","4b9be19f6c3591432f941ec4dfb48d09"],["/2019/07/01/排序-冒泡插入选择/index.html","9a3e27d8099a8fde91339a90bd89cefd"],["/2019/07/01/排序-归并快排/index.html","32e5433819abce4532353da511a10fc0"],["/2019/07/02/排序-打造一个高性能通用的排序方法/index.html","44103bf39f7ca4c027b177cdee16e944"],["/2019/07/02/排序-桶排计数排基数排/index.html","8731641838af7e21a9c35fc186cce6f8"],["/2019/07/03/看似简单的二分查找有多少玄机/index.html","05cf3e175502acc4666faf2039e8f873"],["/2019/07/04/怎么打造一个工业级散列表/index.html","76dec3b7fe7bd431adefdf674e6108ae"],["/2019/07/08/哈希算法/index.html","0b327a79846787b41a43bc58c1280343"],["/2019/07/08/排序-堆排序/index.html","c357274132d7941e165815e3951f93ef"],["/2019/07/08/红黑树/index.html","e52a371a29582e7c65e15db1909d83c3"],["/2019/07/23/Trie树和AC自动机的应用/index.html","df4274262d3dad3f6f70224c08af4cf0"],["/2019/07/23/图以及暴力的bfs和dfs/index.html","4606dba2d9d3eef60bf920ff7d0359c6"],["/2019/07/23/字符串匹配/index.html","48d1b5b1fab7a57578188a871663dcfb"],["/2019/07/23/贪心算法/index.html","36430b1d32d201028916a35efc21325e"],["/2019/08/03/从C-对象到虚函数的实现机制/index.html","8ad9fc09bfc09f08fc1d6e2a411bc942"],["/2019/08/04/从C-的构造函数谈vector的深拷贝/index.html","69e864cd34b648ef6bb9c61a1a7ee10b"],["/2019/08/06/一个小的局域网打联机游戏/index.html","88a86b55f0dcc0da48598f9ef10d46db"],["/2019/08/06/对于IP的理解/index.html","81df3a593368e841922a898c5ae7830c"],["/2019/08/08/UDP-小孩子一样的纯真/index.html","d5f6176117c5f114f6ef47ce030ad230"],["/2019/08/08/ping和ICMP/index.html","33ffb7d197a938742c4fdfe38a5d6ff0"],["/2019/08/09/TCP-为了连接我真的是竭尽全力/index.html","f091c22cc873b0bbd222604a6f167fa5"],["/2019/08/09/UDP和TCP的区别/index.html","eb4a73cd22c5125370d9b5cd9ab7cd65"],["/2019/08/16/socket编程实现tcp并发回射服务器客户端程序/index.html","3cfc1b4b567bc3ef1af1731e69a84e71"],["/2019/08/18/个人项目：200多行代码实现一个简单的Web服务器/index.html","e96ccc22d090499d5fdc8f87eaf3d010"],["/2019/08/18/初探Http事务/index.html","48101e12a6b7ed6883f85ba973fc29e8"],["/2019/08/20/个人项目：基于预线程化的并发Web服务器/index.html","dcdfa219127c152e8ee4c0b1e3f1ab77"],["/2019/08/20/关于那些操作字符串的C函数/index.html","c8913c5d7544a309fca8bf13189a7391"],["/2019/08/21/分配动态内存返回的指针就是与众不同？/index.html","537949f3b325634897aa4d9a4079cb28"],["/2019/08/23/关于链接、虚拟内存、内存映射的一些疑惑/index.html","ab365a8b7b9b5fd55889c270ddc54bfa"],["/2019/08/23/链接：一个程序到一个进程的蜕变/index.html","024e23618f769c8798931bae6b4bdceb"],["/2019/08/24/内存映射：虚拟内存进行工作的进一步真相/index.html","0f2a2fc5510bdc503f08cb7c77358917"],["/about/index.html","d0baa0843f94f0c63f5c1d795c5b6f41"],["/archives/2019/03/index.html","84458441890e1c9ffccb74b47891ab36"],["/archives/2019/04/index.html","84c3e5a03db65976000f048ef906d2fa"],["/archives/2019/05/index.html","283df331e6402dbf79c0b64d60d21f40"],["/archives/2019/07/index.html","7133be9230086768e72aa72d4b969b18"],["/archives/2019/07/page/2/index.html","f025305d1d4a53efbff80cb0990bedd7"],["/archives/2019/08/index.html","38cd87e5baac666c25f4f357a830705d"],["/archives/2019/08/page/2/index.html","22b456230e1680ba0bb0539e63b18411"],["/archives/2019/index.html","a67997fea5d62954a01dd0c139286fbb"],["/archives/2019/page/2/index.html","7bf7556bf81b6082a460822291d0316a"],["/archives/2019/page/3/index.html","718c29a5fdfeedd6cb5f78a180ce0b3b"],["/archives/2019/page/4/index.html","81747580d4da6973d955464aa57d9fcb"],["/archives/2019/page/5/index.html","295ed021e64da1dc3b1e89d92391e62c"],["/archives/index.html","d22258c71cc125ff39931ce2a6fbf245"],["/archives/page/2/index.html","5504276ab9ad83cb63797568e9d4c594"],["/archives/page/3/index.html","116616875de13f9871c5556ee37e1cb6"],["/archives/page/4/index.html","e29b53a3195959bcf32569339a75f71d"],["/archives/page/5/index.html","53b40dcf425b2bb48d19d188270fa393"],["/bundle.js","57350149d38142288f8f6331aa659a5c"],["/categories/C-基础/index.html","21564c6699917cecd02e2c86e197426f"],["/categories/CSAPP/index.html","655715b49c62d838873c5000f73389fc"],["/categories/C语言/index.html","775e4da8ecd8591e1cf4092e16e5f306"],["/categories/UNIX环境高级编程/index.html","066b8747ab7d03bbc8c7acbdcaba04c4"],["/categories/index.html","04fc9b533f4e721c636dac897449719b"],["/categories/一直困扰我的一些问题/index.html","6c76e2fdcd5d93c6b5a72512d94b24c7"],["/categories/信息安全/index.html","97ce82aac800e0d402c1b4c1f3ceadaf"],["/categories/博客维护/index.html","2ad1924e23a4a311c2f9d054c446f189"],["/categories/指针与内存/index.html","f0bf1997b0cb062cb8c9ca544b76f7b8"],["/categories/操作系统个人理解系列/index.html","4f4abf2e11cc430ac27d7577462a1ed4"],["/categories/数据库系统/index.html","f854ef255b4c309a8ad49dbe9d64e9ae"],["/categories/数据结构与算法/index.html","ed1421c1652687b10b5566aac7f33756"],["/categories/数据结构与算法/page/2/index.html","7d489e90ea9adec80bb926be5d276d5a"],["/categories/深入理解计算机系统/index.html","6096fdd61e06b3199818549a0ec0b641"],["/categories/深度探索C-对象模型/index.html","4ca3dd51c9ecdc34f1694074ee6cf349"],["/categories/网络编程/index.html","360df216ee4f316dd0494c0c0fd73080"],["/categories/计算机网络/index.html","e68a1bf70456ce2266d1206f3da39c29"],["/categories/项目/index.html","e967cabbf2f00163938d4ca94bb48be6"],["/css/main.css","d08def01e9f9cfd553f168d05e03f7ad"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay-reward.jpg","62c55e80df697bd54df73aa8f781de7e"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/autosong1.gif","dd87512cbf904f69c268884614f40142"],["/images/avatar.gif","7a2fe6b906600a9354cece6d9ced2992"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","3db20a18f49429e5c21e7a41352378de"],["/images/favicon-32x32-next.png","2f2825d8a7e7439c2f3c266ba30dc1bb"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","428f2f45031a2081f461f4a5fa19ab85"],["/images/wechat-qcode.jpg","91260428d8961c5b9a1ba71c974d8d7a"],["/images/wechat-reward.png","92265a55e51f570d805f5229849f7960"],["/index.html","8a1ac810bab1aa89c310053de1f90180"],["/js/affix.js","f117a3586e463c75c61fde98e5c71770"],["/js/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["/js/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["/js/instantclick.min.js","865d92a4a07409b7fed739e6a108e9c4"],["/js/js.cookie.js","b3c11fce5a994317ce1f7a287fe25326"],["/js/motion.js","e4ffedf8ad9f3443a28104bcf32b3cb2"],["/js/next-boot.js","f439007f5f8f0cc3b2d99e5e77150950"],["/js/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["/js/schemes/muse.js","c89944302b0258593e1e6336e5b6c7ed"],["/js/schemes/pisces.js","1bd23ed75238ebf11afe2aa6b1c3a25b"],["/js/scroll-cookie.js","3f0a99d7b74dd63bc2382eb28c4de003"],["/js/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["/js/utils.js","5786748aa3710f31829398e20f1dd899"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","b9f24c0c3fde0a20b13c16bc2600e129"],["/page/3/index.html","37aaf718c7e9678a90e6863286cb2384"],["/page/4/index.html","2e440076e5ef6390e1d3224bc85d6222"],["/page/5/index.html","898a67bf35ac94ff0097123fd49f973e"],["/style.css","d41d8cd98f00b204e9800998ecf8427e"],["/sw-register.js","da046223e9c9fcd3a02b104846bc5fd4"],["/tags/C-Primer/index.html","f21f2e280907245f4d1c4ec2d2e93dc5"],["/tags/CSAPP/index.html","49f6c0e03a24ed85db25fef6f44d721d"],["/tags/ICMP/index.html","68b6eba35a8fb8f52b1b181d9c1c1fce"],["/tags/IP/index.html","959cfc17746f53c16f66febc85ab4925"],["/tags/InformationSafe/index.html","6c4c77dc2bbbd1c40eef056207b960d5"],["/tags/Linux/index.html","cf34427a7cdce50c9ec106ea1dd85d16"],["/tags/MAC层/index.html","6cf7e84c4561b8f43a3b89eecc7f0885"],["/tags/UDP/index.html","ce22c3eeb6c077b4e4b0f42ffd2ac7b8"],["/tags/UDP和TCP的区别/index.html","b952485a56f99093d0d207af795e76ef"],["/tags/Web服务器/index.html","b1139b0df8fc1330ad922640c92a631a"],["/tags/Web服务器用到的C函数/index.html","38f19f801f3b5800e683d0bb89ee38cc"],["/tags/database/index.html","ea110921208c876fc489427173f2537e"],["/tags/http事务/index.html","ede2adc765b28303d058cf8445f125e6"],["/tags/index.html","65490543e7a4a8e7cb38dd9e72a1663a"],["/tags/myblog/index.html","5158db7913c116390af2c9d147258bac"],["/tags/tcp/index.html","a0bc6efc105869421f684b2643bcb494"],["/tags/tcp编程/index.html","4bf17dcade6c5383344e7440d292b69f"],["/tags/vector/index.html","859c89b968dbf4dc0092c939f9a71303"],["/tags/内存映射/index.html","9075c5983a924d7d08a6f3fa1e3a0f62"],["/tags/并发Web服务器/index.html","093dec6233e34808bd502c56063c30fe"],["/tags/指针与内存/index.html","a58f4b83ab0d564878599a2ffc73f6f5"],["/tags/数据结构/index.html","a50ec2815de96ffe1e9e3718863bfdc0"],["/tags/深入理解计算机系统/index.html","c4efc834e432ae93104283b20a9f022e"],["/tags/算法/index.html","6b9dab9710541ec6fefe67b8a668c100"],["/tags/算法/page/2/index.html","28a513fd87ec2c2061a75cd2c18d101b"],["/tags/算法思想/index.html","bacdec7dbe39a128a92920f72cc2d03c"],["/tags/虚函数/index.html","2b96da0d9b45277b072bcb49c83e6748"],["/tags/进程在底层到底是啥真面目/index.html","19438276711c1d406649a7aad4b4625a"],["/tags/进程的开始/index.html","2deae9030c0af6d796aa2be985c56bd4"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
