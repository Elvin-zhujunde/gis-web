// 2024 / 04 / 05 / 星期五 07 : 24 : 08
<template>
    <div id="map-container"></div>
</template>
<script setup>
import { useMap } from "../../Hooks/useMap"

const props = defineProps({
    id: {
        type: String,
        default: "main",
    },
})
const map = useMap(props.id, { container: "map-container" })

// const changeMap = (x, y) => {
//     let position = new map.AMap.LngLat(x, y) // 标准写法
//     state.map.setCenter(position)
//     state.map.setZoom(13)
// }
</script>
<style lang="less" scoped>
#map-container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    z-index: 0;
}
</style>
<script>
import { defineComponent, onMounted } from "vue"

export default defineComponent({
    name: "map-base",
})
</script>
