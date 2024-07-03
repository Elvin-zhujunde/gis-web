// 2024 / 06 / 25 / 星期二 22 : 08 : 55
<template>
    <ImgCluster2d
        id="imgcluster"
        v-if="checkedLayerList.includes('imgcluster')"
    />
    <CircularSweepingCity
        id="CircularSweepingCity"
        v-if="checkedLayerList.includes('CircularSweepingCity')"
    />
    <LineWall
        id="LineWall"
        v-if="checkedLayerList.includes('LineWall')"
    />
</template>

<script setup>
import ImgCluster2d from "./ImgCluster2d.vue"
import LineWall from "./LineWall2d.vue"
import CircularSweepingCity from "./CircularSweepingCity.vue"
import { useMapStore } from "@/store/map.js"
const mapStore = useMapStore()
const { checkedLayerList } = storeToRefs(mapStore)
</script>
<style scoped lang="less"></style>
