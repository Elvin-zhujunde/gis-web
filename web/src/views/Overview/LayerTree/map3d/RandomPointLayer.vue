// 2024 / 06 / 28 / 星期五 23 : 01 : 47
<template></template>

<script setup>
import poi_default from "/public/assets/img/poi_circle_fill.png"

let DATA_SOURCE = null
const props = defineProps({
    id: {
        type: String,
        default: "",
        require: true,
    },
})

function createPoiLayer(geojsonData) {
    // 解析GeoJSON数据
    let entities = Cesium.GeoJsonDataSource.load(geojsonData)

    // 将解析后的数据添加到Cesium Viewer
    viewer.dataSources.add(entities).then(function (dataSource) {
        DATA_SOURCE = dataSource
        let entities = dataSource.entities.values

        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i]
            // 可以在这里设置点的样式，例如点的颜色、大小等
            entity.billboard.color = Cesium.Color.fromCssColorString("#fff")
            entity.billboard.image = poi_default
            // entity.point.pixelSize = 10
        }
    })
}

onBeforeUnmount(() => {
    viewer.dataSources.remove(DATA_SOURCE)
    DATA_SOURCE = null
})
onMounted(async () => {
    const geosjon = await _api.getGeojsonById(props.id)
    createPoiLayer(geosjon)
})
</script>
<style scoped lang="less"></style>
