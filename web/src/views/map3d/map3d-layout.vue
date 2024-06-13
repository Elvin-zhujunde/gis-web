<template>
    <div class="map-layout">
        <MapBase />
        <div class="map-components">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import MapBase from "./map3d-base.vue"
</script>
<style lang="less" scoped>
.map-layout {
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}
</style>
