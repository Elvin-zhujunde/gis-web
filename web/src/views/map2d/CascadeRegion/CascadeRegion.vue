<template>
    <a-cascader
        v-model:value="modelCascaderList"
        :options="cascaderState.options"
        style="width: 100%"
        expand-trigger="hover"
        :field-names="{ value: 'code' }"
        :getPopupContainer="(triggerNode) => triggerNode.parentNode.parentNode"
        change-on-select
        placeholder="请输入区划"
    >
        <template #displayRender="{ labels, selectedOptions }">
            <span
                v-for="(label, index) in labels"
                :key="selectedOptions[index].value"
            >
                <span v-if="index === labels.length - 1">
                    {{ label }} (
                    <a @click="e => handleAreaClick(e, label, selectedOptions[index])">
                        {{ selectedOptions[index].code }}
                    </a>
                    )
                </span>
                <span v-else>{{ label }} /</span>
            </span>
        </template>
    </a-cascader>
</template>
<script setup>
import { useCascaderStore } from "./cascaedArea.store"
const cascaderState = useCascaderStore()
import { useLayerStore } from "@/views/map2d/LayerStore/layer.js"
import { storeToRefs } from "pinia"

const LayerStore = useLayerStore()
const { modelCascaderList } = storeToRefs(cascaderState)
function handleAreaClick(e, label, option) {
    e.stopPropagation()
    console.log("clicked", label, option)
}

watch(modelCascaderList, async val => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@", val)
    if (!val) {
        LayerStore.CascaderAreaData = null
        return
    }
    let adcode = val[val.length - 1]
    let res = await (await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`, {})).json()
    LayerStore.CascaderAreaData = res
})
</script>
