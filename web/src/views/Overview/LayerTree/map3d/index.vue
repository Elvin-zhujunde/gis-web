// 2024 / 06 / 25 / 星期二 22 : 08 : 55
<template>
    <PoiLayer
        :id="'1-1'"
        v-if="checkedLayerList.includes('1-1')"
    />
    <!-- <VideoLyaer /> -->
</template>

<script setup>
import PoiLayer from "./PoiLayer.vue"
import VideoLyaer from "./VideoLayer.vue"
import { useMapStore } from "@/store/map.js"
const mapStore = useMapStore()
const { checkedLayerList } = storeToRefs(mapStore)
</script>
<style scoped lang="less"></style>
