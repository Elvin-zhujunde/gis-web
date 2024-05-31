import store from "@/store"
import { defineStore } from "pinia"

export const usePlaceStore = defineStore({
    id: "PlaceManager",
    state: () => ({
        // 图层管理
        isShowLayerManger: true,
        // 聚合足迹图层
        isShowFootLayer: false,
        // 添加足迹drawer
        isShowFooterMarkerAdd: false,
    }),
    getters: {},
    actions: {},
})

export function usePlaceStoreWithOut() {
    return usePlaceStore(store)
}
