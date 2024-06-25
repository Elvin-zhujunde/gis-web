// 2024 / 06 / 25 / 星期二 22 : 08 : 55
<template>
    <ImgCluster2d v-if="checkedLayerList.includes('imgcluster')" />
</template>

<script setup>
import ImgCluster2d from "./ImgCluster2d.vue"
import { useMapStore } from "@/store/map.js"
const mapStore = useMapStore()
const { checkedLayerList } = storeToRefs(mapStore)
</script>
<style scoped lang="less"></style>
