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
import { onBeforeUnmount } from "vue"

import dataSource from "/public/json/china.json"
let myChart
let interVal
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

function initChart() {
    let dataSource = props.dataSource
    myChart = echarts.init(document.getElementById(props.id))
    myChart.showLoading()
    myChart.hideLoading()
    echarts.registerMap("USA", dataSource, {
        Alaska: {
            // 把阿拉斯加移到美国主大陆左下方
            left: -131,
            top: 25,
            width: 15,
        },
        Hawaii: {
            left: -110,
            top: 28,
            width: 5,
        },
        "Puerto Rico": {
            // 波多黎各
            left: -76,
            top: 26,
            width: 2,
        },
    })
    var data = dataSource.features.map(i => {
        return { name: i.properties.name, value: _tool.getRandomInt(1000, 100000) }
    })
    data.sort(function (a, b) {
        return a.value - b.value
    })
    const mapOption = {
        visualMap: {
            left: "right",
            min: 1000,
            max: 100000,
            inRange: {
                // prettier-ignore
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
            },
            text: ["High", "Low"],
            calculable: true,
        },
        series: [
            {
                id: "population",
                type: "map",
                roam: true,
                map: "USA",
                animationDurationUpdate: 1000,
                universalTransition: true,
                data: data,
            },
        ],
    }
    const barOption = {
        grid: {
            left: "20%",
        },
        xAxis: {
            type: "value",
        },
        yAxis: {
            type: "category",
            axisLabel: {
                rotate: 30,
            },
            data: data.map(function (item) {
                return item.name
            }),
        },
        animationDurationUpdate: 1000,
        series: {
            type: "bar",
            id: "population",
            data: data.map(function (item) {
                return item.value
            }),
            universalTransition: true,
        },
    }
    let currentOption = mapOption
    myChart.setOption(mapOption)
    interVal = setInterval(function () {
        currentOption = currentOption === mapOption ? barOption : mapOption
        myChart.setOption(currentOption, true)
    }, 2000)

    // myChart.setOption(123, true)
    window.addEventListener("resize", function () {
        myChart.resize()
    })
}

onBeforeUnmount(() => {
    interVal && clearInterval(interVal)
})
</script>
<style scoped lang="less"></style>
