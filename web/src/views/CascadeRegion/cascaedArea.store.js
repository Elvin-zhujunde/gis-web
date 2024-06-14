import store from "@/store"
import { defineStore } from "pinia"
import { areaTree } from "./cascaedArea.json"

export const useCascaderStore = defineStore({
    id: "CascaderStore",
    state: () => ({
        modelCascaderList: [],
        maxLevel: 3,
        options: areaTree,
    }),
    getters: {},
    actions: {},
})
