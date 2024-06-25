// 2024 / 06 / 24 / 星期一 15 : 16 : 26
<template>
    <div
        class="bar1"
        :id="id"
        :style="{ height: height, width: width }"
    ></div>
</template>

<script setup>
import * as echarts from "echarts"
import { onMounted } from "vue"
let myChart
const props = defineProps({
    id: {
        type: String,
        default: "bar1",
    },
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "100%",
    },
    dataSource: {
        type: Array,
        default: () => [],
    },
    colors: {
        type: Array,
        default: () => [
            "#5BB1FF",
            "#0064BE",
            "#002F99",
            "#04005E",
            "#7800FF",
            "#49007B",
            "#9B4CBB",
            "#008386",
            "#00F8FF",
            "#003D1E",
            "#007543",
            "#00D579",
            "#62FCB9",
            "#4C6700",
            "#99D100",
            "#D7FF6B",
            "#A09000",
            "#FDEA41",
            "#FFF7B4",
            "#C7550B",
            "#FF7745",
            "#F98A44",
            "#FF987D",
            "#EE5858",
            "#BD1414",
        ],
    },
    showTitle: {
        type: Boolean,
        default: false,
    },
})

let ranking1 = `data:image/png;base64,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`
let ranking2 = `data:image/png;base64,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`
let ranking3 = `data:image/png;base64,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`
let ranking4 = `data:image/png;base64,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`
let ranking5 = `data:image/png;base64,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`
let ranking6 = `data:image/png;base64,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`
let ranking7 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAYAAACzdqxAAAACQElEQVRIia2WT0hUURTGfyMtFBMn1IUQkjqQEP2TFi4NXOhCUIwWQ7lMaVcpBg6kMItErdyJulFhXKj4aNXChbVqERqBYCAjCdFGqcBwVhonvgfT4/m8Ix54vMs93/nuOeede86L1a8c4iiter9zAV9wwFwF3gB1wDGwAzwBtqKMiiJ0cWAM+ACsAteBG1q/ly5eCLHt9QBfgTLgGjAOVOgZ116ZML1hPMEcNwOvgN/AU2ADKFHoNcLsAq8BM7wtfLnwaz6Rn+Mage8IsKz9TuA+MAF81F4TMAMsASvAXeAeMAt8khO7FkJKG+tAg0jNk4zCTeaRovUD6TLCLsl2XVwpS8U3oB34AlQCz4E/wChwEPFxTS4CfXq/BPaAm8BbPxW/gCpgDnisknIRO3hIpTgPdAM/CdSxfaTPYaTbHcXHIYfUJ7xcVuusbEuCHy9SEl4ulneIhdySRxoqTsR5pJeAAVVKpETdvDAx0mzCyy2eG7G8fQSMuOAL8dhILd9T50084OqtM/F2R7GRWiqcvCVQFdZUbgG1wVpOeLmRU7ytle2hX8s+cVxd6+EZrnQ/UCrbPfXsf6mYVvMeFKHdfU9hGzgWQhiTbkrYPtkOimvaiNNql40aN13qw0l5nFGr9MXWC9Ilhe2SbaO40oU0+suaed9dGn3YlC5SzQ6rkaeUu2rpf6i9pjUIXiglR0GSoBhgUtPZwt0EngH7emxte6YzjGH/Iz3J46DYZLDQrygVNhhOHf8u3c0I2gr6YQH+Anbfn/q9VD1PAAAAAElFTkSuQmCC`
let ranking8 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAYAAACzdqxAAAACYElEQVRIia2WT0hUURTGfyMtRkocKRdBSOqDhLBSW7QsKKhFMGLOYqiWFu0qo8CBCmZRlP3Z1dimggnS8OFK0EW1apEWQVAwTCREG8sEw7eqOPI9mB7z50524PEu53zne+eee+45L9Y5uYqjHNZ72gW8wQGzA7gDdAC/gU/AWeBDNaeGKrYEcBN4CcwC3cAurV/IlqiH2HSngI9AE7ATGAU26xmVrkmY0+V4ojneD9wCloFzwBugUVtvE2YBuA2YY4/wzcI/D4nCHLcJvFeAZ9L3AyngLvBKun3AA2ACmAQOAMeAh8BrBbFgW8hIMQ90idQiyWu76RJStD4uW17YCfnOiytjqfgMHAXeAVuAS8BP4AawUuVwTTYBw3pfAxaB3cBUmIofQCvwCDijknIR+/AVleJj4CSwRKSO7ZDeliMtJON9wFMRFK1qPD+YLYEU5dtYWlouMgOMe34Qs7c+UlVciVvCLSq6muJypdGFuV9IxoeUjtT/inhQV/k6MAdcXDdxIRk/CNiT8vwgBxwC+qRfV8RhTocKyXiLol+qleuaxJ4fFJVTy+93pSElfUUpPTxrKnuA9mgte34wrjKrJO3yXQ1rOSROqGud+IcrfQHYKN9F9ey1VIzpxEdEaHffB3ICx8oQxmTLCTss3xFxjRlxVu2yV+NmQH04rYjzapWh2PqJbGlhB+TbK65sPY1+m2beF5dGX25KN6gCrqqRZ5S7rbJ/VXvNahBcVkp+RUmiYoB7ms623ffAeeCbHlubzmyGMexfpJUijopNBtv6dqXCBkPN8e/ShIzgSF0/LMAf1marxe6OHHQAAAAASUVORK5CYII=`
let ranking9 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAYAAACzdqxAAAACY0lEQVRIia2WPWhTURTHf5EOKbaY+jEIpdj6QEH8Kg6OCi3UQYjUOAR11OKmVhQaUCGDUmt1K2kXFSI0lT6cBB3UyUGrCAULIWJBXCpVUPomK0f+D56P+HKjHnjcy73/8885556PpLbOruAoA1ofuYBbHDDbgFtAD7AKvAfOAu+SlNYk3GWAG8Bz4AmwE9il/TPdZZohtrPTwALQDuwAxoAN+sZ01i7MUD2eeIwPADeBr8A54DXQKte7hFkExgFT3Cv8OuGfhkRhjLsE3ifAA50fAY4Bt4EXOtsPTAEzwCxwEDgK3AFeyohFc6Gggzlgu0jNkrLczUdI0f647srCzkh3TlwFC8UH4DDwFtgIXAK+A6PAt4THNWkDhrVeA5aA3cDDMBRfgE3AXeCMUspF7IevKBXvASeBZWJ5bI/0ph5pNZvuAKaBPqBmcff84FUEUpNuazS1XGRalqwHKsDjRjquxGZpxfMDI78OdFSz6b7/QbwsciJrT5KCS68w6Tf3q9n0KcUTlfa/EeuhLL72kJZWOc8Pakk6TsTKCnM9B1xUNSaKa4xzqiiLb7/nB5VGClGLransAbrjuez5QQkoJfB0S3clzOWQOKOudeIvSvoCsFa6S+rZv0IxqRceEaHVvi8LDZyqQ5jSXUnYYemOiGvSiItql70aN4Pqw3lZXFarDMX293WXF3ZQur3iKjbT6Ds18z66NPp6U9q8sEK4qkZeUOw26/6T2mtRg+CyQvIjThIXA0xoOpu788B54LM+29uZ3RnGsL+R/sniuNhkMNe3KBQ2GBqOf5fKM4JDTf1hAX4C8eKpHWSO4LEAAAAASUVORK5CYII=`
let ranking10 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAYAAACzdqxAAAACa0lEQVRIia2WT0gVURTGf0oLpaQX1UIIyeeAQfRPW7RMKKhFYGguHulSo13/QOhBBW9RlGW70DYVvMAML65auKhWLcxCCAzMSIg2hgWJs6o49d14TvOmeeaBYe6c+53vnnPmzDlT1TS2TEo5ovuTNOB1KTDNwCCQBX4A74EzwEySUXXCXga4ATwHJoBdwG6tn2kvUwmx6fqAt0AdsBMYADbrGpCuTphTcTzRHB8EbgJfgbPAK6BWoTcIMw/cAsxwn/AbhX/qiXyOGwTeL8Bj6Y8DXcBt4IV0B4C7wCgwBrQBncA9YFJOzFsIeSmmgB0iNU+KCjdXQorWJ7VXFHZUtlPiylsqPgDHgGlgC9APLAHXgW8JL9dkA3Be96vAArAHGPep+AJsBe4Dp1VSacQOvqxSfAD0AItE6the0msjnW2vycqDE8DhwIUTHjTbXjMi/UurnsCFdp+TbW1SuSHDRa2zJaR2WCvQJOKRclHFEgcuvBa4sK/MgUOBC83DITtU0aUjTpCsj0QpMDm0FsRxMrcWxEayid/5bi3R/TfxI8uz8tprL1D5XhXxH8PAhf16fqfq6CpnVFrH1lT2Ao3+AwlcWBU1CFwYR9Yo22Vfy544o67VvYpP+gKwXrYL6tm/UjGs5n1RhPbtO9Wpgf/yWrpuYZxslsRhXMNGXFC7bNG46VAfzsnjolqlF1s/1F5O2A7ZtoirUEmj36aZ9zFNo4+b0tUqpStq5Hnlrl77n9ReCxoEl5SS71GSqBjgjqazhfsGOAd81mVr09meYQy7grScx1GxyWChb1cqbDD8c/yn+a8wgqMV/bAAPwG3PbUXCzSi6AAAAABJRU5ErkJggg==`
let chartIcon = `data:image/png;base64,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`
let xdata = {
    value: ["地区1", "地区2", "地区3", "地区4", "地区5", "地区6", "地区7", "地区8", "地区9", "地区10"],
}
let sdata = {
    value: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
}
let rankings = [ranking1, ranking2, ranking3, ranking4, ranking5, ranking6, ranking7, ranking8, ranking9, ranking10]
let rich_images = {}
xdata.value.map((v, k) => {
    let rich_images_key = `img${k}`
    let rich_images_item = {
        width: 34,
        height: 24,
        backgroundColor: {
            image: rankings[k],
        },
    }
    if (k < 3) {
        rich_images_item.width = 34
        rich_images_item.height = 24
    } else {
        rich_images_item.width = 22
        rich_images_item.height = 26
    }
    rich_images[rich_images_key] = rich_images_item
})

watch(
    () => props.dataSource,
    (_newValue, _oldValue) => {
        nextTick(() => {
            initChart()
        })
    },
    {
        immediate: true,
    },
)
let dataZoomMove = {
    start: 0,
    end: 4,
}

// 自动轮播和鼠标移入移出的停止和开启
let dataZoomMoveTimer = null
const startMoveDataZoom = (myChart, dataZoomMove) => {
    dataZoomMoveTimer = setInterval(() => {
        dataZoomMove.start += 1
        dataZoomMove.end += 1
        if (dataZoomMove.end > sdata.value.length - 1) {
            dataZoomMove.start = 0
            dataZoomMove.end = 4
        }
        myChart.setOption({
            dataZoom: [
                {
                    type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
                    startValue: dataZoomMove.start,
                    endValue: dataZoomMove.end,
                },
            ],
        })
    }, 1000)
}
onMounted(() => {
    let chartDom = myChart?.getDom()
    if (!chartDom) {
        return
    }
    startMoveDataZoom(myChart, dataZoomMove)

    chartDom.addEventListener("mouseout", () => {
        if (dataZoomMoveTimer) return
        let dataZoomMove_get = myChart.getOption().dataZoom[0]
        dataZoomMove.start = dataZoomMove_get.startValue
        dataZoomMove.end = dataZoomMove_get.endValue
        startMoveDataZoom(myChart, dataZoomMove)
    })
    // 移入
    // myChart.on
    chartDom.addEventListener("mouseover", () => {
        clearInterval(dataZoomMoveTimer)
        dataZoomMoveTimer = undefined
    })
})
function initChart() {
    let data = props.dataSource
    myChart = echarts.init(document.getElementById(props.id))
    myChart.setOption(
        {
            // backgroundColor: "#000",
            tooltip: {
                trigger: "axis",
                backgroundColor: "#081429",
                textStyle: {
                    color: "#fff",
                },
                borderColor: "rgba(255,255,255,.2)",
                axisPointer: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    },
                },
            },
            dataZoom: [
                {
                    show: true, // 为true 滚动条出现
                    realtime: true,
                    type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
                    height: "100%", // 表示滚动条的高度，也就是粗细
                    startValue: dataZoomMove.start, // 表示默认展示20%～80%这一段。
                    endValue: dataZoomMove.end,
                    width: 4,
                    right: "5",
                    top: "5%", //位置和grid配置注意下
                    height: "80%",
                    yAxisIndex: [0, 1], //关联多个y轴
                    moveHandleStyle: {
                        color: "rgba(89, 202, 241,.5)",
                    },
                    moveHandleSize: "6",
                    emphasis: {
                        moveHandleStyle: {
                            color: "rgba(89, 202, 241,.5)",
                        },
                    },
                    textStyle: {
                        color: "rgba(255,255,255,0)",
                    },
                    backgroundColor: "rgba(255,255,255,.1)",
                    borderColor: "rgba(255,255,255,0)",
                    fillerColor: "rgba(0,0,0,0)",
                    handleSize: "6",
                    handleStyle: {
                        color: "rgba(255,255,255,0)",
                    },
                    brushStyle: {
                        color: "rgba(129, 243, 253)",
                    },
                },
                {
                    //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
                    type: "inside",
                    yAxisIndex: 0,
                    zoomOnMouseWheel: false, //滚轮是否触发缩放
                    moveOnMouseMove: true, //鼠标滚轮触发滚动
                    moveOnMouseWheel: true,
                },
            ],
            grid: {
                containLabel: true,
                // 边距自行修改
                bottom: "5%",
                left: "1%",
                top: "5%",
                right: "5%",
            },
            xAxis: {
                type: "value",
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: [
                {
                    type: "category",
                    data: xdata.value,
                    inverse: true,
                    axisLabel: {
                        fontSize: "12px",
                        inside: true,
                        verticalAlign: "bottom",
                        // lineHeight: 20,
                        margin: 0, //刻度标签与轴线之间的距离
                        formatter: function (value) {
                            let k = xdata.value.indexOf(value)
                            let index = k
                            if (index > 2) {
                                return `{z|}{img${index}|}{z|} {a|${value}}`
                            }
                            return `{img${index}|} {a|${value}}`
                        },
                        rich: {
                            // 排名名称
                            a: {
                                fontSize: "14px",
                                color: "#D6E0FC",
                                padding: [4, 0, 0, 0],
                            },
                            // 间隔
                            z: {
                                width: 6,
                                height: 6,
                            },
                            ...rich_images,
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#13387a",
                        },
                    },
                },

                {
                    type: "category",
                    data: xdata.value,
                    inverse: true,
                    axisLabel: {
                        inside: true,
                        verticalAlign: "bottom",
                        fontSize: 14,
                        // lineHeight: 54,
                        margin: 0, //刻度标签与轴线之间的距离
                        formatter: function (value) {
                            let k = xdata.value.indexOf(value)
                            let index = k
                            return `{a|${sdata.value[index]}}{u|unit}`
                        },
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#73E3FF",
                                padding: [0, 0, 0, 0],
                            },
                            u: {
                                fontSize: 10,
                                color: "#fff",
                                fontSize: 16,
                                padding: [2, 0, 0, 4],
                            },
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#13387a",
                        },
                    },
                },
            ],
            series: [
                {
                    data: sdata.value,
                    type: "bar",
                    barWidth: 6,
                    showBackground: true,
                    backgroundStyle: {
                        color: "#D0DEEE1A",
                    },
                    itemStyle: {
                        borderRadius: 40,
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#148BCE", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#73E3FF", // 0% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    label: {
                        show: true,
                        position: "insideRight",
                        distance: -15,
                        formatter: () => {
                            return `{z|}{a|}`
                        },
                        rich: {
                            // 配置头部光环圆圈
                            a: {
                                widht: 20,
                                height: 20,
                                backgroundColor: {
                                    image: chartIcon,
                                },
                            },
                        },
                    },
                },
            ],
        },
        true,
    )
    window.addEventListener("resize", function () {
        myChart.resize()
    })
}
</script>
<style scoped lang="less"></style>
