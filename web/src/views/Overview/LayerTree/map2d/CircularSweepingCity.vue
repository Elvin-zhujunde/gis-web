// 2024 / 07 / 03 / 星期三 11 : 15 : 19
<template></template>

<script setup>
import { CityBuildingLayer, LineLayer, PolygonLayer, Scene } from "@antv/l7"
import { GaodeMap } from "@antv/l7-maps"
import { useMapStore } from "@/store/map"
import { onBeforeUnmount } from "vue"
const mapStore = useMapStore()
let pointLayer
let lakeLayer
let landLayer
let lakeBorderLayer
let layer
onMounted(() => {
    fetch("https://gw.alipayobjects.com/os/rmsportal/ggFwDClGjjvpSMBIrcEx.json").then(async res => {
        let geojson = await res.json()
        mapStore.flyArea = geojson
        pointLayer = new CityBuildingLayer()
        pointLayer
            .source(geojson)
            .size("floor", [0, 500])
            .color("rgba(242,246,250,1.0)")
            .animate({
                enable: true,
            })
            .active({
                color: "#0ff",
                mix: 0.5,
            })
            .style({
                opacity: 0.7,
                baseColor: "rgb(16, 16, 16)",
                windowColor: "rgb(30, 60, 89)",
                brightColor: "rgb(255, 176, 38)",
                sweep: {
                    enable: true,
                    sweepRadius: 2,
                    sweepColor: "#1990FF",
                    sweepSpeed: 0.5,
                    sweepCenter: [120.145319, 30.238915],
                },
            })
        scene.addLayer(pointLayer)
    })

    fetch("https://gw.alipayobjects.com/os/bmw-prod/67130c6c-7f49-4680-915c-54e69730861d.json")
        .then(data => data.json())
        .then(({ lakeBorderData, lakeData, landData }) => {
            lakeLayer = new PolygonLayer()
                .source(lakeData)
                .shape("fill")
                .color("#1E90FF")
                .style({
                    opacity: 0.4,
                    opacityLinear: {
                        enable: true,
                        dir: "out", // in - out
                    },
                })
            landLayer = new PolygonLayer()
                .source(landData)
                .shape("fill")
                .color("#3CB371")
                .style({
                    opacity: 0.4,
                    opacityLinear: {
                        enable: true,
                        dir: "in", // in - out
                    },
                })

            lakeBorderLayer = new PolygonLayer()
                .source(lakeBorderData)
                .shape("fill")
                .color("#ccc")
                .style({
                    opacity: 0.5,
                    opacityLinear: {
                        enable: true,
                        dir: "in", // in - out
                    },
                })

            scene.addLayer(lakeLayer)
            scene.addLayer(lakeBorderLayer)
            scene.addLayer(landLayer)
        })

    fetch("https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json")
        .then(res => res.json())
        .then(data => {
            layer = new LineLayer({
                zIndex: 0,
                depth: true,
            })
                .source(data)
                .size(1)
                .shape("line")
                .color("#1990FF")
                .animate({
                    interval: 3, // 间隔
                    duration: 3, // 持续时间，延时
                    trailLength: 2, // 流线长度
                })
            scene.addLayer(layer)
        })
})

onBeforeUnmount(() => {
    pointLayer && scene.removeLayer(pointLayer)
    lakeLayer && scene.removeLayer(lakeLayer)
    landLayer && scene.removeLayer(landLayer)
    lakeBorderLayer && scene.removeLayer(lakeBorderLayer)
    layer && scene.removeLayer(layer)
})
</script>
<style scoped lang="less"></style>
