<template></template>
<script setup>
import { useMapStore } from "@/store/useMap.js"
import { useLayerStore } from "@/views/map2d/LayerStore/layer.js"
import { useCascaderStore } from "../cascaedArea.store"
import * as turf from "@turf/turf"
const store = useMapStore()
const layer = useLayerStore()
const cascaderState = useCascaderStore()
let GEOJSON_LAYER = null
onMounted(() => {
    // store.addLayer({
    //     id: "foot-maker-layer",
    //     name: "FootMaker",
    //     layer: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //         maxZoom: 19,
    //         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //     }),
    // })
})
function onClickMap(e) {
    console.log(e)
}
function removeLayer() {
    GEOJSON_LAYER && GEOJSON_LAYER.clearOverlays()
    GEOJSON_LAYER = null
}
function createLayer(geojson) {
    // 加载AMap.GeoJSON插件
    AMap.plugin("AMap.GeoJSON", function () {
        // 创建GeoJSON图层
        GEOJSON_LAYER = new AMap.GeoJSON({
            zoomToExtent: true,
            geoJSON: geojson,
            // 定义点的样式
            getMarker: function (geojson, lnglats) {
                // 创建Marker
                return new AMap.Marker({
                    position: lnglats[0], // 点的经纬度
                    // 其他Marker配置...
                })
            },
            // 定义线的样式
            getPolyline: function (geojson, lnglats) {
                // 创建Polyline
                return new AMap.Polyline({
                    path: lnglats, // 线的经纬度数组
                    // 其他Polyline配置...
                })
            },
            // 定义面的样式
            getPolygon: function (geo, lnglats) {
                // 创建Polygon
                // const opacity = Math.sqrt(turf.area(geo) / 9549068848337.762)
                const polygon = new AMap.Polygon({
                    path: lnglats, // 面的经纬度数组
                    // 其他Polygon配置...
                    fillOpacity: 0, // 面积越大透明度越高
                    strokeColor: "gray",
                    fillColor: "white",
                    fitView: true,
                })
                polygon.on("mouseover", () => {
                    polygon.setOptions({
                        fillOpacity: 0.7,
                        fillColor: "white",
                    })
                })
                polygon.on("click", () => {
                    const cascaderValue = [...geo.properties.acroutes, geo.properties.adcode]
                    if (cascaderValue.length > cascaderState.maxLevel) {
                        alert("已达到最大层级")
                        return
                    }
                    cascaderState.modelCascaderList = cascaderValue
                })
                polygon.on("mouseout", () => {
                    polygon.setOptions({
                        fillOpacity: 0,
                        fillColor: "#white",
                    })
                })
                return polygon
            },
        })
        map.add(GEOJSON_LAYER) // 将GeoJSON图层添加到地图上
    })
}
function fitView(geojson) {
    if (!geojson) return
    const [zoom, { lng, lat }] = map.getFitZoomAndCenterByBounds(turf.bbox(geojson))
    const center = turf.center(geojson)
    console.log({
        zoom,
        lng,
        lat,
    })
    map.setZoomAndCenter(zoom - 0.5, [lng, lat])
}

watch(
    () => layer.CascaderAreaData,
    val => {
        // removeLayer()
        if (val) {
            GEOJSON_LAYER ? GEOJSON_LAYER.importData(val) : createLayer(val)
            fitView(val)
        } else {
            removeLayer()
        }
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>

<style scoped>
.traffic-layer {
    z-index: 5000;
}
</style>
