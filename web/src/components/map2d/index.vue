// 2024 / 04 / 02 / 星期二 21 : 00 : 56
<template>
    <template v-if="mapStore.mapLoadStatus">
        <router-view></router-view>
    </template>
    <MapLayout>
        <template v-if="mapStore.mapLoadStatus">
            <!-- <CascaderArea2d /> -->
            <LayerTree />
            <FitView />
            <CascaderArea2dL7 />
        </template>
    </MapLayout>
</template>

<script setup>
import MapLayout from "./map2d-layout.vue"
import FitView from "./FitView.vue"
import CascaderArea2d from "@/views/Overview/CascadeRegion/map/CascaderArea2d.vue"
import CascaderArea2dL7 from "@/views/Overview/CascadeRegion/map/CascaderArea2d_l7.vue"
import { useMapStore } from "@/store/map.js"
import LayerTree from "@/views/Overview/LayerTree/map2d/index.vue"
const mapStore = useMapStore()
</script>
<style scoped lang="less"></style>
