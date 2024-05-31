import store from "@/store"
import { defineStore } from "pinia"
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, onUnmounted } from "vue"

export const useMapStore = defineStore({
    id: "MapManager",
    state: () => ({
        mapLoadStatus: false,
        loadedMaps: [],
        contextMenu: null,
        footermarkerPoi: {},
        mapMode: "2d",
        mapStateInfo2d: {},
        mapSateInfo3d: {},
    }),
    getters: {},
    actions: {
        getMap(id) {
            const mapItem = this.loadedMaps.find(item => item.id === id)
            return mapItem ? mapItem.map : null
        },
        destroyMap(id) {
            const mapItem = this.loadedMaps.find(item => item.id === id)
            mapItem && mapItem.map.destroy()
            this.loadedMaps = this.loadedMaps.filter(item => item.id !== id)
        },
        setXXX(xxx) {
            this.xxx = xxx
        },
    },
})

export async function useMap(id = "main", opt) {
    const mapStore = useMapStore()
    const mapItem = mapStore.getMap(id)
    if (mapItem) return mapItem
    onMounted(async () => {
        const map = await new AMap.Map(opt.container, {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 4, //初始化地图级别
            // center: [114.3, 30.59], //初始化地图中心点位置
            center: [104.2990125, 28.480215434999998], //初始化地图中心点位置
            // pitch: 50,
            // rotation: -15,
            resizeEnable: true,
        })
        AMap.plugin(
            ["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye", "AMap.MapType", "AMap.Geolocation", "AMap.ControlBar"],
            function () {
                //添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                // map.addControl(new AMap.ToolBar())

                //添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale())

                //添加鹰眼控件，在地图右下角显示地图的缩略图
                // map.addControl(new AMap.HawkEye({ isOpen: true }))

                //添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                // map.addControl(new AMap.MapType())

                //添加定位控件，用来获取和展示用户主机所在的经纬度位置
                // map.addControl(new AMap.Geolocation())

                //添加控制罗盘控件，用来控制地图的旋转和倾斜
                // map.addControl(new AMap.ControlBar())
            },
        )
        mapStore.contextMenu = new AMap.ContextMenu()

        map.on("rightclick", function (e) {
            mapStore.footermarkerPoi = e.lnglat
            mapStore.contextMenu && mapStore.contextMenu.open(map, e.lnglat)
        })
        // 清除 marker
        function clearMarker() {
            map.remove(marker)
        }
        map.on("complete", function () {
            opt["onload"] && opt["onload"](map)
            console.log("地图加载完成！", {
                id: id,
                map: map,
                container: opt.container,
            })
            mapStore.mapLoadStatus = true
        })

        mapStore.loadedMaps.push({
            id: id,
            map: map,
            container: opt.container,
        })
    })
    onUnmounted(async () => {
        mapStore.destroyMap(id)
    })
}
