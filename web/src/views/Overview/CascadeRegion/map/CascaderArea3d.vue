// 2024 / 06 / 14 / 星期五 15 : 18 : 12
<template>
    <div></div>
</template>

<script setup>

import { useMapStore } from "@/store/map"
const mapStore = useMapStore()
let CASCADE_DATASOURCE = null
function renderPolygon(geojson, zoomto = true) {
    const viewer = window.viewer
    const dataSource = new Cesium.GeoJsonDataSource()
    let provinceMap = new Map()

    dataSource
        .load(geojson, {
            clampToGround: true,
        })
        .then(val => {
            viewer.dataSources.add(dataSource)
            const entities = dataSource.entities.values
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
            const z = [10000000, 1000000, 800000][mapStore.cascader_vmodel?.length - 1]
            const [x, y] = turf.center(geojson).geometry.coordinates
            mapStore.flyPoi = { x, y, z }
        })
    return dataSource
}

function clearPolygon(dataSource) {
    if (dataSource) {
        // 从viewer中移除dataSource
        const viewer = window.viewer
        viewer.dataSources.remove(dataSource)
    }
}

watch(
    () => mapStore.cascaer_geo_data,
    val => {
        if (!val) {
            return
        }
        CASCADE_DATASOURCE && clearPolygon(CASCADE_DATASOURCE)

        CASCADE_DATASOURCE = renderPolygon(val)
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>
<style scoped lang="less"></style>
