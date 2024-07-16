---
highlight: mono-blue
theme: github
---

# HTTPS

## HTTPS简介

**HTTPS**(全称Transfer Protocol over Secure Socket Layer安全套接字层上的超文本传输协议) 是以安全为目标的HTTP通道，简言
之，HTTPS.是HTTP的安全版本，HTTPS在HTTP的基础上加入SSL层或TLS层(SSL层升级版)，以保证链接安全。

作用:

-   数据加密防监听
-   数据验证防篡改
-   身份验证防劫持

## HTTPS优势

### HTTP的不足

1.  明文传输，内容未加密，容易被监听
2.  无法验证内容的完整性，容易被篡改
3.  无法验证对方的身份
4.  容易被劫持，接收到恶意推广

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b558a0eccc814bf0a4f41c9f7fbb575a~tplv-k3u1fbpfcp-watermark.image" alt="" width="50%" /><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f996023b247402c8641b2744ca9e677~tplv-k3u1fbpfcp-watermark.image" alt="" width="50%" />

| 特征         | HTTP           | HTTPS                 |
| ------------ | -------------- | --------------------- |
| 安全性       | 弱             | 强                    |
| 网址         | HTTP://xxx.com | HTTPS://xxx.com       |
| 端口         | 80             | 443                   |
| 数据传输     | 明文传输       | 加密传输              |
| 证书         | 无             | 需CA证书              |
| 状态         | 无状态         | 需身份认证            |
| 底层通信协议 | TCP            | TCP                   |
| 应用层协议   | HTTP           | HTTP TLS/SSL          |
| 握手次数     | 三次           | 七次(TCP三次+SSL四次) |

注：CA证书为由受信任的第三方机构颁发的数字证书，用于验证服务器的身份和加密通信。

## GET 和 POST 有什么区别？

首先最直观的是语义上的区别。而后又有这样一些具体的差别:

-   从缓存的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
-   从编码的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
-   从参数的角度，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。
-   从幂等性的角度，GET是幂等的，而POST不是。(幂等表示执行相同的操作，结果也是相同的)
-   从TCP的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应
    100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)

# Header: 请求头参数详解

| Header              | 解释                                                                                                                     | 示例                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Accept              | 指定客户端能够接收的内容类型                                                                                             | Accept: text/plain, text/html,application/json                                     |
| Accept-Charset      | 浏览器可以接受的字符编码集。                                                                                             | Accept-Charset: iso-8859-5                                                         |
| Accept-Encoding     | 指定浏览器可以支持的web服务器返回内容压缩编码类型。                                                                      | Accept-Encoding: compress, gzip                                                    |
| Accept-Language     | 浏览器可接受的语言                                                                                                       | Accept-Language: en,zh                                                             |
| Accept-Ranges       | 可以请求网页实体的一个或者多个子范围字段                                                                                 | Accept-Ranges: bytes                                                               |
| Authorization       | HTTP授权的授权证书                                                                                                       | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==                                  |
| Cache-Control       | 指定请求和响应遵循的缓存机制                                                                                             | Cache-Control: no-cache                                                            |
| Connection          | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）                                                                       | Connection: close                                                                  |
| Cookie              | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。                                                | Cookie: \$Version=1; Skin=new;                                                     |
| Content-Length      | 请求的内容长度                                                                                                           | Content-Length: 348                                                                |
| Content-Type        | 请求的与实体对应的MIME信息                                                                                               | Content-Type: application/x-www-form-urlencoded                                    |
| Date                | 请求发送的日期和时间                                                                                                     | Date: Tue, 15 Nov 2010 08:12:31 GMT                                                |
| Expect              | 请求的特定的服务器行为                                                                                                   | Expect: 100-continue                                                               |
| From                | 发出请求的用户的Email                                                                                                    | From: <user@email.com>                                                             |
| Host                | 指定请求的服务器的域名和端口号                                                                                           | Host: [www.zcmhi.com](http://www.zcmhi.com)                                        |
| If-Match            | 只有请求内容与实体相匹配才有效                                                                                           | If-Match: “737060cd8c284d8af7ad3082f209582d”                                       |
| If-Modified-Since   | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码                                                      | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT                                   |
| If-None-Match       | 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变                                | If-None-Match: “737060cd8c284d8af7ad3082f209582d”                                  |
| If-Range            | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag                                               | If-Range: “737060cd8c284d8af7ad3082f209582d”                                       |
| If-Unmodified-Since | 只在实体在指定时间之后未被修改才请求成功                                                                                 | If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT                                 |
| Max-Forwards        | 限制信息通过代理和网关传送的时间                                                                                         | Max-Forwards: 10                                                                   |
| Pragma              | 用来包含实现特定的指令(指定“no-cache”值表示服务器必须返回一个刷新后的文档，即使它是代理服务器而且已经有了页面的本地拷贝) | Pragma: no-cache                                                                   |
| Proxy-Authorization | 连接到代理的授权证书                                                                                                     | Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==                            |
| Range               | 只请求实体的一部分，指定范围                                                                                             | Range: bytes=500-999                                                               |
| Referer             | 先前网页的地址，当前请求网页紧随其后,即来路                                                                              | Referer: [http://www.zcmhi.com/archives...](http://www.zcmhi.com/archives/71.html) |
| TE                  | 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息                                                                 | TE: trailers,deflate;q=0.5                                                         |
| Upgrade             | 向服务器指定某种传输协议以便服务器进行转换（如果支持）                                                                   | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11                                     |
| User-Agent          | User-Agent的内容包含发出请求的用户信息                                                                                   | User-Agent: Mozilla/5.0 (Linux; X11)                                               |
| Via                 | 通知中间网关或代理服务器地址，通信协议                                                                                   | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)                                        |
| Warning             | 关于消息实体的警告信息                                                                                                   | Warn: 199 Miscellaneous warning                                                    |
