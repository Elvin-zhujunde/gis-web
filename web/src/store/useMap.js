import store from "@/store"
import { defineStore } from "pinia"
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, onUnmounted } from "vue"

export const useMapStore = defineStore({
    id: "MapManager",
    state: () => ({
        mapLoadStatus: false, // 地图加载状态 二三维通用，mapMode切换时置false
        mapMode: "3d", // 地图模式 2d 3d
        contextMenu: null, // 右键菜单
    }),
    getters: {},
    actions: {
        setXXX(xxx) {
            this.xxx = xxx
        },
        setMapMode(mapMode) {
            this.mapMode = mapMode
        },
    },
})
