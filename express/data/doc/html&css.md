# 语义化标签

1.  **概念**：

    HTML5的语义化指的是`合理正确的使用语义化的标签来创建页面结构`。【正确的标签做正确的事】

2.  **语义化标签**：

    header nav main article section aside footer

3.  **语义化的优点**:

-   在`没CSS样式的情况下，页面整体也会呈现很好的结构效果`
-   `代码结构清晰`，易于阅读，
-   `利于开发和维护` 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
-   `有利于搜索引擎优化（SEO）`，搜索引擎爬虫会根据不同的标签来赋予不同的权重

# \<head>标签

-   **title** 是必要的，但是如果没有加，浏览器也会自动帮你加上。 `<title>web</title>`

-   **Encoding**（编码方式）`<meta charset="UTF-8">`

    编码方式的规范是放在head的最前面，如果不指定，浏览器也会根据服务器的header进行判定，但是不一定准确。

-   **Description**（网站描述）`<meta name="description"content="这里是对网站的描述">`

    之前没有注意到这个，就是对你的网站描述，搜索引擎会看到，在SEO里面应该很常用

-   **Viewport** `<meta name="viewport" content="width=device-width, initial-scale=1"> `

              这个就很常见了，viewport一般是做移动端适配，将页面放在一个虚拟的窗口中-viewport中，如果网页没有用viewport就会出现我们在手机浏览器打开时很小，而且还可以移动缩放，low爆了，viewport就是让网页开发者通过其大小,动态的设置其网页内容中控件元素的大小,从而使得在浏览器上实现和web网页中相同的效果(比例缩小)。用来更好支持响应式网站。

              - `width`:控制viewport的大小，一般情况下指定为device-width(单位为缩放为100%的CSS像素),也可以指定一个固定的值例如600.
              - `height`:和width相应,指定高度。
              - `initial-scal`:初始缩放比例,页面第一次load的时候的缩放比例。
              - `maximum-scale`:允许用户缩放到的最大比例。
              - `minimum-scale`:允许用户缩放到的最小比例。
              - `user-scalable`:用户是否可以手动缩放。

-   **Favicon** `<link rel="icon" href="/favicon.ico" type="image/x-icon"/>`

这个是网页标题左边的小图标，指定他的路径，如果没有指定，浏览器会在根目录下寻找

-   **css** `<link rel="stylesheet" href="css/test.css">`

通过link标签链入样式文件

-   **javascript**(重点）`<script src="js/test.js"></script>`

    通过script标签链入脚本文件

这里我们讨论几个点:

1. js文件放在head里面和放在body里面的区别首先放在head里面，script 标签如果沒加上 async属性的話，会 block 住浏览器，就是
   要下载完这个js文件才会进行下一步操作，如果文件很小还好，如果是比较大的，就会有阻塞的效果，影响用户体验。<br> 浏览器解
   析网页时是一行行解析的，就是说解析到head里面的js文件时就会停下来，而我们的Dom结构是在head下面的body标签里面，就是说我
   们得等js文件下载完成才能看到body的内容，那我们选择放在body底部的话，浏览器就会优先加载dom，解析到body底部的js时才去下
   载，但是在下载之前我们已经能看到body的内容，浏览体验就会好一点，那有人会问，放在body头部和底部有什么区别呢？其实放在
   body头部的话就和放在head里面一样的啦
2. js文件放在head里面有两个属性避免弊端

    - **`defer`**：如果一个script加了defer属性，即使放在head里面，它也会在html页面解析完毕之后再去执行，也就是类似于把这
      个script放在了页面底部。<scriptdefersrc="test.js"></script>
    - **`async`**：对于async，这个是html5中新增的属性，它的作用是能够异步的加载和执行脚本，不因为加载脚本而阻塞页面的加
      载。一旦加载到就会立刻执行。有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。但
      是很有可能不是按照原本的顺序来执行的。如果js前后有依赖性，用async，就很有可能出错。
      <scriptasyncsrc="test.js"></script>

3. 最好把js文件放在哪现在浏览器做了一些优化，即使把js放在head里面也不会有大问题，所以我们可以将必要的js放在head里面，比
   较大的js放在body的底部，但是最简单最好方法就是放在body底部，W3C是将js放在head里面；

# src和href的区别

-   **src**是指向外部资源的位置，指向的内容会嵌入到文档 中当前标签所在的位置，在请求src资源时会将其指向 的资源下载并应用
    到文档内，如js脚本，img图片和 frame等元素。当浏览器解析到该元素时，会暂停其他 资源的下载和处 理，知道将该资源加载、
    编译、执行 完毕，所以一般js脚本会放在底部而不是头部。

-   **href**是指向网络资源所在位置（的超链接），用来建立 和当前元素或文档之间的连接，当浏览器识别到它他指 向的 文件时，
    就会并行下载资源，不会停止对当前文 档的处理。

# 让一个元素水平居中/垂直居中/水平垂直居中

## **水平居中**

-   对于 行内元素 : `text-align: center`;

-   对于确定宽度的块级元素：

    （1）width和margin实现。`margin: 0 auto`;

    （2）绝对定位和margin-left: -width/2, 前提是父元素position: relative

-   对于宽度未知的块级元素

    （1）`table标签配合margin左右auto实现水平居中`。使用table标签（或直接将块级元素设值为 display:table），再通过给该标
    签添加左右margin为auto。

    （2）inline-block实现水平居中方法。display：inline-block和text-align:center实现水平居中。

    （3）`绝对定位+transform`，translateX可以移动本身元素的50%。

    （4）flex布局使用`justify-content:center`

## **垂直居中**

1.  利用 `line-height` 实现居中，这种方法适合纯文字类
1.  通过设置父容器 相对定位 ，子级设置 `绝对定位`，标签通过margin实现自适应居中
1.  弹性布局 flex :父级设置display: flex; 子级设置margin为auto实现自适应居中
1.  父级设置相对定位，子级设置绝对定位，并且通过位移 transform 实现
1.  `table 布局`，父级通过转换成表格形式，`然后子级设置 vertical-align 实现`。（需要注意的是：vertical-align: middle使用
    的前提条件是内联元素以及display值为table-cell的元素）

## 水平垂直居中

-   已知宽高。
    -   子绝父相定位。
    -   水平居中: text-align: center; <br>垂直居中: line-height = height
    -   margin + padding;
-   宽高未知

    -   子绝父相; 子上下左右均为0， margin: auto;
    -   flex

        -   父display:flex,子 margin:auto;
        -   父display:flex,jcc:center,aic:center;

    -   grid
        -   父display:grid , 子 justify-self: center; align-self: center;
    -   table-cell
        -   父： display: table-cell; vertical-align: middle; 子： margin: 0 auto;

# 标签元素分类

-   内联元素: span/strong/em/del/ins/label/a/sup/sub
-   块级元素: div/hx/p/address/ul/ol/li/dl/dt/dd/table/form/fieldset/legend
-   内联块元素: input/img/select/textarea/iframe

# CSS 四种引用方式

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd59c03dda5943b1b813fa4874134d7a~tplv-k3u1fbpfcp-watermark.image?)

# CSS 选择器及优先级

**选择器**

-   id选择器(#myid)
-   类选择器(.myclass)
-   属性选择器(a[rel="external"])
-   伪类选择器(a:hover, li:nth-child)
-   标签选择器(div, h1,p)
-   相邻选择器（h1 + p）
-   子选择器(ul > li)
-   后代选择器(li a)
-   通配符选择器(\*)

**优先级：**

-   `!important`
-   内联样式（1000）
-   ID选择器（0100）
-   类选择器/属性选择器/伪类选择器（0010）
-   元素选择器/伪元素选择器（0001）
-   关系选择器/通配符选择器（0000）

同一级别：后写的会覆盖先写的

带!important 标记的样式属性优先级最高； 样式表的来源相同时：

`!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性`

# position

-   **固定定位 fixed**： 元素的位置相对于浏览器窗口是固定位置，即使窗口是滚动的它也不会移动。Fixed 定 位使元素的位置与文
    档流无关，因此不占据空间。 Fixed 定位的元素和其他元素重叠。
-   **相对定位 relative**： 如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直 或水平位置，让
    这个元素“相对于”它的起点进行移动。 在使用相对定位时，无论是 否进行移动，元素仍然占据原来的空间。因此，移动元素会导致
    它覆盖其它框。
-   **绝对定位 absolute**： 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那 么它的位置相对
    于。absolute 定位使元素的位置与文档流无关，因此不占据空间。 absolute 定位的元素和其他元素重叠。
-   **粘性定位 sticky**： 元素先按照普通文档流定位，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的
    块级祖先元素）定位。而后，元素定位表现为在跨越特定阈值前为相对定 位，之后为固定定位。
-   **默认定位 Static**： 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声 明）。
    inherit: 规定应该从父元素继承 position 属性的值。

# CSS 盒子模型

CSS 盒模型本质上是一个盒子，它包括：边距，边框，填充和实际内容。CSS 中的盒子模型包括 IE 盒子模型和标准的 W3C 盒子模
型。  
在标准的盒子模型中，`width 指 content 部分的宽度`。  
在 IE 盒子模型中，`width 表示 content+padding+border 这三个部分的宽度`。

故在计算盒子的宽度时存在差异：

**标准盒模型：**  一个块的总宽度 = width+margin(左右)+padding(左右)+border(左右)

**怪异盒模型：**  一个块的总宽度 = width+margin（左右）（既 width 已经包含了 padding 和 border 值）

## box-sizing属性

box-sizing 规定两个并排的带边框的框，语法为 box-sizing：content-box/border-box/inherit

-   **content-box**：宽度和高度分别应用到元素的内容框，在宽度和高度之外绘制元素的内边距和边框。【标准盒子模型】
-   **border-box**：为元素设定的宽度和高度决定了元素的边框盒。【IE 盒子模型】
-   **inherit**：继承父元素的 box-sizing 值。

# 两端对齐

在做表单时我们经常遇到让上下两个字段对齐的情况，比如姓名， 手机号码， 出生地。这样我们就要用到 text-align， text-justify
样式了。text-align直接设为justify就行了，text-justify的情况就复杂了，可能有人对它还不熟悉。IE的取值如下：

-   **auto** :允许浏览器用户代理确定使用的两端对齐法则
-   **inter-word** :通过增加字之间的空格对齐文本。该行为是对齐所有文本行最快的方法。它的两端对齐行为对段落的最后一行无效

-   **newspaper**: 通过增加或减少字或字母之间的空格对齐文本。是用于拉丁文字母表两端对齐的最精确格式

-   **distribute**: 处理空格很像newspaper
-   **distribute-all-lines**: 两端对齐行的方式与distribute相同，也同样不包含两段对齐段落的最后一行。适用于表意字文档

-   **inter-ideograph**: 为表意字文本提供完全两端对齐。他增加或减少表意字和词间的空格但它最早是作为IE的私有实现，像
    text-overflow， overflow-x等，在FF很晚才实现，换言之有严格的兼容性问题。并且FF，chrome需要手动在汉字间插入空白或软换
    行标签才生效，在chrome遇到的阻力就更大了。

# 隐藏页面中某个元素的方法

| 隐藏元素方法         | DOM结构                      | 事件监听        | 性能                       | 继承                                                    | transition             |
| -------------------- | ---------------------------- | --------------- | -------------------------- | ------------------------------------------------------- | ---------------------- |
| `display：none`      | 浏览器不渲染，不占据空间     | 无法监听DOM事件 | 改变此属性引起重排         | 不会被子元素继承，毕竟子元素也不渲染                    | transform不支持display |
| `visibility：hidden` | 元素被隐藏，会渲染，占据空间 | 无法监听DOM事件 | 改变此属性引起重绘         | 会被子元素继承，子元素可以通过visibility：visable来显示 | 立即显示，延时隐藏     |
| `opacity：0`         | 透明度100%，占据空间         | 可以监听DOM事件 | 提升为合成层，不会触发重绘 | 会被继承，且子元素不能通过opacity：1；来取消隐藏        | 可以延迟显示或隐藏     |

# display

| 值           | 描述                                                           | 特点                                                                                                                              |
| ------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| none         | 元素不会显示                                                   | 将元素与其子元素从普通文档流中移除。这时文档的渲染就像元素从来没有存在过一样，也就是说它所占据的空间消失 了。元素的内容也会消失。 |
| block        | 此元素将显示为块级元素，此元素前后会带有换行符。               | 见👇 display属性的`block`, `inline`, `inline-block`的区别                                                                         |
| inline       | 默认。此元素会被显示为内联元素，元素前后没有换行符。           | 见👇 display属性的`block`, `inline`, `inline-block`的区别                                                                         |
| line-block   | 行内块元素。（CSS2.1 新增的值）[ IE6/7不支持 ]                 | 见👇 display属性的`block`, `inline`, `inline-block`的区别                                                                         |
| list-item    | 此元素会作为列表显示。                                         |
| inline-table | 此元素会作为内联表格来显示（类似 table），表格前后没有换行符。 |
| table        | 此元素会作为块级表格来显示（类似 table），表格前后带有换行符。 |
| table-row    | 此元素会作为一个表格行显示（类似 tr）。                        |
| table-cell   | 此元素会作为一个表格单元格显示（类似 td 和 th）.               |
| inherit      | 规定应该从父元素继承 display 属性的值。                        |

## display属性的`block`, `inline`, `inline-block`的区别

-   block: 设置后元素变为块级元素

    -   块级元素会独占一行，多个相邻的块级元素会各自新开一行，默认情况下，元素宽度自动占满其父元素宽度。
    -   块级元素可以设置width和height,即使设置width，元素还是会独占一行，但多余的部分不在是width,而是使用margin-right填
        充满。
    -   block元素可以设置margin和padding属性

-   inline:设置后元素变为行内元素 - inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新
    换一行，其宽度随元素的内容而变化。- inline元素设置width,height属性无效。inline元素的margin和padding属性，水平方向的
    padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom,
    margin-top, margin-bottom不会产生边距效果。-

-   inline-block: 设置后元素会变为行内块元素

    -   结合了inline与block的一些特点，结合了上述inline的第1个特点和block的第2,3个特点。
    -   通俗讲就是不独占一行的块级元素。

-   默认下inline元素与其他元素之间会出现空白间隙，所以inline-blick使用后同样也有。那么这些空白间隙是什么呢，都是空白符。
    在浏览器中，空白符是不会被浏览器忽略的，多个空白符会合并为一个。而我们在编写代码的时候，使用的空格、换行都会产生空格
    符。如何解决呢常用的方法就是给其父元素设置font-size:0,本质上空白符也是一个字符，也受字体大小控制。

# 页面布局

## 1.Flex 布局

布局的传统解决方案，基于盒状模型，依赖 display 属性 + position 属性 + float 属性。它对于那些特殊布局非常不方便，比如，垂
直居中就不容易实现。

Flex 是 Flexible Box 的缩写，意为"弹性布局",用来为盒状模型提供最大的灵活性。指定容器 display: flex 即可。 简单的分为容器
属性和元素属性。

容器的属性：

-   flex-direction：决定主轴的方向（即子 item 的排列方法）flex-direction: row | row-reverse | column | column-reverse;
-   flex-wrap：决定换行规则 flex-wrap: nowrap | wrap | wrap-reverse;
-   flex-flow： .box { flex-flow: || ; }
-   justify-content：对其方式，水平主轴对齐方式
-   align-items：对齐方式，竖直轴线方向
-   align-content

项目的属性（元素的属性）：

-   order 属性：定义项目的排列顺序，顺序越小，排列越靠前，默认为 0
-   flex-grow 属性：定义项目的放大比例，即使存在空间，也不会放大
-   flex-shrink 属性：定义了项目的缩小比例，当空间不足的情况下会等比例的缩小，如果 定义个 item 的 flow-shrink 为 0，则为
    不缩小
-   flex-basis 属性：定义了在分配多余的空间，项目占据的空间。
-   flex：是 flex-grow 和 flex-shrink、flex-basis 的简写，默认值为 0 1 auto。
-   align-self：允许单个项目与其他项目不一样的对齐方式，可以覆盖
-   align-items，默认属 性为 auto，表示继承父元素的 align-items 比如说，用 flex 实现圣杯布局

**flex布局失效的场景和子元素失效的属性：**

-   父元素是flex布局，子元素的float、clear和vertical-align属性将会失效;

-   默认情况下，width,height会继承父元素的，但是flex布局下width,height可能会失效，因为flex默认有缩放功
    能，flex-shrink:1;flex-grow:1;所有为了不受其影响，width和height要设置，同时如果不想缩放可设置
    flex-shrink:0;flex-grow:0;

-   左右布局，一个div是固定宽度，想让另一个div使用flex:1,宽度是剩余空间，又不能溢出，使用flex-grow:0;不能铺满，可以使用
    min-width:0;或width:0; 这是flex溢出问题

-   flex布局在垂直居中里，元素超过容器大小后，不能通过滚动条滚动到顶端，子元素设置flex-shrink:0;

## 2.Rem 布局

首先 Rem 相对于根(html)的 font-size 大小来计算。简单的说它就是一个相对单例 如:font-size:10px;,那么（1rem = 10px）了解计
算原理后首先解决怎么在不同设备上设置 html 的 font-size 大小。其实 rem 布局的本质是等比缩放，一般是基于宽度。

**优点**：可以快速适用移动端布局，字体，图片高度

**缺点**：

①目前 ie 不支持，对 pc 页面来讲使用次数不多；  
②数据量大：所有的图片，盒子都需要我们去给一个准确的值；才能保证不同机型的适配；  
③在响应式布局中，必须通过 js 来动态控制根元素 font-size 的大小。也就是说 css 样式和 js 代码有一定的耦合性。且必须将改变
font-size 的代码放在 css 样式之前。

## 3.百分比布局

通过百分比单位 " % " 来实现响应式的效果。通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响
应式的效果。 直观的理解，我们可能会认为子元素的百分比完全相对于直接父元素，height 百分比相 对于 height，width 百分比相对
于 width。 padding、border、margin 等等不论是垂直方向还是水平方向，都相对于直接父元素的 width。 除了 border-radius 外，
还有比如 translate、background-size 等都是相对于自身的。

**缺点**：

（1）计算困难  
（2）各个属性中如果使用百分比，相对父元素的属性并不是唯一的。造成我们使用百分比单位容易使布局问题变得复杂。

## 4.浮动布局

浮动布局:当元素浮动以后可以向左或向右移动，直到它的外边缘碰到包含它的框或者另外一个浮动元素的边框为止。元素浮动以后会脱
离正常的文档流，所以文档的普通流中的框就变的好像浮动元素不存在一样。

**优点**

这样做的优点就是在图文混排的时候可以很好的使文字环绕在图片周围。另外当元素浮动了起来之后，它有着块级元素的一些性质例如可
以设置宽高等，但它与inline-block还是有一些区别的，第一个就是关于横向排序的时候，float可以设置方向而inline-block方向是固
定的；还有一个就是inline-block在使用时有时会有空白间隙的问题

**缺点**

最明显的缺点就是浮动元素一旦脱离了文档流，就无法撑起父元素，`会造成父级元素高度塌陷`。

# 移动端适配

## media查询方案

优点：

-   方法简单，只需修改css文件
-   调整屏幕宽度时不用刷新页面就可以响应页面布局

缺点：

-   代码量大，不方便维护
-   不能够完全适配所有的屏幕尺寸，需要编写多套css样式

## 百分比布局方案

优点：

-   宽度自适应，在不同的分辨率下都能达到适配

缺点：

-   百分比的值不好计算
-   需要确定父级的大小，因为要根据父级的大小进行计算
-   各个属性中如果使用百分比，相对父元素的属性并不是唯一的
-   高度不好设置，一般需要固定高度

## rem方案:

-   rem单位：rem是一个只相对于浏览器的根元素（HTML元素）的font-size的来确定的单位。默认情况下，html元素的font-size为12px
-   通过rem来实现适配：rem单位都是相对于根元素html的font-size来决定大小的,根元素的font-size相当于提供了一个基准，当页面
    的宽度发生变化时，只需要改变font-size的值，那么以rem为固定单位的元素的大小也会发生响应的变化。需要先动态设置html根元
    素的font-size,再计算出其他页面元素以rem为固定单位的值

优点：

-   rem单位是根据根元素font-size决定大小，只要改变font-size的值，以rem为固定单位的元素大小也会发生响应式的改变

缺点：

-   必须通过一段js代码控制font-size的大小
-   控制font-size的js代码必须放在在页面第一次加载完成之前，并且放在引入的css样式代码之前。
-   px值转换rem太过于复杂

## vw、vh方案

优点：

-   指定vw\vh相对与视口的宽高，由px换算单位成vw单位比较简单
-   通过postcss-px-to-viewport插件进行单位转换比较方便

缺点：

-   直接进行单位换算时百分比可能出现小数,计算不方便
-   兼容性- 大多数浏览器都支持、ie11不支持 少数低版本手机系统 ios8、android4.4以下不支持

# 清除浮动

## WHY？清除浮动

-   子容器的float会造成父容器的高度坍塌！
-   浮动的容器会影响到兄弟的文字环绕，并且也会影响到父容器的兄弟容器的文字也环绕这个浮动容器

## HOW?

-   在父容器的下面的块级容器（不是块级不行，比如span就不行）增加clear:both;属性。

```html
<div class="parent">
    //添加额外标签并且添加clear属性
    <div style="clear:both"></div>
    //也可以加一个br标签
</div>
```

-   父级添加overflow属性，或者设置高度
-   建立伪类选择器清除浮动

```css
//在css中添加:after伪元素
.parent:after {
    /* 设置添加子元素的内容是空 */
    content: "";
    /* 设置添加子元素为块级元素 */
    display: block;
    /* 设置添加的子元素的高度0 */
    height: 0;
    /* 设置添加子元素看不见 */
    visibility: hidden;
    /* 设置clear：both */
    clear: both;
}
```

-   在父容器加入以下属性来触发BFC容器
    -   overflow: hidden
    -   display: inline-block
    -   position: absolute,fixed
    -   display: flex/table-cell

## FEATURE?

1. 计算BFC容器的高度时，浮动容器也参加计算
2. BFC就是页面上的一个隔离的独立容器BFC包含创建上下文元素的所有子元素，但是不包含新创建的BFC的子元素的内部元素

# 圣杯布局

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c01d1a3924fa4600ab6c1592aeed9b5f~tplv-k3u1fbpfcp-watermark.image?)

# 双飞翼布局

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3b0ddb52c2043c680c67bd8e76f59de~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/613651a8804741e9b1f77f7897d9ea80~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e85e3e2308647cb94420698d5b2dffd~tplv-k3u1fbpfcp-watermark.image?)
