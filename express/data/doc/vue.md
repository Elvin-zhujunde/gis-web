# Vue

# Vue的优点和缺点

**优点**:

-   渐进式: 想用什么就用什么，集成更多的web功能
-   组件化
-   轻量级
-   虚拟DOM
-   响应式
-   单页应用
-   数据视图分开

**缺点**:

-   不利于SEO(搜索引擎优化：用VUE写的东西可能拍在很后面）
-   首屏加载过慢 (解决方案： 服务端渲染)
-   Vue2不支持IE8以下，Vue3不支持IE11以下

# Vue2

## 虚拟DOM

虚拟DOM本质就是用一个原生的JavaScript对象去描述一个DOM节点。是对真实DOM的一层抽象。由于在浏览器中操作DOM是很昂贵的。频繁
的操作DOM，会产生一定的性能问题，因此我们需要这一层抽象，在patch过程中尽可能地一次性将差异更新到DOM中，这样保证了DOM不会
出现性能很差的情况。另外还有很重要的一点，也是它的设计初衷，为了更好的跨平tai，比如Node.js就没有DOM,如果想实现SSR(服务端
渲染),那么一个方式就是借助Virtual DOM,因为Virtual DOM本身是JavaScript对象。Vue2.x中的虚拟DOM主要是借鉴了
snabbdom.js，Vue3中借鉴inferno.js算法进行优化。

# 组件之间的传值方式有哪些？

1. 父-子 子组件props接收
2. 子-父 子$emit（事件名，参数）父组件绑定事件名。
3. $refs获取子组件实例，获取数据
4. 组件可以使用$parent和$children获取父组件实例和子组件实例，进而获取数据
5. provide 和 inject
6. vuex
7. eventBus

# 10 Vue2.0 响应式数据的原理

**整体思路是数据劫持+观察者模式**

对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写
数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会
通知自己对应的 watcher 去更新(派发更新)。

```js
class Observer {
    // 观测值
    constructor(value) {
        this.walk(value)
    }
    walk(data) {
        // 对象上的所有属性依次进行观测
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }
}
// Object.defineProperty数据劫持核心 兼容性在ie9以及以上
function defineReactive(data, key, value) {
    observe(value) // 递归关键
    // --如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
    //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
    Object.defineProperty(data, key, {
        get() {
            console.log("获取值")
            //需要做依赖收集过程 这里代码没写出来
            return value
        },
        set(newValue) {
            if (newValue === value) return
            console.log("设置值")
            //需要做派发更新过程 这里代码没写出来
            value = newValue
        },
    })
}
export function observe(value) {
    // 如果传过来的是对象或者数组 进行属性劫持
    if (Object.prototype.toString.call(value) === "[object Object]" || Array.isArray(value)) {
        return new Observer(value)
    }
}
```

### 如何检测数组变化

数组考虑性能原因没有用 defineProperty 对数组的每一项进行拦截，而是选择对 7 种数组
（push,shift,pop,splice,unshift,sort,reverse）方法进行重写(AOP 切片思想)<br> 所以在 Vue 中修改数组的索引和长度是无法监控
到的。需要通过以上 7 种变异方法修改数组才会触发数组对应的 watcher 进行更新<br>

```js
// src/obserber/array.js
// 先保留数组原型
const arrayProto = Array.prototype
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
export const arrayMethods = Object.create(arrayProto)
let methodsToPatch = ["push", "pop", "shift", "unshift", "splice", "reverse", "sort"]
methodsToPatch.forEach(method => {
    arrayMethods[method] = function (...args) {
        //   这里保留原型方法的执行结果
        const result = arrayProto[method].apply(this, args)
        // 这句话是关键
        // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
        const ob = this.__ob__
        // 这里的标志就是代表数组有新增操作
        let inserted
        switch (method) {
            case "push":
            case "unshift":
                inserted = args
                break
            case "splice":
                inserted = args.slice(2)
            default:
                break
        }
        // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
        if (inserted) ob.observeArray(inserted)
        // 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作--后续源码会揭晓
        return result
    }
})
```

# Vue.use()

Vue.use(Vue)是全局注册一个组件或者插件的方法。<br> 有一个挂在全局下的数组，每次挂载注册前，都会判断一下这个组件或者插件
(plugins)是否注册过，如果注册过，就不会再次注册了。<br> Vue.use(plugins：object || function,args)的第一个参数是对象或者
方法，如果是对象，就执行对象中的install方法，否则就直接执行传入方法。执行方法的第一个参数是Vue,其余放在args内

**基于vue.use() 写个Toast插件**

```js
let Toast = {}
Toast.install = function (Vue, options) {
    let opt = {
        defaultType: "center", //默认显示的位置
        duration: "1500", //持续时间是1.5秒
    }
    for (const property in options) {
        opt[property] = options[property]
    }
    Vue.prototype.$toast = (tips, type) => {
        if (type) {
            opt.defaultType = type
        }
        let toastTpl = Vue.extend({
            template: `<div class="vue-toast toast-${opt.defaultType}">${tips}</div>`,
        })
        // 将插件挂载到Vue根结点
        let tpl = new toastTpl().$mount().$el
        document.body.appendChild(tpl)
        setTimeout(() => {
            document.body.removeChild(tpl)
        }, opt.duration)
    }
    //往原型上对应的三个属性字段挂上三个函数
    ;["buttom", "center", "top"].forEach(type => {
        Vue.prototype.$toast[type] = tips => {
            return Vue.prototype.$toast(tips, type)
        }
    })
}
```

# Vue.$nextTick(()=>{})

**what**

-   .nextTick是Vue提供的一个全局API由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获
    取更新后的dom状态，就需要使用这个方法
-   Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发 生的所有数据变更。如果同
    一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要
    的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。

**how**

# Vue3

## ref、toRef、toRefs&reactive

**reactive:**

1. 它的响应式是更加‘深层次’的，底层本质是将传入的数据包装成一个Proxy。
2. 参数必须是对象或者数组，如果要让对象的某个元素实现响应式时比较麻烦。需要使用toRefs

**ref:**

1. 函数参数可以是基本数据类型，也可以接受对象类型
2. 如果参数是对象类型时，其实底层的本质还是reactive,系统会自动根据我们给ref传入的值转换成：

    - ref(1)->reactive({value:1})
    - ref函数只能操作浅层次的数据，把基本数据类型当作自己的属性值；深层次依赖于reactive

3. 在template中访问，系统会自动添加.value;在js中需要手动.value
4. ref响应式原理是依赖于Object.defineProperty()的get()和set()的。

### ref、toRef、toRefs的区别

-   `ref:`复制，修改响应式数据不影响以前的数据；数据改变，界面自动更新
-   `toRef:`引用，修改响应式数据会影响以 前的数据；数据改变，界面不自动更新
-   `toRefs：`
    -   接收一个对象作为参数，它会遍历对象身上所有属性，然后调用单个toRef
    -   将对象的多个属性变成响应式数据，并且要求响应式数据和原始数据关联，且更新响应式数据的时候不会更新界面，用于批量设
        置多个数据为响应式

### 如果ref一个复杂数据类型会咋样。会被proxy代理

ref接受的数据类型：基本类型，引用类型 作用：把参数加工成一个响应式对象，全称为reference对象(简称为ref对象)

核心原理：如果参数是基本类型那么形成响应式依赖于Object.defineProperty( )的get( )和set( )，如果ref的参数是引用类型，底层
ref会借助reactive的proxy 定义响应式变成这样：reactive({value:'xiaxia'})

# vue2->3对比

-   API &nbsp;&nbsp;&nbsp; option -> compoziston

    Vue3 为什么要改成compoziston而不是option的语法，为了 treeshaking，减少代码体积。就是用的打包，不用的就不打包。

-   在diff上使用最长递增子序列做了什么优化

    优化主要是做了查找中没有查找到,存在复用的节点，意思就是需要移动的节点,用最长递增子序列，找出他们之中最稳定的序列进行
    移动`

    在 Vue2 里 updateChildren 会进行头和头比尾和尾比头和尾比尾和头比都没有命中的对比

    在 Vue3 里 patchKeyedChildren 为

    头和头比尾和尾比基于最长递增子序列进行移动/添加/删除看个例子，比如

    老的 children：[ a, b, c, d, e, f, g ]<br> 新的 children：[ a, b, f, c, d, e, h, g ]<br> 1、先进行头和头比，发现不同
    就结束循环，得到 [ a, b ]<br> 2、再进行尾和尾比，发现不同就结束循环，得到 [ g ]<br> 3、再保存没有比较过的节点 [ f,
    c, d, e, h ]，并通过 newIndexToOldIndexMap 拿到在数组里对应的下标，生成数组 [ 5, 2, 3, 4, -1 ]，-1 是老数组里没有的
    就说明是新增<br> 4、然后再拿取出数组里的最长递增子序列，也就是 [ 2, 3, 4 ] 对应的节点 [ c, d, e ]<br> 5、然后只需要
    把其他剩余的节点，基于 [ c, d, e ] 的位置进行移动/新增/删除就可以了<br>
