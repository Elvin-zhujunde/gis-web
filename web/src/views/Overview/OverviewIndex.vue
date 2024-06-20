<template>
    <PanelLeft>
        <Panel>
            <template #header>
                <BoxPanel title="行政区划">
                    <CascadeRegion></CascadeRegion>
                </BoxPanel>
            </template>
            <template #default>
                <BoxPanel title="图层">
                    <LayerTree></LayerTree>
                </BoxPanel>
            </template>
            <template #footer>
                <BoxPanel title="地图控制">
                    <MapControl v-if="mapStore.mapLoadStatus"></MapControl>
                </BoxPanel>
            </template>
        </Panel>
    </PanelLeft>
    <PanelRight>
        <BoxPanel
            style="height: 50%"
            title="三维无效的话切换一下底图 --->"
        >
            <Pie
                id="pie_type"
                :options="state.options"
                :colors="state.colors"
                :itemBorderWidth="0"
                :showTitle="true"
                :total="state.total"
                titleText="事件类型"
            />
        </BoxPanel>
        <BoxPanel
            style="height: 50%"
            title="234"
        >
            <MixLineBar></MixLineBar>
        </BoxPanel>
    </PanelRight>
</template>

<script setup>
import PanelLeft from "@/components/panel/PanelLeft.vue"
import PanelRight from "@/components/panel/PanelRight.vue"
import Panel from "@/components/Panel/AutoHightPanel.vue"
import BoxPanel from "@/components/Panel/BoxPanel.vue"
import Pie from "@/components/echarts/pie/pie_1/index.vue"
import MixLineBar from "@/components/echarts/MixLineBar.vue"
import CascadeRegion from "./CascadeRegion/CascadeRegion"
import LayerTree from "./LayerTree/LayerTree.vue"
import MapControl from "./MapControl/MapControl.vue"
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()

const state = reactive({
    options: [
        {
            name: "人口",
            value: 1,
        },
        {
            name: "房屋",
            value: 2,
        },
        {
            name: "企业",
            value: 3,
        },
        {
            name: "地址",
            value: 4,
        },
        {
            name: "事件",
            value: 4,
        },
    ],
    colors: ["#F09E43", "#51ffef", "#2443BF", "#BF4773", "#4AA2FF", "#C6DE63", "#5BB1FF"],
})

watch(
    () => mapStore.current_cascader,
    () => {
        state.options = state.options.map(i => {
            return {
                name: i.name,
                value: Math.floor(Math.random() * 10000),
            }
        })
    },
)
</script>
<style lang="less" scoped>
.panel-left-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.box-panel {
}
.pie {
    height: 40vh;
}
.mix-line-bar {
    height: 40vh;
}
</style>
