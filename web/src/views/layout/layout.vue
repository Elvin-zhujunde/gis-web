<template>
    <div class="layout">
        <div class="layout-header">
            <LayoutMenu></LayoutMenu>
        </div>
        <div class="layout-content">
            <Map2d v-if="mapStore.mapMode == '2d'"></Map2d>
            <Map3d v-if="mapStore.mapMode == '3d'"></Map3d>
        </div>
        <!-- 全局配置的一些组件 -->
        <GobalComponents></GobalComponents>
    </div>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue"
import GobalComponents from "./GobalComponents.vue"
import Map2d from "@/components/map2d/index.vue"
import Map3d from "@/components/map3d/index.vue"
import { useMapStore } from "@/store/map.js"
const mapStore = useMapStore()
</script>

<style lang="less" scoped>
.layout {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    .layout-content {
        flex: 1;
        // position: relative;
        height: 100%;
        overflow-y: auto;
    }
}
</style>
