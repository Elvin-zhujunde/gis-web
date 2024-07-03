import store from "@/store"
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, onUnmounted } from "vue"
import { areaTree } from "@/views/Overview/CascadeRegion/cascaedArea.json"
export const useMapStore = defineStore("MapManger", () => {
    const mapLoadStatus = ref(false) // 地图加载状态 二三维通用，mapMode切换时置false
    const mapMode = ref("2d") // 地图模式 2d 3d
    const flyPoi = ref(null)
    const flyArea = ref(null)
    const contextMenu = ref(null) // 2d 右键菜单

    // 行政区划
    const cascader_vmodel = ref([]) // overview - 行政区划选择树绑定值
    const current_cascader = ref(null) // overview - 当前行政区划
    const cascader_max_level = ref(3) // overview - 行政区划选择树绑定值数组length最大值，用来限制选择树的最大层级
    const cascader_option_source = ref(areaTree) // 行政区划选择树的数据源
    const cascaer_geo_data = ref(null)

    // 图层树
    const layerTreeData = ref([
        {
            key: "1",
            title: "随机",
            children: [
                {
                    key: "randomPoint",
                    title: "随机点图层",
                    disabled: computed(() => mapMode.value == "2d"),
                },
                {
                    key: "randomPolygon",
                    title: "随机面图层",
                    disabled: computed(() => mapMode.value == "2d"),
                },
            ],
        },
        {
            key: "antv-l7",
            title: "antv-l7",
            disabled: computed(() => mapMode.value == "3d"),
            children: [
                {
                    key: "CircularSweepingCity",
                    title: "圆形扫光城市",
                    disabled: computed(() => mapMode.value == "3d"),
                },
                {
                    key: "LineWall",
                    title: "光墙",
                    disabled: computed(() => mapMode.value == "3d"),
                },
            ],
        },
    ])
    const checkedLayerList = ref([]) // 选中的图层
    const loadedLayerMap = ref(new Map()) // 加载的图层
    function setMapMode(mode) {
        mapMode.value = mode
    }
    return {
        mapLoadStatus,
        mapMode,
        flyPoi,
        flyArea,
        contextMenu,
        cascader_vmodel,
        current_cascader,
        cascader_max_level,
        cascader_option_source,
        cascaer_geo_data,
        layerTreeData,
        checkedLayerList,
        loadedLayerMap,
        setMapMode,
    }
})
