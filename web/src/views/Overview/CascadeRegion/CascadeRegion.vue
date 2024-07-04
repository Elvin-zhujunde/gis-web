<template>
    <a-cascader
        v-model:value="cascader_vmodel"
        :options="mapStore.cascader_option_source"
        style="width: 100%"
        @change="onTreeSelectChange"
        expand-trigger="hover"
        :field-names="{ value: 'code' }"
        :getPopupContainer="triggerNode => triggerNode.parentNode"
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
                    <a @click.stop="() => {}">
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
import { storeToRefs } from "pinia"
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()
const { cascader_vmodel } = storeToRefs(mapStore)

function onTreeSelectChange(value, label, extra) {
    console.log(value, label, extra)
}
watch(cascader_vmodel, async val => {
    if (!val) {
        mapStore.cascaer_geo_data = null
        return
    }
    let adcode = val[val.length - 1]
    mapStore.current_cascader = {
        level: val.length,
        adcode,
    }
})

watch(
    () => mapStore.current_cascader,
    async ({ adcode, level }) => {
        mapStore.cascaer_geo_data = await fetch(`http://121.36.68.180:4000/geojson/${adcode}.json`, {}).then(res =>
            res.json(),
        )
    },
)
</script>
