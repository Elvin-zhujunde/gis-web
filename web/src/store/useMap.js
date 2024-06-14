import store from "@/store"
import { defineStore } from "pinia"
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, onUnmounted } from "vue"
import { areaTree } from "@/views/Overview/CascadeRegion/cascaedArea.json"
export const useMapStore = defineStore({
    id: "MapManager",
    state: () => ({
        mapLoadStatus: false, // 地图加载状态 二三维通用，mapMode切换时置false
        mapMode: "3d", // 地图模式 2d 3d
        contextMenu: null, // 右键菜单

        modelCascaderList: [],
        maxLevel: 3,
        options: areaTree,

        CascaderAreaData: null,
        cascaderLayerStatus: true,
        loadedLayerNameList: [], // 处理图层的互斥事件
    }),
    getters: {},
    actions: {
        setXXX(xxx) {
            this.xxx = xxx
        },
        setMapMode(mapMode) {
            this.mapMode = mapMode
        },
        addloadedLayerNameList(val) {
            if (Array.isArray(val)) {
                val.forEach(item => {
                    if (!this.loadedLayerNameList.includes(item)) {
                        this.loadedLayerNameList.push(item)
                    }
                })
            }
            if (typeof val === "string") {
                if (this.loadedLayerNameList.includes(val)) return
                this.loadedLayerNameList.push(val)
            }
        },
        setloadedLayerNameList(val) {
            this.loadedLayerNameList = val
        },
        removeloadedLayerNameList(val) {
            this.loadedLayerNameList = this.loadedLayerNameList.filter(item => item !== val)
        },
    },
})
