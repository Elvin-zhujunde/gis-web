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
                entity.polygon.material = new Cesium.ColorMaterialProperty(
                    new Cesium.CallbackProperty(() => {
                        return entity.isHighlighted ? 
                            Cesium.Color.fromCssColorString("#4e9eff").withAlpha(0.3) :
                            Cesium.Color.fromCssColorString("#3370ff").withAlpha(0.1)
                    }, false)
                )
                
                entity.polyline = {
                    positions: entity.polygon.hierarchy._value.positions,
                    width: 2,
                    material: new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.fromCssColorString("#4e9eff"),
                        dashLength: 16.0,
                    }),
                }
                const center = Cesium.BoundingSphere.fromPoints(entity.polygon.hierarchy._value.positions).center
                // @@自定义属性 name 取决于geojson中的name字段
                const provinceName = entity.properties.getValue().name
                // 用于是否已经添加过标签
                if (!provinceMap.get(provinceName)) {
                    entity.label = {
                        text: provinceName,
                        font: "normal 28px MicroSoft YaHei",
                        fillColor: Cesium.Color.WHITE,
                        outlineColor: Cesium.Color.fromCssColorString("#2c58a6"),
                        outlineWidth: 2,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        showBackground: true,
                        backgroundColor: Cesium.Color.fromCssColorString("#2c58a6").withAlpha(0.5),
                        backgroundPadding: new Cesium.Cartesian2(7, 5),
                        scale: 0.5,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000000),
                        enableCollisionDetection: true,
                    }
                    provinceMap.set(provinceName, 1)
                }
                entity.position = center
                entity.isHighlighted = false
                entity.polygon.classificationType = Cesium.ClassificationType.BOTH
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

// 添加鼠标事件处理
onMounted(() => {
    const viewer = window.viewer
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    
    // 记录上一个高亮的实体
    let previousEntity = null
    
    handler.setInputAction((movement) => {
        // 清除上一个实体的高亮
        if (previousEntity) {
            previousEntity.isHighlighted = false
        }

        const pickedFeature = viewer.scene.pick(movement.endPosition)
        if (Cesium.defined(pickedFeature)) {
            const entity = pickedFeature.id
            if (entity) {
                entity.isHighlighted = true
                previousEntity = entity
            }
        } else {
            // 如果鼠标没有指向任何实体，将 previousEntity 设为 null
            previousEntity = null
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    // 组件卸载时清理事件处理器
    onUnmounted(() => {
        handler.destroy()
    })
})
</script>
<style scoped lang="less"></style>
