<template></template>
<script setup>
import { LineLayer, PointLayer, PolygonLayer } from "@antv/l7"

import { useMapStore } from "@/store/map"
const mapStore = useMapStore()
let lineDown, lineUp, textLayer, lineLayer, provincelayer

function createLayer(geojson) {
    createAreaLayer(geojson)
}

function createAreaLayer(data) {
    const texts = []

    data.features.map(option => {
        const { name, center } = option.properties
        const [lng, lat] = center
        texts.push({ name, lng, lat })
        return ""
    })

    textLayer = new PointLayer({ zIndex: 2 })
        .source(texts, {
            parser: {
                type: "json",
                x: "lng",
                y: "lat",
            },
        })
        .shape("name", "text")
        .size(14)
        .color("#0ff")
        .style({
            textAnchor: "center", // 文本相对锚点的位置 center|left|right|top|bottom|top-left
            spacing: 2, // 字符间距
            padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
            stroke: "#0ff", // 描边颜色
            strokeWidth: 0.2, // 描边宽度
            raisingHeight: 20000,
            textAllowOverlap: true,
        })
    scene.addLayer(textLayer)

    lineDown = new LineLayer().source(data).shape("line").color("#0DCCFF").size(1).style({
        raisingHeight: 0,
    })

    lineUp = new LineLayer({ zIndex: 1 }).source(data).shape("line").color("#0DCCFF").size(1).style({
        raisingHeight: 100,
    })

    scene.addLayer(lineDown)
    scene.addLayer(lineUp)
    lineLayer = new LineLayer().source(data).shape("wall").size(20000).style({
        heightfixed: true,
        opacity: 0.6,
        sourceColor: "#0DCCFF",
        targetColor: "rbga(255,255,255, 0)",
    })
    scene.addLayer(lineLayer)

    provincelayer = new PolygonLayer({})
        .source(data)
        .size(20000)
        .shape("extrude")
        .color("#0DCCFF")
        .active({
            color: "rgb(100,230,255)",
        })
        .style({
            heightfixed: true,
            pickLight: true,
            raisingHeight: 100,
            opacity: 0.8,
        })

    scene.addLayer(provincelayer)

    // provincelayer.on("mousemove", () => {
    //     provincelayer.style({
    //         raisingHeight: 200000 + 100000,
    //     })
    //     lineDown.style({
    //         raisingHeight: 200000 + 100000,
    //     })
    //     lineUp.style({
    //         raisingHeight: 200000 + 10000 + 100000,
    //     })
    //     textLayer.style({
    //         raisingHeight: 200000 + 10000 + 10000 + 100000,
    //     })
    // })

    // provincelayer.on("unmousemove", () => {
    //     provincelayer.style({
    //         raisingHeight: 200000,
    //     })
    //     lineDown.style({
    //         raisingHeight: 200000,
    //     })
    //     lineUp.style({
    //         raisingHeight: 200000 + 10000,
    //     })
    //     textLayer.style({
    //         raisingHeight: 200000 + 10000 + 10000,
    //     })
    // })
}

function getAreaCenter(geojson) {
    return {
        type: "FeatureCollection",
        features: geojson.features.map(i => {
            const { properties } = i
            return {
                type: "Feature",
                properties,
                geometry: {
                    coordinates: properties.center,
                    type: "Point",
                },
            }
        }),
    }
}
function removeLayer() {
    lineDown && scene.removeLayer(lineDown)
    lineUp && scene.removeLayer(lineUp)
    textLayer && scene.removeLayer(textLayer)
    lineLayer && scene.removeLayer(lineLayer)
    provincelayer && scene.removeLayer(provincelayer)
}
watch(
    () => mapStore.cascaer_geo_data,
    val => {
        if (!val) return removeLayer()

        createLayer(val)
        mapStore.flyArea = val
    },
    {
        immediate: true,
    },
)
</script>

<style scoped>
.traffic-layer {
    z-index: 5000;
}
</style>
