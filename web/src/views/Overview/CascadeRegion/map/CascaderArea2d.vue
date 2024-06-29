<template></template>
<script setup>
import * as turf from "@turf/turf"
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()

let GEOJSON_LAYER = null

function removeLayer() {
    GEOJSON_LAYER?.clearOverlays()
    GEOJSON_LAYER = null
}
function createLayer(geojson) {
    createAreaLayer(geojson)
}

function createAreaLayer(geojson) {
    // 加载AMap.GeoJSON插件

    AMap.plugin("AMap.GeoJSON", function () {
        // 创建GeoJSON图层
        GEOJSON_LAYER = new AMap.GeoJSON({
            zoomToExtent: true,
            geoJSON: geojson,
            // 定义点的样式
            getMarker: function (geojson, lnglats) {
                const { properties } = geojson
                // 创建Marker
                return new AMap.Marker({
                    position: lnglats, // 点的经纬度
                    offset: new AMap.Pixel(-10, -10),
                    title: properties?.name,
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
                    const cascaderValue = [...geo.properties.acroutes, Number(geo.properties.adcode)]
                    if (cascaderValue.length > mapStore.cascader_max_level) {
                        alert("已达到最大层级")
                        return
                    }
                    mapStore.cascader_vmodel = cascaderValue
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
    map.setZoomAndCenter(zoom - 0.5, [lng, lat])
}

function getAreaCenter(geojson) {
    return {
        type: "FeatureCollection",
        features: geojson.features.map(i => {
            const { properties } = i
            return {
                type: "Feature",
                properties,
                geometry: {
                    coordinates: properties.center,
                    type: "Point",
                },
            }
        }),
    }
}
watch(
    () => mapStore.cascaer_geo_data,
    val => {
        if (!val) {
            removeLayer()
            return
        }
        GEOJSON_LAYER ? GEOJSON_LAYER.importData(val) : createLayer(val)
        fitView(val)
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
