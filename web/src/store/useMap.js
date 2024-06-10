import store from "@/store"
import { defineStore } from "pinia"
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, onUnmounted } from "vue"

export const useMapStore = defineStore({
    id: "MapManager",
    state: () => ({
        mapLoadStatus: false,
        contextMenu: null,
        footermarkerPoi: {},
        mapMode: "2d",
        mapStateInfo2d: {},
        mapSateInfo3d: {},
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
