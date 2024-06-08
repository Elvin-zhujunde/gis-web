<template>
    <div
        ref="cesiumContainer"
        class="cesium-container"
    ></div>
    <router-view></router-view>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import * as turf from "@turf/turf"

let viewer
// import "cesium/Build/Cesium/Widgets/widgets.css" // 引入Cesium的CSS样式

// 引用Cesium核心库
// import * as Cesium from "cesium"

// 为Cesium Viewer创建一个容器引用
const cesiumContainer = ref(null)

// 定义初始化Cesium的方法
const initCesium = async () => {
    // 使用Cesium提供的Viewer来初始化一个地球
    viewer = new Cesium.Viewer(cesiumContainer.value, {
        // terrainProvider: await Cesium.CesiumTerrainProvider.fromUrl("//data.mars3d.cn/terrain", {
        //     requestWaterMask: true,
        //     requestVertexNormals: true,
        // }),
        terrain: Cesium.Terrain.fromWorldTerrain(), // 地形数据
        baseLayerPicker: false, // 隐藏底图切换器
        homeButton: false, // 隐藏返回视角按钮
        infoBox: false, // 隐藏信息框
        fullscreenButton: false, // 隐藏全屏按钮
        timeline: false, // 隐藏时间线控件
        animation: false, // 隐藏动画控件
        geocoder: false, // 隐藏右上角的搜索框（Geocoder）
        navigationHelpButton: false, // 隐藏帮助按钮
        scene3DOnly: true, // 如果true，则所有视图都将强制为3D视图
    })
    window.viewer = viewer // 将viewer对象挂载到window对象上，以便在控制台或其他地方访问
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
    viewer._cesiumWidget._creditContainer.style.display = "none"
    // 隐藏Cesium的版权信息
    if (viewer._cesiumWidget._creditContainer) {
        viewer._cesiumWidget._creditContainer.style.display = "none"
    }
    initChina(viewer)
    initHandle(viewer)
}
function initChina(viewer) {
    let geojsonDataSource = new Cesium.GeoJsonDataSource()
    geojsonDataSource
        .load("/json/china.json", {
            stroke: Cesium.Color.BLUE, // 轮廓颜色
            strokeWidth: 3.0, //获取或设置折线和多边形轮廓的默认宽度。
            fill: Cesium.Color.YELLOW.withAlpha(0.5), // 填充颜色，透明度为0.5
        })
        .then(function (dataSource) {
            // 将数据源添加到viewer中
            viewer.dataSources.add(dataSource)
            // 获取多边形实体
            let entities = dataSource.entities.values
            let billboards = new Cesium.BillboardCollection({
                scene: viewer.scene,
            })
            for (let i = 0; i < entities.length; ++i) {
                let entity = entities[i]
                const { name, center } = entity.properties.getValue()

                // let [lng, lat] = center
                // 自定义样式
                // entity.polygon.material.color = Cesium.Color.fromCssColorString(
                //     Math.floor(Math.random() * 256),
                //     Math.floor(Math.random() * 256),
                //     Math.floor(Math.random() * 256),
                //     0.5,
                // )
                // 其他样式设置...
                // entity.billboard = billboards.add({
                //     position: new Cesium.Cartesian3(lng, lat, 5), // 设置Billboard的位置
                //     // image: "path/to/your/billboard/image.png", // 设置Billboard的图片
                //     text: entity.properties.name._value, // 使用properties中的文字属性
                //     font: "14px sans-serif", // 设置字体
                //     // horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 设置水平原点
                //     // verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置垂直原点
                //     // pixelOffset: new Cesium.Cartesian2(0, -20), // 设置像素偏移量
                //     // eyeOffset: new Cesium.Cartesian3(0, 0, 0), // 设置视角偏移量
                //     color: Cesium.Color.BLUE, // 设置文字颜色
                // })
                // console.log(entity)
            }

            viewer.scene.primitives.add(billboards)
        })
}
function initHandle(viewer) {
    const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handle.setInputAction(function (click) {
        const pickedObject = viewer.scene.pick(click.position)

        const attr = pickedObject.primitive.getGeometryInstanceAttributes(pickedObject.id)
        const color = attr.color
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
