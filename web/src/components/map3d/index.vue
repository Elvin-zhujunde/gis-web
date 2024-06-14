// 2024 / 06 / 13 / 星期四 15 : 49 : 06
<template>
    <template v-if="mapStore.mapLoadStatus">
        <router-view></router-view>
    </template>
    <Map3dLayout>
        <CascaderArea3d></CascaderArea3d>
    </Map3dLayout>
</template>

<script setup>
import Map3dLayout from "./map3d-layout.vue"

import CascaderArea3d from "@/views/CascadeRegion/map/CascaderArea3d.vue"
import { useMapStore } from "@/store/useMap.js"

const mapStore = useMapStore()
</script>
<style scoped lang="less"></style>
