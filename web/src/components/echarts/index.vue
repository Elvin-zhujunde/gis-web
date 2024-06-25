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
    let data = props.dataSource
    myChart = echarts.init(document.getElementById(props.id))
    myChart.setOption(123, true)
    window.addEventListener("resize", function () {
        myChart.resize()
    })
}
</script>
<style scoped lang="less"></style>
