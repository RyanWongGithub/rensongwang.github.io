/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2019/03/17/个人博客hexo + NexT + Mist的美化/index.html","53a88a7fa7c7fd78ff97451cb7109c3d"],["/2019/03/17/个人博客整体改动/index.html","92c60fb1e9593204e7bd59392863eaf3"],["/2019/03/18/利用Git分支管理博客资源/index.html","e51227accc0931b833838e0e0175f7ee"],["/2019/03/19/持续优化-加速hexo博客/index.html","609556425605eb8934099ac1512b2610"],["/2019/03/20/next主题的一些问题以及改动/index.html","6e5713134672522d3d9a53d35d6c702b"],["/2019/03/27/C11-and-常用总结（持续更新）/index.html","2679254f6b33feaecb7848e15c252502"],["/2019/03/28/csapp：信息的表示和处理/index.html","22d27fc9b97026fa72960e894c5ac958"],["/2019/04/03/csapp：程序的机器级表示/index.html","6374a0743d4a3022512822f15763bcbd"],["/2019/04/08/小知识点总结/index.html","081dc1b4a8cd9519eeae8d05076a4e76"],["/2019/04/14/csapp：对于优化程序性能的理解/index.html","97606ea7d9060f2e760bf98abcb9c0de"],["/2019/04/15/csapp：对于高速缓存的理解/index.html","a787748d2b62457d16790411ed5263ee"],["/2019/04/22/对于异常控制流的理解/index.html","2b8fbd31b7cae4642e165b46e23254bd"],["/2019/04/24/信息安全概论漫游/index.html","0631cd74c1e81626769799df5284ce39"],["/2019/05/07/虚拟内存到底是啥，有多强大/index.html","1644282dff06e4a4863966cbfafe2ad1"],["/2019/05/15/算法的入门：排序/index.html","593e0ea8c183dd1b9c099fce9a97657d"],["/2019/05/26/数据库基础知识小总结/index.html","1d6978eed98b5dc13965eea84fc25f23"],["/2019/07/01/Linux-开始/index.html","15b13ad885693b07b6cb7274a0af3c3d"],["/2019/07/01/Linux-进程权限/index.html","dc4ab67a813486868c109a5134553b8b"],["/2019/07/01/排序-冒泡插入选择/index.html","1b150a606797ff08e6631b9a5e23e03f"],["/2019/07/01/排序-归并快排/index.html","157010e49038a5a2c2d79142484b1167"],["/2019/07/02/排序-打造一个高性能通用的排序方法/index.html","b0355daee963ca94c03cd8de9129b3a4"],["/2019/07/02/排序-桶排计数排基数排/index.html","2ad5ad2f1cae5dce67510d55025c4d06"],["/2019/07/03/看似简单的二分查找有多少玄机/index.html","5ecd754e8641fc6de477096546178394"],["/2019/07/04/怎么打造一个工业级散列表/index.html","cad3df38829c106e8c434ddf714f209f"],["/2019/07/08/哈希算法/index.html","809aedb0e7fe68e39f9d0df76ccd5bdf"],["/2019/07/08/排序-堆排序/index.html","69a6046b17868f5563406b48627c5805"],["/2019/07/08/红黑树/index.html","984fafdeb00cfa2d679695dfd3b71af1"],["/2019/07/23/Trie树和AC自动机的应用/index.html","e20655697ee44c34bb89f9ac1b6bc8f2"],["/2019/07/23/图以及暴力的bfs和dfs/index.html","3c7a749063af231f31ce995cfcc43297"],["/2019/07/23/字符串匹配/index.html","b514cc994e87b0cec6ee27ad6dc2c3f3"],["/2019/07/23/贪心算法/index.html","7a4d5095d0226a4f4fd0aa428eb31676"],["/2019/08/03/从C-对象到虚函数的实现机制/index.html","2653cb4d4d0c688e73065efdf4b6a0c7"],["/2019/08/04/从C-的构造函数谈vector的深拷贝/index.html","b8830a25fb5f0625d7865f2fb1b8665e"],["/2019/08/06/一个小的局域网打联机游戏/index.html","6dc0e97015d725b02a52b75c0d4800e6"],["/2019/08/06/对于IP的理解/index.html","13e64bc18554a8a6a3d4f516657d0773"],["/2019/08/08/UDP-小孩子一样的纯真/index.html","8dc764ee9f3f4da4d0690f79dc184d38"],["/2019/08/08/ping和ICMP/index.html","5e72e0e2fe9aa1f4052bdc2c8b05b602"],["/2019/08/09/TCP-为了连接我真的是竭尽全力/index.html","40390b23269901e15cdb14690e6146a3"],["/2019/08/09/UDP和TCP的区别/index.html","2d94173fa730b8e4e8cb4b72fd8a256a"],["/2019/08/16/socket编程实现tcp并发回射服务器客户端程序/index.html","96285074e58aa7aff970192a8c3b9b6d"],["/2019/08/18/个人项目：200多行代码实现一个简单的Web服务器/index.html","355ca314f5fe1bfe9168e5beb2644ade"],["/2019/08/18/初探Http事务/index.html","97264ed229adaebdc83c62d03edbbb48"],["/2019/08/20/个人项目：基于预线程化的并发Web服务器/index.html","1d66ffed2cd5dc22cf4241e3dec1266b"],["/2019/08/20/关于那些操作字符串的C函数/index.html","3afc20d958cdb6ddd3e1308c86a1e76d"],["/2019/08/21/分配动态内存返回的指针就是与众不同？/index.html","79b38b8f63525f8092cdaf65f2ac6658"],["/2019/08/23/关于链接、虚拟内存、内存映射的一些疑惑/index.html","74acfda07e479f72a88db6d8d29a3af2"],["/2019/08/23/链接：一个程序到一个进程的蜕变/index.html","bc4213b03b7c4cfa30d76119abf37245"],["/2019/08/24/内存映射：虚拟内存进行工作的进一步真相/index.html","949f0226e8a5584d0110708c8eb218ad"],["/about/index.html","b21978c8239320227ef4374afe1b1fb9"],["/archives/2019/03/index.html","f1d1cad26354a9f5e6cc73d1b90b2fdd"],["/archives/2019/04/index.html","679797cde5212cf143d9d841515e17aa"],["/archives/2019/05/index.html","b5a0cee2960cc00aad506d15430d686a"],["/archives/2019/07/index.html","ec807669be5db7803883b4dbbb9c71b5"],["/archives/2019/07/page/2/index.html","a458834da06d420b0d54c6861128ea0a"],["/archives/2019/08/index.html","c4eaca0f6b7e31798c3869ec074c8e06"],["/archives/2019/08/page/2/index.html","faa35a56a8e05572e07f1bc5ad9aa02a"],["/archives/2019/index.html","f41ec0a98e5d018b77e416632b0a9d77"],["/archives/2019/page/2/index.html","ff6a95bfd3fce41d6b9b5c84d00f1f82"],["/archives/2019/page/3/index.html","8e6681c85085a2a94e029e1deb4d80fb"],["/archives/2019/page/4/index.html","db75cc626440b807b721080689f3de4d"],["/archives/2019/page/5/index.html","e78f5e31eb8545335d1761113dfcec27"],["/archives/index.html","86b50b4c582019f1157e52d982f33bf8"],["/archives/page/2/index.html","f9f148068b4297e9a869eb291db470c4"],["/archives/page/3/index.html","f8c006c6b9de6e543defe92e766dd4df"],["/archives/page/4/index.html","6601ba9e05cf5c16b9eff2b9fc72cb52"],["/archives/page/5/index.html","5d3a64dcc2a67b7cd68d9176c14d6c4c"],["/bundle.js","57350149d38142288f8f6331aa659a5c"],["/categories/C-基础/index.html","9378268de4275798804395f263eb037e"],["/categories/CSAPP/index.html","1a0cbbe61effefab40d61b40079be7ab"],["/categories/C语言/index.html","a179356851a39340dcbb09a352b7bc31"],["/categories/UNIX环境高级编程/index.html","531f025f797b2e5c4c03e54cf548b791"],["/categories/index.html","92333d25d70e7c9f4528489b8b1d8677"],["/categories/一直困扰我的一些问题/index.html","a9a3d5ce99240ae5e7a009e532e9d318"],["/categories/信息安全/index.html","8d72cedf12ac11b39189fb22753140d0"],["/categories/博客维护/index.html","1e5bdd05e3ada787727a5f74f7e59b40"],["/categories/指针与内存/index.html","9dad344f28b9bc4025e33275a96f7951"],["/categories/操作系统个人理解系列/index.html","b2c6cbdb40b8c954b0b2595a3d447b5a"],["/categories/数据库系统/index.html","aeb11c3bd3ca936dd5ccce48098c8bfc"],["/categories/数据结构与算法/index.html","ee4b8715085a9e7a7b25d0f84a683682"],["/categories/数据结构与算法/page/2/index.html","ea596830d845de40341a314c2fd7c7fd"],["/categories/深入理解计算机系统/index.html","32d55c8396d6aab358481247290b7975"],["/categories/深度探索C-对象模型/index.html","973ae98b9c0d01f28e866d4a2095ca69"],["/categories/网络编程/index.html","ad3588676cdb18bd81c6a7159e260159"],["/categories/计算机网络/index.html","03804df4a6b7543878056f847b7bd7bf"],["/categories/项目/index.html","cc52793246ab359ee3cd0c8264606a61"],["/css/main.css","43a349650dac14ec69d1fb594b1ce969"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay-reward.jpg","62c55e80df697bd54df73aa8f781de7e"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/autosong1.gif","dd87512cbf904f69c268884614f40142"],["/images/avatar.gif","7a2fe6b906600a9354cece6d9ced2992"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","3db20a18f49429e5c21e7a41352378de"],["/images/favicon-32x32-next.png","2f2825d8a7e7439c2f3c266ba30dc1bb"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","428f2f45031a2081f461f4a5fa19ab85"],["/images/wechat-qcode.jpg","91260428d8961c5b9a1ba71c974d8d7a"],["/images/wechat-reward.png","92265a55e51f570d805f5229849f7960"],["/index.html","7ca4f400c5bdc1702cd5bff3177bc56d"],["/js/affix.js","f117a3586e463c75c61fde98e5c71770"],["/js/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["/js/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["/js/instantclick.min.js","865d92a4a07409b7fed739e6a108e9c4"],["/js/js.cookie.js","b3c11fce5a994317ce1f7a287fe25326"],["/js/motion.js","e4ffedf8ad9f3443a28104bcf32b3cb2"],["/js/next-boot.js","f439007f5f8f0cc3b2d99e5e77150950"],["/js/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["/js/schemes/muse.js","c89944302b0258593e1e6336e5b6c7ed"],["/js/schemes/pisces.js","1bd23ed75238ebf11afe2aa6b1c3a25b"],["/js/scroll-cookie.js","3f0a99d7b74dd63bc2382eb28c4de003"],["/js/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["/js/utils.js","5786748aa3710f31829398e20f1dd899"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","3c86a3875c2d660ab49cc5852b9c27c2"],["/page/3/index.html","ef40d54822ed092144987a22676fe005"],["/page/4/index.html","f3c191e307856a9751aed390b0e2d628"],["/page/5/index.html","933f1fa9484be5241015b9f132ebe0b8"],["/style.css","d41d8cd98f00b204e9800998ecf8427e"],["/sw-register.js","b4289d4fe71197506755baaaa83f962b"],["/tags/C-Primer/index.html","c6f72481133a18cba9392c734e9a263d"],["/tags/CSAPP/index.html","fcd4b79dba83c784d63a2f4575a778bf"],["/tags/ICMP/index.html","ba1f9ca70e476afc415da9571beae8ff"],["/tags/IP/index.html","01679a685a9b7603e992525e0f079519"],["/tags/InformationSafe/index.html","4049682d5612ee1cf1b55def6f56b8bf"],["/tags/Linux/index.html","54511aef7899103d53dc687c517b9a74"],["/tags/MAC层/index.html","bf96142334173025ebae109af62424a8"],["/tags/UDP/index.html","7b600dc86eae488dd6ff3ce0f54f5d8e"],["/tags/UDP和TCP的区别/index.html","2d77151052d9d87a2a2d1bbdc432e11b"],["/tags/Web服务器/index.html","42900ed2c7f207b4d9ba0839001aa868"],["/tags/Web服务器用到的C函数/index.html","e97932aae6dd97f8f175863a16f70139"],["/tags/database/index.html","81e88fa72f98fc8877e3f66436993a13"],["/tags/http事务/index.html","594b4e4258b51fb1e211820e087d074c"],["/tags/index.html","08ddc48f94267b95cff71c32490862cc"],["/tags/myblog/index.html","626aba5125ede16a37fcbbf32b034cd2"],["/tags/tcp/index.html","14ed9cbd5b5967acd4ba90c9eadf6dcd"],["/tags/tcp编程/index.html","fffa29b826345d927870c6bb148771c2"],["/tags/vector/index.html","65453639651a8954090b4d84f09bbafb"],["/tags/内存映射/index.html","e90bc741549b140a0fb9939a776a5c64"],["/tags/并发Web服务器/index.html","098e80aa815694c72e2fddb19348a2d9"],["/tags/指针与内存/index.html","982a56a301ee52b3a7fe65fa6bb91a90"],["/tags/数据结构/index.html","b3cea4ef625ee8b08726148c96d24203"],["/tags/深入理解计算机系统/index.html","d2f0390a6eadcd58f263b4a36e7fa42e"],["/tags/算法/index.html","7409719b77f9a127fa56c1d810de5467"],["/tags/算法/page/2/index.html","d903cc12be22a4c7b8326fbe48ffe3b6"],["/tags/算法思想/index.html","c24d68856b7006944c10eeed687bb34c"],["/tags/虚函数/index.html","144330f50b7ab26a42f9bf1adc4f1191"],["/tags/进程在底层到底是啥真面目/index.html","9181be5a7125431e3758ac5854260efd"],["/tags/进程的开始/index.html","0167bd73518561ac48e03356fefc8ec8"]];
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
