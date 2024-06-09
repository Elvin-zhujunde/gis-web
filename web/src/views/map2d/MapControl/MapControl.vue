// 2024 / 06 / 08 / 星期六 14 : 49 : 31
<template>
    <ul class="map-control">
        <li
            class="map-control_item"
            v-for="item in column"
            :key="item.title"
        >
            <a-button type="text">{{ mapStore.mapMode }}</a-button>
        </li>
    </ul>
</template>

<script setup>
import { useMapStore } from "../../../store/useMap"

const column = computed(() => {
    const currentCenter = map && map.getCenter().toJSON() //获取地图中心点

    return [
        {
            title: "地图模式",
            value: mapStore.mapMode,
        },
        {
            title: "中心点",
            value: currentCenter || "",
        },
    ]
})

const mapStore = useMapStore()
</script>
<style scoped lang="less">
.map-control {
    width: 50px;
    height: 300px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 0 10px #000;
    position: absolute;
    bottom: 10px;
    right: 420px;
    z-index: 1000;
}
</style>
