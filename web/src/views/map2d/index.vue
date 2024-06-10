// 2024 / 04 / 02 / 星期二 21 : 00 : 56
<template>
    <template v-if="mapStore.mapLoadStatus">
        <router-view></router-view>
    </template>
    <MapLayout>
        <template v-if="mapStore.mapLoadStatus">
            <TrafficLayer v-if="layerStore.trafficLayerStatus" />
            <CascaderArea v-if="layerStore.cascaderLayerStatus" />
        </template>
    </MapLayout>
</template>

<script setup>
import MapLayout from "./map2d-layout.vue"
import TrafficLayer from "@/views/map2d/Layers/TrafficLayer.vue"
import CascaderArea from "@/views/map2d/CascadeRegion/map/CascaderArea.vue"
import { useMapStore } from "@/store/useMap.js"
import { useLayerStore } from "@/views/map2d/LayerStore/layer.js"
const layerStore = useLayerStore()
const mapStore = useMapStore()
let map = null
watch(
    () => mapStore.mapLoadStatus,
    val => {
        if (!val) return
    },
)
</script>
<style scoped lang="less"></style>
