<template>
    <div
        ref="cesiumContainer"
        class="cesium-container"
    ></div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import * as turf from "@turf/turf"
import { useMapStore } from "../../store/useMap"
Cesium.Ion.defaultAccessToken =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjFhOGQ5My0zNjc4LTRhNzUtODgyMC02Y2UwNzE0Y2UyM2IiLCJpZCI6MjExNTEwLCJpYXQiOjE3MTQxMjI4ODR9.f4FQYls56qNjRQvoQpKFeMOO0yewLxp0oU4oq9AM9pg"
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMGZjMTZjMC00YTQ4LTQwODAtOTg5YS1lOWU2NThjMTk0YjMiLCJpZCI6MjExNTEwLCJpYXQiOjE3MTQxMjIzNDZ9.o5yDodfaExKiDdc9mN0N86ybB3l2K4ggAThC3SWURkE"
let viewer
// import "cesium/Build/Cesium/Widgets/widgets.css" // 引入Cesium的CSS样式

// 引用Cesium核心库
// import * as Cesium from "cesium"

// 为Cesium Viewer创建一个容器引用
const cesiumContainer = ref(null)
const mapStore = useMapStore()
// 定义初始化Cesium的方法
const initCesium = async () => {
    // 使用Cesium提供的Viewer来初始化一个地球
    viewer = new Cesium.Viewer(cesiumContainer.value, {
        // terrainProvider: await Cesium.CesiumTerrainProvider.fromUrl("//data.mars3d.cn/terrain", {
        //     requestWaterMask: true,
        //     requestVertexNormals: true,
        // }),
        // terrain: Cesium.Terrain.fromWorldTerrain(), // 地形数据
        baseLayerPicker: true, // 隐藏底图切换器
        homeButton: false, // 隐藏返回视角按钮
        infoBox: false, // 隐藏信息框
        fullscreenButton: false, // 隐藏全屏按钮
        timeline: false, // 隐藏时间线控件
        animation: false, // 隐藏动画控件
        geocoder: false, // 隐藏右上角的搜索框（Geocoder）
        navigationHelpButton: false, // 隐藏帮助按钮
        // scene3DOnly: false, // 如果true，则所有视图都将强制为3D视图
        // animate: false, // 表示不自动播放场景。
        // navigationInstructionsInitiallyVisible:false,//初始时不显示导航指令。
    })
    window.viewer = viewer // 将viewer对象挂载到window对象上，以便在控制台或其他地方访问

    viewer._cesiumWidget._creditContainer.style.display = "none"
    // 隐藏Cesium的版权信息
    if (viewer._cesiumWidget._creditContainer) {
        viewer._cesiumWidget._creditContainer.style.display = "none"
    }

    // 设置初始视角，这里以美国某个位置为例
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(114.3, 30.59, 8000000),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0,
            distance: 1000,
        },
    })
    initChina(viewer)
    initHandle(viewer)
    mapStore.mapLoadStatus = true

}
function initChina(viewer) {
    let geojsonDataSource = new Cesium.GeoJsonDataSource()
    geojsonDataSource
        .load("/json/world.json", {
            stroke: Cesium.Color.BLUE, // 轮廓颜色
            strokeWidth: 10.0, //获取或设置折线和多边形轮廓的默认宽度。
            fill: Cesium.Color.WHITE.withAlpha(0), // 填充颜色，透明度为0.5
        })
        .then(function (dataSource) {
            // 将数据源添加到viewer中
            viewer.dataSources.add(dataSource)
            // 获取多边形实体
            let billboards = new Cesium.BillboardCollection({
                scene: viewer.scene,
            })

            viewer.scene.primitives.add(billboards)
        })
}
function initHandle(viewer) {
    const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handle.setInputAction(function (click) {
        const pickedObject = viewer.scene.pick(click.position)
        debugger
        // const attr = pickedObject.primitive.getGeometryInstanceAttributes(pickedObject.id)
        // const color = attr.color
        // 处理点击事件
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handle.setInputAction(function (movement) {
        const pickedObject = viewer.scene.pick(movement.endPosition)
        // 处理移动事件
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}
function destroyCesium() {
    viewer && viewer.destroy()
}

function createBillboard(geojson) {
    turf.center
}
// 组件挂载后初始化Cesium
onMounted(initCesium)
onBeforeMount(destroyCesium)
</script>

<style scoped>
.cesium-container {
    width: 100%;
    height: 100%;
}
</style>
