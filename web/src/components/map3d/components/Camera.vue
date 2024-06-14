// 2024 / 06 / 14 / 星期五 16 : 27 : 31
<template></template>

<script setup>
import { storeToRefs } from "pinia"
import { useMapStore } from "@/store/map"
import * as turf from "@turf/turf"
const mapStore = useMapStore()

const { flyPoi, flyArea } = storeToRefs(mapStore)
watch(flyPoi, val => {
    const { x, y, z } = val
    if (!x || !y || !z) return

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, z),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0,
            distance: 1000,
        },
    })
})
watch(flyArea, geojsonData => {
    const geoJsonDataSource = new Cesium.GeoJsonDataSource()
    geoJsonDataSource.load(geojsonData).then(() => {
        viewer.dataSources.add(geoJsonDataSource)

        // 获取中心点或其他合适的位置
        const center = turf.center(geojsonData)

        // 创建飞行路径动画
        const flightPath = viewer.camera.createFlightPath({
            destination: center,
            orientation: {
                heading: Cesium.Math.toRadians(270), // 以中心点为基准的航向角
                pitch: Cesium.Math.toRadians(-60), // 向下倾斜的角度
                roll: 0.0,
            },
            duration: 2.0, // 飞行动画持续的时间，单位为秒
        })

        // 开始飞行动画
        viewer.camera.flyTo(flightPath)
    })
})
</script>
<style scoped lang="less"></style>
