// 2024 / 04 / 02 / 星期二 21 : 00 : 56
<template>
    <template v-if="mapStore.mapLoadStatus">
        <router-view></router-view>
    </template>
    <MapLayout>
        <template v-if="mapStore.mapLoadStatus">
            <CascaderArea2d />
            <LayerTree />
        </template>
    </MapLayout>
</template>

<script setup>
import MapLayout from "./map2d-layout.vue"
import CascaderArea2d from "@/views/Overview/CascadeRegion/map/CascaderArea2d.vue"
import { useMapStore } from "@/store/map.js"
import LayerTree from "@/views/Overview/LayerTree/map2d/index.vue"
const mapStore = useMapStore()
</script>
<style scoped lang="less"></style>
