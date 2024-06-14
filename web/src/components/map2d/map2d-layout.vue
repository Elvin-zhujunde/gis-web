<template>
    <div class="map-layout">
        <MapBase :id="id" />

        <div class="map-components">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import MapBase from "./map2d-base.vue"
const props = defineProps({
    id: {
        type: String,
        default: "main",
    },
})
</script>
<style lang="less" scoped>
.map-layout {
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}
</style>
