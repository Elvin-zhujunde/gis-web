// 2024 / 04 / 05 / 星期五 07 : 24 : 08
<template>
    <div id="map-container"></div>
</template>
<script setup>
import { useMapStore } from "@/store/map"

const mapStore = useMapStore()
const props = defineProps({
    id: {
        type: String,
        default: "main",
    },
})
onMounted(async () => {
    window.map = await new AMap.Map("map-container", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 4, //初始化地图级别
        // center: [114.3, 30.59], //初始化地图中心点位置
        center: [104.2990125, 28.480215434999998], //初始化地图中心点位置
        // pitch: 50,
        // rotation: -15,
        resizeEnable: true,
    })
    map.setMapStyle("amap://styles/dark")

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
    })
    // 清除 marker
    function clearMarker() {
        map.remove(marker)
    }
    map.on("complete", function () {
        mapStore.mapLoadStatus = true
    })
})
onUnmounted(async () => {
    map && map.destroy()
})
// const changeMap = (x, y) => {
//     let position = new map.AMap.LngLat(x, y) // 标准写法
//     state.map.setCenter(position)
//     state.map.setZoom(13)
// }
</script>
<style lang="less" scoped>
#map-container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    z-index: 0;
}
</style>
