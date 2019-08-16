/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2019/03/17/个人博客hexo + NexT + Mist的美化/index.html","51ee5312a664ff14d69c03df877fea15"],["/2019/03/17/个人博客整体改动/index.html","f3cab14acbaa9fa7076cad539445dbef"],["/2019/03/18/利用Git分支管理博客资源/index.html","53496b897e3bf85087240d2b544870d1"],["/2019/03/19/持续优化-加速hexo博客/index.html","d2fa776fc769c31f0c686b442c620d74"],["/2019/03/20/next主题的一些问题以及改动/index.html","8539cba89591db921cde1eb562f2c9dc"],["/2019/03/27/C11-and-常用总结（持续更新）/index.html","179bb19b900594c3b20b905dc497892c"],["/2019/03/28/csapp：信息的表示和处理/index.html","931fae95584f56f7b45d7e4815bc352d"],["/2019/04/03/csapp：程序的机器级表示/index.html","0f74c24cd92b834ce5727af3f71aebbc"],["/2019/04/08/小知识点总结/index.html","2de2bba44f341a1b05ec97ff518dd366"],["/2019/04/14/csapp：对于优化程序性能的理解/index.html","1f1cf86ba5f3a67625e8b67a1baa1bbd"],["/2019/04/15/csapp：对于高速缓存的理解/index.html","c863ba1867b5e3775c81df301e53bde4"],["/2019/04/22/对于异常控制流的理解/index.html","cfc197e04a1dc7f0931a1848479dd410"],["/2019/04/24/信息安全概论漫游/index.html","46cc14bf0bba9b4997d210139d0e87fa"],["/2019/05/07/虚拟内存到底是啥，有多强大/index.html","a2e4ebdeacb5ac277a62f968599e20d7"],["/2019/05/15/算法的入门：排序/index.html","4633443a38cfdc8deaf97ef0ee163fff"],["/2019/05/26/数据库基础知识小总结/index.html","39dbacd12c1ea62427dec7a29b2e0ee6"],["/2019/07/01/Linux-开始/index.html","929a47c87e5678fdaa886e46cfa3488e"],["/2019/07/01/Linux-进程权限/index.html","1a98ee0bfd837fd54a98a213db754013"],["/2019/07/01/排序-冒泡插入选择/index.html","9431ba6dc312a0b5d68bbba71b8476ad"],["/2019/07/01/排序-归并快排/index.html","00c519d9b7b1ac4dc1768c3e21ce88b3"],["/2019/07/02/排序-打造一个高性能通用的排序方法/index.html","cead11c74d789b1e948d815d1665b990"],["/2019/07/02/排序-桶排计数排基数排/index.html","cb910f042498a41fd5ae78b41e568f30"],["/2019/07/03/看似简单的二分查找有多少玄机/index.html","c917e17c000849f26eb9fad2cc037b5c"],["/2019/07/04/怎么打造一个工业级散列表/index.html","06614d35575590aa303caef10d56830f"],["/2019/07/08/哈希算法/index.html","70ff730cde871dcc7daf219f82994fbe"],["/2019/07/08/排序-堆排序/index.html","f3195f295909809b30b41d86a8be5692"],["/2019/07/08/红黑树/index.html","262bef20da9e543a390492a842735edc"],["/2019/07/23/Trie树和AC自动机的应用/index.html","1f24d96dba592e4603277130dd9ddfca"],["/2019/07/23/图以及暴力的bfs和dfs/index.html","73322763e66196960faabe343bb442a5"],["/2019/07/23/字符串匹配/index.html","77d6f267435e01fe5e68e7d407af0cb0"],["/2019/07/23/贪心算法/index.html","60c5b25633eca863bce69319f414840e"],["/2019/08/03/从C-对象到虚函数的实现机制/index.html","944305e3288845ba7488161b8c3c1ff2"],["/2019/08/04/从C-的构造函数谈vector的深拷贝/index.html","49ccd0f3e14ee737b8337f8450f85d38"],["/2019/08/06/一个小的局域网打联机游戏/index.html","f33810ac348c4d93db6c83e1a8ee5f6c"],["/2019/08/06/对于IP的理解/index.html","62d031f509ffa439710d228c19a0eb31"],["/2019/08/08/UDP-小孩子一样的纯真/index.html","b04eb674c59bbabc4795c47145efeb14"],["/2019/08/08/ping和ICMP/index.html","df9c6b3604688daa9bad039ff212a7ab"],["/2019/08/09/TCP-为了连接我真的是竭尽全力/index.html","ddb77b69ad358b3eaf529f2c33d25493"],["/2019/08/09/UDP和TCP的区别/index.html","6ca2e4287c206bdf8b54232875a4b3c9"],["/2019/08/16/socket编程实现tcp并发回射服务器客户端程序/index.html","06ea3ff34bb02711e455410426afbd39"],["/about/index.html","8eccafbffccd633b184b49d9001afcef"],["/archives/2019/03/index.html","70983023c2101fc77e84970790f5fafd"],["/archives/2019/04/index.html","c58a4936cf5074b08c35d9b59ebfd9e6"],["/archives/2019/05/index.html","2bc11a4100836ad32c97084a448ac010"],["/archives/2019/07/index.html","6bf716e17fae92dc8a6ee71e8702c308"],["/archives/2019/07/page/2/index.html","f1c29261d398d21d6d6303a4b7d6af3d"],["/archives/2019/08/index.html","5ecd1c922cae1f5bb8250bcfb89d15d1"],["/archives/2019/index.html","576a333e78a652572d05105a7a7823e1"],["/archives/2019/page/2/index.html","3441e001a694209f53ede80ebef06a36"],["/archives/2019/page/3/index.html","f1a53919c6bd3f4d2d25e84279f786e0"],["/archives/2019/page/4/index.html","8c1c9bbdd7d6ac5003391e7b9593611d"],["/archives/index.html","d077a47b34166b18acbf6e919148fb4d"],["/archives/page/2/index.html","dbe01c58daf8c6ecc7faf113121d054a"],["/archives/page/3/index.html","71bc88972fa2120151203e6517c27687"],["/archives/page/4/index.html","31b37a721f87ed422593fa6d404b38ea"],["/bundle.js","57350149d38142288f8f6331aa659a5c"],["/categories/C-基础/index.html","172973ce65e8a9798e038e43b2fd54f3"],["/categories/CSAPP/index.html","4a55a6d572977e0ea68b11ec4f44fd99"],["/categories/UNIX环境高级编程/index.html","bd24789b06f5a2d6939dff32829aa972"],["/categories/index.html","151a6543aeed4b2de45cf509347a8e7d"],["/categories/信息安全/index.html","6c8cc6f28ec3c2b02d910cd90c8584de"],["/categories/博客维护/index.html","eef736adff541582473b2542b37c81ee"],["/categories/数据库系统/index.html","40a45abf2c933286340232c5354cbedd"],["/categories/数据结构与算法/index.html","872462a50c434ca0f29a97137f218e64"],["/categories/数据结构与算法/page/2/index.html","6570a05b858e8a9171c0398d3f979590"],["/categories/深入理解计算机系统/index.html","4fd0b73b2cf148ec3f813f2472689af5"],["/categories/深度探索C-对象模型/index.html","18a4197fb4a899a6f0691ec4007484f9"],["/categories/网络编程/index.html","673a0efab2e3e42209fc1170dd0472b1"],["/categories/计算机网络/index.html","427f157f10b3be1809bfa3020f408376"],["/css/main.css","a048d6c9d83bb5c4151e21103815dc7e"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay-reward.jpg","62c55e80df697bd54df73aa8f781de7e"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/autosong1.gif","dd87512cbf904f69c268884614f40142"],["/images/avatar.gif","7a2fe6b906600a9354cece6d9ced2992"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","3db20a18f49429e5c21e7a41352378de"],["/images/favicon-32x32-next.png","2f2825d8a7e7439c2f3c266ba30dc1bb"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","428f2f45031a2081f461f4a5fa19ab85"],["/images/wechat-qcode.jpg","91260428d8961c5b9a1ba71c974d8d7a"],["/images/wechat-reward.png","92265a55e51f570d805f5229849f7960"],["/index.html","ce9e96f322ebea8695957fc1ec9db2bf"],["/js/affix.js","f117a3586e463c75c61fde98e5c71770"],["/js/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["/js/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["/js/instantclick.min.js","865d92a4a07409b7fed739e6a108e9c4"],["/js/js.cookie.js","b3c11fce5a994317ce1f7a287fe25326"],["/js/motion.js","e4ffedf8ad9f3443a28104bcf32b3cb2"],["/js/next-boot.js","f439007f5f8f0cc3b2d99e5e77150950"],["/js/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["/js/schemes/muse.js","c89944302b0258593e1e6336e5b6c7ed"],["/js/schemes/pisces.js","1bd23ed75238ebf11afe2aa6b1c3a25b"],["/js/scroll-cookie.js","3f0a99d7b74dd63bc2382eb28c4de003"],["/js/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["/js/utils.js","5786748aa3710f31829398e20f1dd899"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","73af74c26ec82261cd1aed4f47a863ad"],["/page/3/index.html","b5453de329ee0df91f999e4ce5d86dd3"],["/page/4/index.html","0ed3f8992351b3b1148e0cb3926cae7a"],["/style.css","d41d8cd98f00b204e9800998ecf8427e"],["/sw-register.js","ae2a3493607eb1fbfb7eb522939a4765"],["/tags/C-Primer/index.html","cc61d66bff4e927a476f788c184d591e"],["/tags/CSAPP/index.html","e22597ecb77c625a92c2f22732b60f10"],["/tags/ICMP/index.html","02940e3e4d49eff94d3d5b1b3e297f87"],["/tags/IP/index.html","39f6b5035a5e595f15aa474ea88c6b54"],["/tags/InformationSafe/index.html","85d6819edcc1df455a2632a007713774"],["/tags/Linux/index.html","85874de89aff8ca4e88e4ef1369810ca"],["/tags/MAC层/index.html","d0a3c020822d4e1cb66be19b1969d70b"],["/tags/UDP/index.html","3729cfac3808718671279fd17a629f9d"],["/tags/UDP和TCP的区别/index.html","d8ef868ae59212e53cde2e9c625b0059"],["/tags/database/index.html","945ed55dfc161207181d409f3ce588d0"],["/tags/index.html","fcb54e103c268318d900047a8a92b022"],["/tags/myblog/index.html","7c9f93bb804e2d1c090be1ced7a96455"],["/tags/tcp/index.html","bb9725d8200dbd0660ddca5778637ef8"],["/tags/tcp编程/index.html","e28db2dec6121f14fab64339143bc4d6"],["/tags/vector/index.html","acdcc68e8cecd72adba4e8f69387f065"],["/tags/数据结构/index.html","46657f15d8ffde6f112d95baa737970f"],["/tags/深入理解计算机系统/index.html","ef031422109136c931635f134c4cc810"],["/tags/算法/index.html","4a062eaad633265140846190e2efb94b"],["/tags/算法/page/2/index.html","3c6f34123d443f1191c096f01e4990b4"],["/tags/算法思想/index.html","e89d5766429f9b6c497bee0761b0aa36"],["/tags/虚函数/index.html","23994ee40c17abf8d69e3805d730f467"]];
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
