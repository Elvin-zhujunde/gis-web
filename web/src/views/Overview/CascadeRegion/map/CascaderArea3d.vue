// 2024 / 06 / 14 / 星期五 15 : 18 : 12
<template>
    <div></div>
</template>

<script setup>
import * as turf from "@turf/turf"
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()
let CASCADE_DATASOURCE = null
function renderPolygon(geojson, zoomto = true) {
    const viewer = window.viewer
    const dataSource = new Cesium.GeoJsonDataSource()
    dataSource
        .load(geojson, {
            clampToGround: true,
        })
        .then(val => {
            viewer.dataSources.add(dataSource)
            const entities = dataSource.entities.values
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i]
                entity.polygon.material = Cesium.Color.fromCssColorString("#fff").withAlpha(0)
                entity.polyline = {
                    positions: entity.polygon.hierarchy._value.positions,
                    width: 3,
                    material: Cesium.Color.fromCssColorString("#689fd2"),
                }
                const center = Cesium.BoundingSphere.fromPoints(entity.polygon.hierarchy._value.positions).center
                entity.position = center
                console.log(entity)
                entity.label = {
                    text: entity.properties.name,
                    color: Cesium.Color.fromCssColorString("#fff"),
                    font: "normal 32px MicroSoft YaHei",
                    showBackground: true,
                    scale: 0.5,
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    disableDepthTestDistance: 10000.0,
                    enableCollisionDetection: true,
                }
            }
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
