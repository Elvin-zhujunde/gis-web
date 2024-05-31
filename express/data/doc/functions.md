# 功能函数合集



## 统计字符串出现个数
```js
[..."abaskdjqioejkansjdhas"].reduce((a, b) => (a[b] ? a[b]++ : (a[b] = 1), a, a), {})
```
# String

## 反转字符串

```js
const reverse = str => str.split("").reverse().join("")
```

# Array



## 步进器


```js
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

// Generate numbers range 0..4
range(0, 4, 1)
// [0, 1, 2, 3, 4]

// Generate numbers range 1..10 with step of 2
range(1, 10, 2)
// [1, 3, 5, 7, 9]

// Generate the alphabet using Array.from making use of it being ordered as a sequence
range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map(x => String.fromCharCode(x))
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

```
## 判断数组是否有重复
```js
new Set(arr).size !== arr.length
```
## 合并两个数组
> Array.prototype.push.apply(vegetables, moreVegs)


## 排列组合
```js
// const array = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"], ["j", "k", "l"], ["m", "n", "o"], ["p", "q", "r", "s"], ["t", "u", "v"], ["w", "x", "y", "z"]]
const temp = []
const results = []
const arr = [
    ["a", "b", "c"],
    [1, 2, 3],
]
function combine(arr, index = 0) {
    arr[index].forEach(item => {
        temp[index] = item
        // index + 1 < arr.length ? combine(arr, index + 1) : results.push(temp)
        index + 1 < arr.length ? combine(arr, index + 1) : results.push(temp.slice())
    })
}
combine(arr)
console.log(results)
[
  [ 'a', 1 ], [ 'a', 2 ],
  [ 'a', 3 ], [ 'b', 1 ],
  [ 'b', 2 ], [ 'b', 3 ],
  [ 'c', 1 ], [ 'c', 2 ],
  [ 'c', 3 ]
]
```
## 红绿灯


```js
const setColor = (color, duration) =>
    new Promise(res => {
        console.log(color)
        setTimeout(res, duration)
    })
async function sett() {
    await setColor("green", 1000)
    await setColor("yellow", 1000)
    await setColor("red", 1000)
    await sett()
}
sett()
```

# window

## 文本复制到剪贴板

```js
const copyText = async text => await navigator.clipboard.writeText(text)
copyText("单行代码 前端世界")
```

## 获取用户框选信息：
window.getSelection().toString()

# document
## 全屏

```js
/**
 * 全屏和退出全屏的兼容性代码封装
 */

export function supportFullScreen() {
    const doc = document.documentElement

    return (
        "requestFullscreen" in doc ||
        ("mozRequestFullScreen" in doc && document.mozFullScreenEnabled) ||
        ("msRequestFullscreen" in doc && document.msFullscreenEnabled) ||
        "webkitRequestFullScreen" in doc
    )
}

export function fullScreenStatus() {
    if (
        document.fullscreen ||
        document.mozFullScreen ||
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.webkitIsFullScreen
    ) {
        return true
    }
    return false
}

export function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    } else {
        console.log("Fullscreen API is not supported.")
    }
}

export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else {
        console.log("Fullscreen API is not supported.")
    }
}

export function onFullScreenEvent(callback, target) {
    document.addEventListener("fullscreenchange", callback)
    document.addEventListener("mozfullscreenchange", callback)
    document.addEventListener("MSFullscreenChange", callback)
    document.addEventListener("webkitfullscreenchange", callback)
}

export function offFullScreenEvent(callback, target) {
    document.removeEventListener("fullscreenchange", callback)
    document.removeEventListener("mozfullscreenchange", callback)
    document.removeEventListener("MSFullscreenChange", callback)
    document.removeEventListener("webkitfullscreenchange", callback)
}
```

# Date

## 时钟

```js
const formatTime = n => (n < 10 ? `0${n}` : n)
function undateClock() {
    const date = new Date()
    const hours = formatTime(date.getHours())

    const minutes = formatTime(date.getMinutes())
    const seconds = formatTime(date.getSeconds())
    const clock = document.getElementById("clock")
    clock.textContent = `${hours}:${minutes}${seconds}`
}
undateClock()
setInterval(undateClock, 1000)
```
## 格式化
```js
function fixed(value) {
    return `${(value / 10000).toFixed(2)}万`
}

Date.prototype.Format = function (fmt) {
    // author: meizz
    const o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
        }
    }

    console.log(fmt)
    return fmt
}
const time1 = new Date().Format("yyyy-MM-dd")
const time2 = new Date().Format("yyyy-MM-dd hh:mm:ss")

```
## 两天差
```js
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

dayDiff(new Date("2021-10-21"), new Date("2022-02-12"))
```
# 正则
## url获取参数

```js
const getParameters = URL =>
    JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`)
getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1")
// {q: 'js+md', newwindow: '1'}
console.log(
    decodeURI("https://www.google.com.hk/search?q=js+md&newwindow=1".split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"'),
)

```
## 检查设备类型
```js
const judgeDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? "Mobile" : "PC"
```
```js
/**
 * @description 正则表达式验证和处理工具类
 */

/**
 * 邮箱
 * @param {String} s
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * IP
 * @param {String} s
 */
export function isIP(s) {
    return /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(s)
}

/**
 * 手机号码
 * @param {String} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {String} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {String} s
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证验证
 * @param {String} s
 */
export function checkIdCard(s) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const ID_15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
    const ID_18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return ID_15.test(s) || ID_18.test(s)
}

/*
 * 民族校验
 */
export function checkNation(s) {
    const reg = /^[\u4e00-\u9fa5]+$/
    if (reg.test(s) === false) {
        return false
    }
    return true
}

/*
 * 判断是否是年月日的时间类型
 */
export function isDateStr(dateStr) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
}

/*
 * 判断是否是年月日时分的时间类型
 */
export function isDateTimeStr(dateStr) {
    return /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(dateStr) || /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(dateStr)
}

/*
 * 判断是否是时分的时间类型
 */
export function isTimeStr(dateStr) {
    return /^\d{2}:\d{2}:\d{2}$/.test(dateStr) || /^\d{2}:\d{2}$/.test(dateStr)
}

/*
 * 判断是否是颜色值
 */
export function isHexColor(colorVal) {
    return /^#[0-9a-f]{6}$/.test(colorVal) || /^#[0-9a-f]{3}$/.test(colorVal)
}

// 数字三位增加逗号
function comma(num) {
    const result = []
    let counter = 0
    num = (num || 0).toString().split("")
    for (let i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i != 0) {
            result.unshift(",")
        }
    }
    return result.join("")
}
function NumberFormat(value) {
    if (!value) {
        return "0"
    }
    const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") // 将整数部分逢三一断
    return intPartFormat
}

/** 字符串超长截取省略号显示 */
function ellipsis(value, vlength = 25, direction = "left") {
    if (!value) {
        return ""
    }
    if (value.length > vlength) {
        if (direction === "left") {
            return `${value.slice(0, vlength)}...`
        }
        if (direction === "right") {
            return `...${value.slice(value.length - vlength, value.length)}`
        }
    }
    return value
}

```
# 控制台输入输出
```js
const readline = require("readline")

process.stdin.setEncoding("utf-8")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "" })
rl.prompt()

const solveMeFirst = (a, b) => {
    let resultNumber = 0
    let i = 1
    while (a ** i <= b) {
        i++
    }
    const maxNum = a ** (i - 1)

    for (let j = maxNum; j <= b; ) {
        if (j % maxNum === 0) {
            resultNumber++
        }
        j += maxNum
    }
    return resultNumber
}

rl.on("line", data => {
    const arr = data.split(" ")
    if (arr && arr.length === 2) {
        const c = solveMeFirst(+arr[0], +arr[1])
        process.stdout.write(`${c}\n`)
    }
})
```



# random

## 生成随机十六进制(颜色)
```js
const randomHexColor = () =>
    `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0")}`
console.log(randomHexColor())
// #a2ce5b
```
## 取范围值

```js
const getRandom = (Min, Max) => {
    const Range = Max - Min
    const Rand = Math.random()
    return Min + Math.round(Rand * Range)
}

```

# 转换数据
## 数转文
```js
let numChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
let numUnit = ["", "十", "百", "千"];
let numSection = ["", "万", "亿", "万亿", "亿亿"];

// 将数字映射成中文
function formatSection(num) {
  let arr = (num + "").split("").reverse();
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    let char = arr[i] === 0 ? numChar[0] : numChar[arr[i]] + numUnit[i];
    str = char + str;
  }
  let s = str.replace(/零+/g, "零").replace(/零+$/, "");
  return s;
}

// 将字符串按个数拆分
function formatNum(num, str) {
  let len = Math.ceil(str.length / num);
  let arr = [];
  let reverseStr = str.split("").reverse().join("");
  for (let i = 0; i < len; i++) {
    let result = reverseStr
      .slice(i * num, i * num + 4)
      .split("")
      .reverse()
      .join("");
    arr.unshift(result);
  }
  return arr;
}

function numberTranToCN(num) {
  let arr = formatNum(4, num + "");
  let list = [];
  for (let i = 0; i < arr.length; i++) {
    let str = formatSection(arr[i]);
    list.push(str);
  }
  let reverseList = list.reverse();
  // 补上区间单位
  for (let j = 0; j < reverseList.length; j++) {
    reverseList[j] += numSection[j];
  }
  return reverseList.reverse().join("");
}

console.log(numberTranToCN(12345));
console.log(numberTranToCN(10000000003));

```
## rgbToHex
```js
const rgbToHex = (r, g, b) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
```
## 摄氏度转换

```js
// 将华氏温度转换为摄氏温度
const fahrenheitToCelsius = fahrenheit => ((fahrenheit - 32) * 5) / 9

fahrenheitToCelsius(50)
// 10

// 将摄氏温度转华氏温度
const celsiusToFahrenheit = celsius => (celsius * 9) / 5 + 32

celsiusToFahrenheit(100)
// 212
```

# 手写
## 算法

### ArrayToTree

```js
const arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
]

const obj = {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
        {
            id: 2,
            name: "部门2",
            pid: 1,
            children: [],
        },
        {
            id: 3,
            name: "部门3",
            pid: 1,
            children: [
                {
                    id: 4,
                    name: "部门4",
                    pid: 3,
                    children: [
                        {
                            id: 5,
                            name: "部门5",
                            pid: 4,
                            children: [],
                        },
                    ],
                },
            ],
        },
    ],
}

/**
 * @param {arr: array 原数组数组, id: number 父节点id}
 * @return {children: array 子数组}
 */
function getChildren(arr, id) {
    const res = []
    for (const item of arr) {
        if (item.pid === id) {
            // 找到当前id的子元素
            // 插入子元素，每个子元素的children通过回调生成
            res.push({ ...item, children: getChildren(arr, item.id) })
        }
    }
    return res
}

getChildren(arr, 0)

```
### quick sort

```js
const quickSort = ([head, ...tail]) =>
    head == null ? [] : [...quickSort(tail.filter(x => x >= head)), head, ...quickSort(tail.filter(x => x < head))]

const arr = [3, 4, 5, 6, 8, 8, 8, 453, 35, 86, 33, 1, 45]
console.log(quickSort(arr))

const qsort = ([head, ...tail]) =>
    head == null ? [] : [...qsort(tail.filter(x => x >= head)), head, ...qsort(tail.filter(x => x < head))]

```
### 斐波那契数列

```js
function fibonacci(n) {
    if (n == 1 || n == 2) {
        return 1
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}
// for (let i = 1; i < 10; i++) {
//   console.log(fibonacci(i))
// }
const fib = function (n) {
    let i = 2
    const res = [0, 1, 1]
    while (i <= n) {
        res[i] = res[i - 1] + res[i - 2]
        i++
    }
    return res
}
console.log("@", fib(10))
console.log(fibonacci(5))

@ [
   0, 1,  1,  2,  3,
   5, 8, 13, 21, 34,
  55
]
5
```

### 洗牌算法

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
let tmp = 0

for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
        tmp = Math.floor(Math.random() * 10)
        if (j + tmp < a.length) {
            ;[a[j], a[j + tmp]] = [a[j + tmp], a[j]]
        }
    }
}

console.log(a)
```

### 二分查找
```js
var binarySearch = function(nums, target) {
    var left = 0, right = nums.length - 1;

    while(left <= right) {
        var mid = parseInt((left + right) / 2);
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        }
    }
    return -1;
}
```

### 滑动窗口

```js
var slidingWindow = function(s) {
    // 用合适的数据结构记录窗口中的数据
    const window = new Map();
    
    let left = 0, right = 0;
    while (right < s.length) {
        // c 是将移入窗口的字符
        let c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        // 注意在最终的解法代码中不要 console.log
        // 因为 IO 操作很耗时，可能导致超时
        console.log("window: [" + left + ", " + right + ")");
        /********************/
        
        // 判断左侧窗口是否要收缩
        while (left < right && window needs shrink) {
            // d 是将移出窗口的字符
            let d = s[left];
            window.set(d, window.get(d) - 1);
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```
## 手写定时器

```js
// 自定义一个定时器
function setInterval(callback, interval) {
    let timer
    let startTime = Date.now() // 定时器开始计时！
    let endTime
    const loop = () => {
        // 这里会根据显示的赫兹来固定计算时间，重复执行loop
        timer = window.requestAnimationFrame(loop)
        endTime = Date.now()
        console.log(endTime - startTime)
        // 如果时间到了就执行回调函数
        if (endTime - startTime >= interval) {
            // console.log(endTime, startTime, endTime - startTime);
            endTime = Date.now()
            startTime = endTime
            // console.log(startTime);
            callback(timer)
        }
    }
    timer = window.requestAnimationFrame(loop)
    return timer
}
let a = 0
setInterval(timer => {
    console.log(1)
    a++
    if (a === 3) {
        cancelAnimationFrame(timer)
    }
}, 1000)
```

## 浮点数加减乘除

```js
// 加
function floatAdd(arg1, arg2) {
    let r1
    let r2
    let m
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = 10 ** Math.max(r1, r2)
    console.log((floatMultiply(arg1, m) + floatMultiply(arg2, m)) / m)
}
function floatMultiply(arg1, arg2) {
    if (arg1 == null || arg2 == null) {
        return null
    }
    let n1
    let n2
    let r1
    let r2 // 小数位数
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    n1 = Number(arg1.toString().replace(".", ""))
    n2 = Number(arg2.toString().replace(".", ""))
    return (n1 * n2) / 10 ** (r1 + r2)
}
// 除
function floatDivide(arg1, arg2) {
    if (arg1 == null) {
        return null
    }
    if (arg2 == null || arg2 == 0) {
        return null
    }
    let n1
    let n2
    let r1
    let r2 // 小数位数
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    n1 = Number(arg1.toString().replace(".", ""))
    n2 = Number(arg2.toString().replace(".", ""))
    return (n1 / n2) * 10 ** (r2 - r1)
}
console.log(0.1 + 0.2)
floatAdd(0.1, 0.2)

```

## curry

```js
function add(a, b, c) {
    return a + b + c
}

function curry(fn, args) {
    // fn.length:形参个数,num为固定值
    const num = fn.length
    console.log("num", num)
    var args = args || []
    return function () {
        // arr用于收集传入的参数
        const arr = [].slice.call(arguments)
        // 将之前收集的参数加入arr
        ;[].push.apply(arr, args)
        // 若参数小于num,递归调用继续收集参数
        if (arr.length < num) {
            return curry.call(this, fn, arr)
        }
        // 参数达到num,则执行fn
        console.log(fn.apply(this, arr))
        return fn.apply(this, arr)
    }
}
// 此转化后的函数每次可以传入任意个参数
const add_curried = curry(add)
add_curried(1)(2)(3) // 6
add_curried(1, 2)(3) // 6
add_curried(1)(2, 3) // 6
add_curried(1, 2, 3) // 6
```

## call / apply / bind
```js
Function.prototype.myCall = function (thisArg = window, ...arg) {
    const fn = Symbol("fn")
    thisArg[fn] = this
    const result = thisArg[fn](...arg)
    delete thisArg[fn]
    return result
}

Function.prototype.myApply = function (thisArg = window, arg) {
    const fn = Symbol("fn")
    thisArg[fn] = this
    const result = thisArg[fn](...arg)
    delete thisArg[fn]
    return result
}

Function.prototype.myBind = function (thisArg, ...args) {
    const self = this
    // new优先级
    const fbound = function () {
        self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
    }
    // 继承原型上的属性和方法
    fbound.prototype = Object.create(self.prototype)

    return fbound
}

```
## flat


```js
// 定义flat方法
Array.prototype.cusFlat = function (depth = 1) {
    const arr = this
    const resArr = []
    // 声明用于递归的函数
    const recursiveFn = function (resArr, dealArr, depth) {
        for (const item of dealArr) {
            // 深度不为0，且是数组，需要递归
            if (Array.isArray(item) && depth) {
                recursiveFn(resArr, item, depth - 1) // 递归
            } else {
                resArr.push(item)
            }
        }
    }
    // 执行处理数组
    recursiveFn(resArr, arr, depth)
    return resArr
}

Array.prototype.myFlat = function (depth = 1) {
    const arr = this
    const resArr = []
    const loop = function (resArr, dealArr, depth) {
        for (const item of dealArr) {
            if (Array.isArray(item) && depth) {
                loop(resArr, item, depth - 1)
            } else {
                resArr.push(item)
            }
        }
    }
    loop(resArr, arr, depth)
    return resArr
}

console.log("@@@@@@@", a.myFlat(2)) // [1, 2, 3, 4, 7, 8, undefined, null, 12, 9, 5]

// 扁平化
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
}

console.log(arr.toString().split(",").map(Number))
// arr.toString().split(',').sort((a, b) => a - b).map(Number) 
```

## instanceof

```js
/**
isPrototypeOf()
    方法用于测试一个对象是否存在于另一个对象的原型链上。
    备注: isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，
          object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。
    来自 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf>
 */

function _instanceof(L, R) {
    let N = L.__proto__
    while (N !== null) {
        if (N === R.prototype) return true
        N = N.__proto__
    }
    return false
}

```
## promise

```js
class myPromise {
    constructor(executor) {
        this.state = "pending"
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = value => {
            if (this.state === "pending") {
                this.state = "fulfilled"
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason => {
            if (this.state === "pending") {
                this.state = "rejected"
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : err => {
                      throw err
                  }
        const promise2 = new Promise((resolve, reject) => {
            if (this.state === "fulfilled") {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === "rejected") {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === "pending") {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }

    catch(fn) {
        return this.then(null, fn)
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError("Chaining cycle detected for promise"))
    }
    let called
    if (x != null && (typeof x === "object" || typeof x === "function")) {
        try {
            const { then } = x
            if (typeof then === "function") {
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    err => {
                        if (called) return
                        called = true
                        reject(err)
                    },
                )
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
// resolve方法
Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    })
}
// reject方法
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val)
    })
}
// race方法
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}
// all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function (promises) {
    const arr = []
    let i = 0
    function processData(index, data) {
        arr[index] = data
        i++
        if (i == promises.length) {
            resolve(arr)
        }
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data)
            }, reject)
        }
    })
}

new myPromise((resolve, reject) => {
    console.log(1)
    resolve(2)
}).then(res => {
    console.log(res)
})

```
## new

```js
function newOperator(ctor) {
    if (typeof ctor !== "function") {
        throw "newOperator function the first param must be a function"
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor
    // 1.创建一个全新的对象，
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    const newObj = Object.create(ctor.prototype)
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    // 除去ctor构造函数的其余参数
    const argsArr = [].slice.call(arguments, 1)
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    const ctorReturnResult = ctor.apply(newObj, argsArr)
    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    const isObject = typeof ctorReturnResult === "object" && ctorReturnResult !== null
    const isFunction = typeof ctorReturnResult === "function"
    if (isObject || isFunction) {
        return ctorReturnResult
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj
}
function myNew() {
    const obj = new Object()
    const Cons = [].shift.call(arguments)
    obj.__proto__ = Cons.prototype
    const ret = Cons.apply(obj, arguments)
    return typeof ref === "object" ? ret : obj
}

function Person() {}
const per = newOperator(Person)
console.log(per)

```
## deepcopy

```js
// JSON.parse(JSON.stringify(a))局限性
// 1. 会忽略undefined
// 2. 会忽略symbol
// 3. 不能序列化函数
// 4. 不能解决循环引用的对象
```
- deepcopy
```js
function deepCopy(target, map) {
    // typeof 筛选出 obj  array null  ，前面过滤掉 null
    if (!target || typeof target !== "object") {
        return null
    }
    if (!map) {
        map = new Map()
        map.set(target, true)
    }

    const result = Array.isArray(target) ? [] : {}
    Object.keys(target).forEach(property => {
        // 判断被拷贝的属性不是 object
        if (typeof target[property] !== "object") {
            result[property] = target[property]
        } else {
            // 防止循环引用
            if (map.has(target[property])) {
                result[property] = undefined // console.log('进入到了这里:', property, target[property]);
            } else {
                map.set(target[property], true)
                result[property] = deepCopy(target[property], map)
            }
        }
    })
    return result
}
// 下面是测试代码：
const aa = {
    name: "aa",
}
// 下面是测试代码：
const testObj = {
    lihua: {
        name: "billmian",
        age: 10,
        sex: "man",
        department: {
            name: "front-end",
            rank: {
                name: aa,
            },
        },
    },
    work: "engineer",
}
aa.testObj = testObj

const cloneObj = deepCopy(testObj)
console.log("这里输出深拷贝的对象：", cloneObj.lihua.department)
```

- 循环引用自身的案例
```js
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}
// 实现深度克隆---对象/数组
function deepClone(target) {
    // 初始化变量result，并拿到要拷贝的数据类型
    let result
    const targetType = checkedType(target)
    console.log(targetType)
    if (targetType === "Object") {
        result = {}
    } else if (targetType === "Array") {
        result = []
    } else {
        return target
    }
    // 遍历目标数据
    for (const i in target) {
        // 获取遍历数据结构的每一项值。
        const value = target[i]
        // 判断目标结构里的每一值是否嵌套了对象/数组
        if (checkedType(value) === "Object" || checkedType(value) === "Array") {
            // 继续遍历获取到value值
            result[i] = deepClone(value)
        } else {
            // 获取到value值是基本的数据类型或者是函数。
            result[i] = value
        }
    }
    return result
}
const aa = {
    name: "aa",
}
// 下面是测试代码：
const testObj = {
    lihua: {
        name: "billmian",
        age: 10,
        sex: "man",
        department: {
            name: "front-end",
            rank: {
                name: aa,
            },
        },
    },
    work: "engineer",
}
aa.testObj = testObj
const cloneObj = deepClone(testObj)
console.log("这里输出深拷贝的对象：", cloneObj.lihua.department)

```
## dfs和 bfs 实现拷贝

```js
// 工具函数
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}

let DFSdeepClone = (obj, visitedArr = []) => {
  let _obj = {}
  if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
    let index = visitedArr.indexOf(obj)
    _obj = isTypeOf(obj, 'array') ? [] : {}
    if (~index) { // 判断环状数据
      _obj = visitedArr[index]
    } else {
      visitedArr.push(obj)
      for (let item in obj) {
        _obj[item] = DFSdeepClone(obj[item], visitedArr)
      }
    }
  } else if (isTypeOf(obj, 'function')) {
    _obj = eval('(' + obj.toString() + ')');
  } else {
    _obj = obj
  }
  return _obj
}

let BFSdeepClone = (obj) => {
    let origin = [obj],
      copyObj = {},
      copy = [copyObj]
      // 去除环状数据
    let visitedQueue = [],
      visitedCopyQueue = []
    while (origin.length > 0) {
      let items = origin.shift(),
        _obj = copy.shift()
      visitedQueue.push(items)
      if (isTypeOf(items, 'object') || isTypeOf(items, 'array')) {
        for (let item in items) {
          let val = items[item]
          if (isTypeOf(val, 'object')) {
            let index = visitedQueue.indexOf(val)
            if (!~index) {
              _obj[item] = {}
                //下次while循环使用给空对象提供数据
              origin.push(val)
                // 推入引用对象
              copy.push(_obj[item])
            } else {
              _obj[item] = visitedCopyQueue[index]
              visitedQueue.push(_obj)
            }
          } else if (isTypeOf(val, 'array')) {
            // 数组类型在这里创建了一个空数组
            _obj[item] = []
            origin.push(val)
            copy.push(_obj[item])
          } else if (isTypeOf(val, 'function')) {
            _obj[item] = eval('(' + val.toString() + ')');
          } else {
            _obj[item] = val
          }
        }
        // 将已经处理过的对象数据推入数组 给环状数据使用
        visitedCopyQueue.push(_obj)
      } else if (isTypeOf(items, 'function')) {
        copyObj = eval('(' + items.toString() + ')');
      } else {
        copyObj = obj
      }
    }
  return copyObj
}


/**测试数据 */
// 输入 字符串String
// 预期输出String
let str = 'String'
var strCopy = DFSdeepClone(str)
var strCopy1 = BFSdeepClone(str)
console.log(strCopy, strCopy1) // String String 测试通过
// 输入 数字 -1980
// 预期输出数字 -1980
let num = -1980
var numCopy = DFSdeepClone(num)
var numCopy1 = BFSdeepClone(num)
console.log(numCopy, numCopy1) // -1980 -1980 测试通过
// 输入bool类型
// 预期输出bool类型
let bool = false
var boolCopy = DFSdeepClone(bool)
var boolCopy1 = BFSdeepClone(bool)
console.log(boolCopy, boolCopy1) //false false 测试通过
// 输入 null
// 预期输出 null
let nul = null
var nulCopy = DFSdeepClone(nul)
var nulCopy1 = BFSdeepClone(nul)
console.log(nulCopy, nulCopy1) //null null 测试通过

// 输入undefined
// 预期输出undefined
let und = undefined
var undCopy = DFSdeepClone(und)
var undCopy1 = BFSdeepClone(und)
console.log(undCopy, undCopy1) //undefined undefined 测试通过
  //输入引用类型obj
let obj = {
  a: 1,
  b: () => console.log(1),
  c: {
    d: 3,
    e: 4
  },
  f: [1, 2],
  und: undefined,
  nul: null
}
var objCopy = DFSdeepClone(obj)
var objCopy1 = BFSdeepClone(obj)
console.log(objCopy === objCopy1) // 对象类型判断 false 测试通过
console.log(obj.c === objCopy.c) // 对象类型判断 false 测试通过
console.log(obj.c === objCopy1.c) // 对象类型判断 false 测试通过
console.log(obj.b === objCopy1.b) // 函数类型判断 false 测试通过
console.log(obj.b === objCopy.b) // 函数类型判断 false 测试通过
console.log(obj.f === objCopy.f) // 数组类型判断 false 测试通过
console.log(obj.f === objCopy1.f) // 数组类型判断 false 测试通过
console.log(obj.nul, obj.und) // 输出null，undefined 测试通过

// 输入环状数据
// 预期不爆栈且深度复制
let circleObj = {
  foo: {
    name: function() {
      console.log(1)
    },
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null //待会让它指向obj.foo
      }
    }
  }
}
circleObj.foo.bar.baz.aChild = circleObj.foo
var circleObjCopy = DFSdeepClone(circleObj)
var circleObjCopy1 = BFSdeepClone(circleObj)
console.log(circleObjCopy, circleObjCopy1) // 测试通过?
```

## flat
```js
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
Array.prototype.flats = function (num, arr) {
    if (this === null || this.undefined) {
        throw new Error('"Cannot read property flats of null or undefined"')
    }
    if (typeof num !== "number" && typeof num !== "undefined") throw new Error("传值类型错误")
    if (!Array.isArray(this)) throw new Error(`${this}.flat is not a function`)
    const other = Object(this)
    const A = []
    function deeps(arrEven, num) {
        if (num == undefined) {
            for (var a = 0; a < arrEven.length; a++) {
                if (Array.isArray(arrEven[a])) {
                    deeps(arrEven[a], num)
                } else {
                    A.push(arrEven[a])
                }
            }
        } else if (num > 0) {
            for (var a = 0; a < arrEven.length; a++) {
                if (Array.isArray(arrEven[a])) {
                    --num
                    deeps(arrEven[a], num)
                } else {
                    A.push(arrEven[a])
                }
            }
        } else {
            A.push(arrEven)
        }
    }
    for (let a = 0; a < other.length; a++) {
        if (Array.isArray(other[a])) {
            deeps(other[a], num)
        } else {
            A.push(other[a])
        }
    }
    return A
}
console.table(arr.flats()) // [1,2,3,4]


// arr.toString().split(',').sort((a, b) => a - b).map(Number)

while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
}
console.log(arr)

function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))
// console.log(...arr)
```

## 事件代理


```js
created () {
    document.addEventListener("click", this.clickHandler);
},
beforeDestroy () {
    document.removeEventListener("click", this.clickHandler);
},
methods: {
    clickHandler (e) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
      const path = e.path || (e.composedPath && e.composedPath());
      let ans = path.findIndex(
        (item, index) => item.className === "popover-content-class"
      );
      if (
        e.target.className !== "h-icon-add" &&
        e.target.className !== "h-icon-edit" &&
        ans === -1
      ) {
        this.$refs.leftTree.onCancel();
      }
    }
},
```
