<template>
    <a-tree
        v-model:checkedKeys="checkedLayerList"
        checkable
        :tree-data="layerTreeData"
    >
        <template #title="{ title, key }">
            <span
                v-if="key === '0-0'"
                style="color: #1890ff"
            >
                {{ title }}
            </span>
            <template v-else>{{ title }}</template>
        </template>
    </a-tree>
</template>
<script setup>
import { useMapStore } from "@/store/map.js"
import { storeToRefs } from "pinia"
import { watch } from "vue"
const mapStore = useMapStore()
const {
    layerTreeData, //
    checkedLayerList,
} = storeToRefs(mapStore)

watch(checkedLayerList, (val) => {
    console.log(val)
})
</script>
