<template>
    <div class="layout">
        <div class="layout-header">
            <Menu></Menu>
        </div>
        <div class="layout-content">
            <template v-if="mapStore.mapMode == '2d'">
                <Map2d></Map2d>
            </template>
            <template v-if="mapStore.mapMode == '3d'">
                <Map3d></Map3d>
            </template>
        </div>
        <!-- 全局配置的一些组件 -->
        <GobalComponents></GobalComponents>
    </div>
</template>

<script setup>
import Menu from "./menu.vue"
import GobalComponents from "./GobalComponents.vue"
import Map2d from "@/components/map2d/index.vue"
import Map3d from "@/components/map3d/index.vue"
import { useMapStore } from "@/store/useMap.js"
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
