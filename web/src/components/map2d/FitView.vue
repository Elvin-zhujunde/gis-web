// 2024 / 07 / 03 / 星期三 14 : 19 : 25
<template></template>

<script setup>
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()

function fitView(geojson) {
    if (!geojson) return
    const [zoom, { lng, lat }] = map.getFitZoomAndCenterByBounds(turf.bbox(geojson))
    map.setZoomAndCenter(zoom - 0.5, [lng, lat])
}

watch(
    () => mapStore.flyArea,
    geojson => {
        geojson && fitView(geojson)
    },
    { immediate: true },
)
</script>
<style scoped lang="less"></style>
