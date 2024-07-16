# 一张图看懂 encodeURI、encodeURIComponent、decodeURI、decodeURIComponent 的区别
from :https://baijiahao.baidu.com/s?id=1756417499247788061&wfr=spider&for=pc

这四个方法的用处

## **1、用来编码和解码 URI 的**

统一资源标识符，或叫做 URI，是用来标识互联网上的资源（例如，网页或文件）和怎样访问这些资源的传输协议（例如，HTTP 或 FTP）的字符串。除了 encodeURI、encodeURIComponent、decodeURI、decodeURIComponent 四个用来编码和解码 URI 的函数之外 ECMAScript 语言自身不提供任何使用 URL 的支持。

## **2、URI 组成形式**

一个 URI 是由组件分隔符分割的组件序列组成。其一般形式是：

    Scheme : First / Second ; Third ? Fourth

其中斜体的名字代表组件；“:”, “/”, “;”，“?” 是当作分隔符的**保留字符**。

## **3、有和不同？**

encodeURI 和 decodeURI 函数操作的是完整的 URI；这俩函数假定 URI 中的任何保留字符都有特殊意义，所有不会编码它们。

encodeURIComponent 和 decodeURIComponent 函数操作的是组成 URI 的个别组件；这俩函数假定任何保留字符都代表普通文本，所以必须编码它们，所以它们（保留字符）出现在一个完整 URI 的组件里面时不会被解释成保留字符了。

以上说明摘自ECMAScript 标准，为了容易读懂做了点编辑加工。

## **4、图解四个函数的不同**

![0824ab18972bd407229db09cb4903b5a0fb30919.webp](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/437633540b284cfbb2a4208c18937adf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=640\&h=1904\&s=138636\&e=webp\&b=dbdbdb)
ECMA 对这四个函数还做了详细解释，可能是为了写的更逻辑化一些，采用了类似变量配合逻辑的写法来说明，但是让初学者看得云里雾里的特别绕，所以有必要把它写得更像是人读的东西…

![转存失败，建议直接上传图片文件](<转存失败，建议直接上传图片文件 >)

当 URI 里包含一个没在上面列出的字符或有时不想让给定的保留字符有特殊意义，那么必须编码这个字符。字符被转换成 UTF-8 编码，首先从 UTF-16 转换成相应的代码点值的替代。然后返回的字节序列转换为一个字符串，每个字节用一个 %xx 形式的转移序列表示。具体转换规则可以参考抽象操作 Encode和 Decode\*\*\*\* 的说明。
