<template>
    <div
        class="analysisPie"
        :id="id"
        :style="{ height: height, width: width }"
    ></div>
</template>

<script setup>
import * as echarts from "echarts"
function numFormat(num) {
    let res = num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            return `${$1},`
        })
    })
    return res
}
const props = defineProps({
    id: {
        type: String,
        default: "analysisPie",
    },
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "100%",
    },
    options: {
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
    itemBorderWidth: {
        type: Number,
        default: 2,
    },
    showTitle: {
        type: Boolean,
        default: false,
    },
    titleObj: {
        type: Object,
        default: () => {},
    },
    titleText: {
        type: String,
        default: "",
    },
    total: {
        type: Number,
        default: 0,
    },
})

watch(
    () => props.options,
    (_newValue, _oldValue) => {
        nextTick(() => {
            initChart()
        })
    },
    {
        immediate: true,
    },
)

function initChart() {
    let data = props.options
    let myChart = echarts.init(document.getElementById(props.id))
    myChart.setOption(
        {
            tooltip: {
                trigger: "item",
                confine: true,
                padding: 5,
                formatter: params => {
                    return `<div style='display:flex;align-items:center;font-size:12px;}'><i style='width:7px;height:7px;border-radius:50%;margin-right:7px;background:${
                        params.color
                    }'></i><span>${params.name}</span>：<span>${
                        params.value ? params.value.toLocaleString() : 0
                    }</span>,&nbsp;<span>${params.percent ? params.percent.toLocaleString() : 0}%</span></div>
            
                    `
                },
            },
            // 中间的标题字
            title: {
                show: props.showTitle,
                text: `{a|${props.titleText}}`,
                left: "41.5%",
                top: "38.5%",
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 12,
                            color: "#ccc",
                            fontFamily: "DINAlternate-Bold, DINAlternate",
                            fontWeight: "bold",
                            align: "center",
                        },
                        // b: {
                        //     color: "#000",
                        //     fontSize: 12,
                        //     fontFamily: "DIN-BlackItalic",
                        //     align: "center",
                        // },
                    },
                },
                ...props.titleObj,
            },
            //
            legend: {
                // type: 'scroll',
                pageTextStyle: {
                    fontSize: 12,
                    color: "rgba(255,255,255)",
                },
                // orient: 'vertical',
                top: "77%",
                width: "90%",
                icon: "circle",
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                textStyle: {
                    color: "#FFFFFF",
                    fontWeight: "400",
                    rich: {
                        a: {
                            width: 80,
                            fontFamily: "AlibabaPuHuiTi-Regular",
                            fontSize: 12,
                            color: "#9AA9CA",
                        },
                        c: {
                            width: 50,
                            color: "#FFFFFF",
                            align: "left",
                            fontSize: 12,
                            fontFamily: "DIN-BlackItalic",
                        },
                    },
                },
                formatter: params => {
                    let tarValue = 0
                    let name
                    for (let i = 0, l = data.length; i < l; i++) {
                        if (data[i].name == params) {
                            tarValue = numFormat(data[i].value)
                        }
                        if (!params) return ""
                        // 文字超出打点
                        if (params.length > 6) {
                            name = `${params.slice(0, 6)}...`
                        } else {
                            name = params
                        }
                    }
                    // return `{a|${name}}    {c|${tarValue}}`
                    return `{a|${name}}`
                },
                tooltip: {
                    trigger: "item",
                    formatter(params) {
                        let item = data.find(d => d.name === params.name)
                        return `${item?.name}:${item?.value}`
                    },
                    textStyle: {
                        fontSize: 12,
                    },
                    show: true,
                },
            },
            color: props.colors,
            series: [
                {
                    type: "custom",
                    coordinateSystem: "none",
                    renderItem(_params, api) {
                        return {
                            type: "circle",
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2.38,
                                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.545,
                            },
                            style: {
                                stroke: "#4F5971",
                                fill: "transparent",
                                lineWidth: 1.5,
                                lineDash: [4, 4],
                            },
                            silent: true,
                        }
                    },
                    data: [0],
                },
                {
                    type: "custom",
                    coordinateSystem: "none",

                    renderItem(_params, api) {
                        return {
                            type: "circle",
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2.38,
                                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.23,
                            },
                            style: {
                                stroke: "#4F5971",
                                fill: "transparent",
                                lineWidth: 3,
                            },
                            silent: true,
                        }
                    },
                    data: [0],
                },
                {
                    type: "pie",
                    radius: ["26%", "52%"],
                    center: ["50%", "42%"],
                    avoidLabelOverlap: false,
                    minAngle: 10,
                    itemStyle: {
                        borderWidth: props.itemBorderWidth,
                        borderColor: "rgba(9, 47, 87, 0.73)",
                    },
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: !props.showTitle,
                            fontSize: 15,
                            color: "#FFFFFF",
                            formatter: "{d}%",
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: props.options,
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
