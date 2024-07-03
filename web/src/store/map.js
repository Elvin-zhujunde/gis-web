import store from "@/store"
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, onUnmounted } from "vue"
import { areaTree } from "@/views/Overview/CascadeRegion/cascaedArea.json"
export const useMapStore = defineStore({
    id: "MapManager",
    state: () => ({
        mapLoadStatus: false, // 地图加载状态 二三维通用，mapMode切换时置false
        mapMode: "3d", // 地图模式 2d 3d
        flyPoi: null,
        flyArea: null,
        contextMenu: null, // 2d 右键菜单

        // 行政区划
        cascader_vmodel: [], // overview - 行政区划选择树绑定值
        current_cascader: null, // overview - 当前行政区划
        cascader_max_level: 3, // overview - 行政区划选择树绑定值数组length最大值，用来限制选择树的最大层级
        cascader_option_source: areaTree, // 行政区划选择树的数据源
        cascaer_geo_data: null,

        // 图层树
        layerTreeData: [
            {
                key: "1",
                title: "随机",
                children: [
                    {
                        key: "randomPoint",
                        title: "随机点图层",
                    },
                    {
                        key: "randomPolygon",
                        title: "随机面图层",
                    },
                ],
            },
        ],
        checkedLayerList: [], // 选中的图层
        loadedLayerMap: new Map(), // 加载的图层
    }),
    getters: {},
    actions: {
        setMapMode(mapMode) {
            this.mapMode = mapMode
        },
    },
})
