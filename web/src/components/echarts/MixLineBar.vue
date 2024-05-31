// 2024 / 05 / 20 / 星期一 17 : 40 : 15
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
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    crossStyle: {
                        color: "#999",
                    },
                },
            },
            toolbox: {
                feature: {
                    dataView: { show: false, readOnly: false },
                    magicType: { show: false, type: ["line", "bar"] },
                    restore: { show: false },
                    saveAsImage: { show: true },
                },
            },
            legend: {
                data: ["Evaporation", "Precipitation", "Temperature"],
                pageTextStyle: {
                    fontSize: 12,
                    color: "rgba(255,255,255)",
                },
                // orient: 'vertical',
                bottom: "3%",
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
            },
            xAxis: [
                {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    axisPointer: {
                        type: "shadow",
                    },
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: "Precipitation",
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: "{value} ml",
                    },
                },
                {
                    type: "value",
                    name: "Temperature",
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: "{value} °C",
                    },
                },
            ],
            series: [
                {
                    name: "Evaporation",
                    type: "bar",
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " ml"
                        },
                    },
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                },
                {
                    name: "Precipitation",
                    type: "bar",
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " ml"
                        },
                    },
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                },
                {
                    name: "Temperature",
                    type: "line",
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " °C"
                        },
                    },
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
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
