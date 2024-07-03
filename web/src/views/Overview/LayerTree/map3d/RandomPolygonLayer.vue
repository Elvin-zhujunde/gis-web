// 2024 / 06 / 28 / 星期五 23 : 01 : 47
<template></template>

<script setup>
import { getGeojsonById } from "@/api"
import * as turf from "@turf/turf"
import { useMapStore } from "@/store/map.js"

const mapStore = useMapStore()

let DATA_SOURCE = null
const props = defineProps({
    id: {
        type: String,
        default: "",
        require: true,
    },
})

function renderPolygon(geojson, zoomto = true) {
    const viewer = window.viewer
    DATA_SOURCE = new Cesium.GeoJsonDataSource()
    let provinceMap = new Map()
    DATA_SOURCE.load(geojson, {
        clampToGround: true,
    }).then(val => {
        viewer.dataSources.add(DATA_SOURCE)
        viewer.zoomTo(DATA_SOURCE)
        const entities = DATA_SOURCE.entities.values
        entities.forEach((entity, i) => {
            entity.polygon.material = Cesium.Color.fromCssColorString("#fff").withAlpha(0)
            entity.polyline = {
                positions: entity.polygon.hierarchy._value.positions,
                width: 3,
                material: Cesium.Color.fromCssColorString("#689fd2"),
            }
            const center = Cesium.BoundingSphere.fromPoints(entity.polygon.hierarchy._value.positions).center
            // @@自定义属性 name 取决于geojson中的name字段
            const provinceName = entity.properties.getValue().name
            // 用于是否已经添加过标签
            if (!provinceMap.get(provinceName)) {
                entity.label = {
                    text: provinceName,
                    color: Cesium.Color.fromCssColorString("#fff"),
                    font: "normal 32px MicroSoft YaHei",
                    showBackground: true,
                    scale: 0.5,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    disableDepthTestDistance: 10000.0,
                    enableCollisionDetection: true,
                }
                provinceMap.set(provinceName, 1)
            }
            entity.position = center
        })
    })
}

onBeforeUnmount(() => {
    viewer.dataSources.remove(DATA_SOURCE)
    DATA_SOURCE = null
})
onMounted(async () => {
    const geosjon = await getGeojsonById(props.id)
    renderPolygon(geosjon)
})
</script>
<style scoped lang="less"></style>
