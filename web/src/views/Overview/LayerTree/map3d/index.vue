// 2024 / 06 / 25 / 星期二 22 : 08 : 55
<template>
    <RandomPointLayer
        :id="'randomPoint'"
        v-if="checkedLayerList.includes('randomPoint')"
    />
    <RandomPolygonLayer
        :id="'randomPolygon'"
        v-if="checkedLayerList.includes('randomPolygon')"
    />
    <!-- <VideoLyaer /> -->
</template>

<script setup>
import RandomPointLayer from "./RandomPointLayer.vue"
import RandomPolygonLayer from "./RandomPolygonLayer.vue"
import VideoLyaer from "./VideoLayer.vue"
import { useMapStore } from "@/store/map.js"
const mapStore = useMapStore()
const { checkedLayerList } = storeToRefs(mapStore)
</script>
<style scoped lang="less"></style>
