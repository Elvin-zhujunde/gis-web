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
                    @click="onChangeMapMode"
                >
                    {{ item.value }}
                </a-button>
                <span v-else>{{ item.value }}</span>
            </a-descriptions-item>
        </a-descriptions>
    </ul>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue"
import { useMapStore } from "@/store/useMap"
let currentCenter = ref("") //获取地图中心点
let currentZoom = ref("") //获取地图级别
let mapStore = useMapStore()

function onChangeMapMode() {
    mapStore.setMapMode(mapStore.mapMode === "2d" ? "3d" : "2d")
    mapStore.mapLoadStatus = false
}

onMounted(() => {
    if (mapStore.mapMode === "2d") {
        currentCenter.value = map.getCenter().toJSON() //获取地图中心点
        currentZoom.value = map.getZoom() //获取地图级别
        map.on("zoomend", function () {
            currentZoom.value = map.getZoom() //获取地图级别
        })
        map.on("moveend", function () {
            currentCenter.value = map.getCenter().toJSON() //获取地图中心点
        })
    }
})

onUnmounted(() => {
    if (mapStore.mapMode === "2d") {
    }
})
let column = computed(() => {
    if (mapStore.mapMode === "2d") {
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
    } else {
        return [
            {
                title: "地图模式",
                value: mapStore.mapMode,
            },
        ]
    }
})
</script>
<style scoped lang="less">
.map-control {
    color: #fff;
}
</style>
