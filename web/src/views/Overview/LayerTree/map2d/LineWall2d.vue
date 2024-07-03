// 2024 / 07 / 03 / 星期三 15 : 13 : 14
<template></template>

<script setup>
import { LineLayer, Scene } from "@antv/l7"
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()

let layer

const props = defineProps({
    id: {
        type: String,
        default: "",
        require: true,
    },
})

onMounted(async () => {
    let data = await _api.getGeojsonById(props.id)
    mapStore.flyArea = data
    layer = new LineLayer({}).source(data).size(40).shape("wall").style({
        opacity: 1,
        sourceColor: "#0DCCFF",
        targetColor: "rbga(255,255,255, 0)",
    })
    scene.addLayer(layer)
})

onBeforeUnmount(() => {
    scene.removeLayer(layer)
})
</script>
<style scoped lang="less"></style>
