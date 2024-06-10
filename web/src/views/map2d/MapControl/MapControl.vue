// 2024 / 06 / 08 / 星期六 14 : 49 : 31
<template>
    <ul class="map-control">
        <a-descriptions title="">
            <a-descriptions-item
                :span="3"
                :labelStyle="{ width: '80px', color: '#fff' }"
                :contentStyle="{ color: '#fff' }"
                :label="item.title"
                v-for="item in column"
                :key="item.title"
            >
                <a-button
                    v-if="item.title === '地图模式'"
                    ghost
                    size="small"
                    @click="mapStore.setMapMode(mapStore.mapMode === '2d' ? '3d' : '2d')"
                >
                    {{ item.value }}
                </a-button>
                <span v-else>{{ item.value }}</span>
            </a-descriptions-item>
        </a-descriptions>
    </ul>
</template>

<script setup>
import { computed } from "vue"
import { useMapStore } from "../../../store/useMap"
let currentCenter = ref(map.getCenter().toJSON()) //获取地图中心点
let currentZoom = ref(map.getZoom()) //获取地图级别
let mapStore = useMapStore()
map.on("zoomend", function () {
    currentZoom.value = map.getZoom() //获取地图级别
})
map.on("moveend", function () {
    currentCenter.value = map.getCenter().toJSON() //获取地图中心点
})
let column = computed(() => {
    return [
        {
            title: "地图模式",
            value: mapStore.mapMode,
        },
        {
            title: "地图中心",
            value: currentCenter.value || "",
        },
        {
            title: "地图级别",
            value: currentZoom.value || "",
        },
    ]
})
</script>
<style scoped lang="less">
.map-control {
    color: #fff;
}
</style>
