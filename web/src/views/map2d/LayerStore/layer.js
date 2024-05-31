import store from "@/store"
import { defineStore } from "pinia"

export const useLayerStore = defineStore({
    id: "LayerManager",
    state: () => ({
        CascaderAreaData: null,
        cascaderLayerStatus: true,
        loadedLayerNameList: [], // 处理图层的互斥事件
    }),
    getters: {},
    actions: {
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
