// 2024 / 06 / 28 / 星期五 23 : 01 : 47
<template>
    <video
        id="video"
        style="display: none"
        controls
        loop
        autoplay
    >
        <source
            src="/assets/video/roubao.mp4"
            type="video/mp4"
        />
    </video>
</template>

<script setup>
import { getGeojsonById } from "@/api"
import { useMapStore } from "@/store/map"
const mapStore = useMapStore()
let DATA_SOURCE = null
const props = defineProps({
    id: {
        type: String,
        default: "",
        require: true,
    },
})

onBeforeUnmount(() => {})
onMounted(async () => {
    // 先添加监控画面
    let videoEl = document.getElementById("video")
    let pArr = [109.60910111696789, 18.309289035270666, 28, 109.60898627528759, 18.309268212123328, 28]
    let instance = new Cesium.GeometryInstance({
        geometry: new Cesium.WallGeometry({
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(pArr),
            minimumHeights: [23, 23],
        }),
    })
    let material = Cesium.Material.fromType("Image")
    material.uniforms.image = videoEl
    let [x, y, z] = [109.60910111696789, 18.309289035270666, 28]
    mapStore.flyPoi = { x, y, z }
    let tileset = viewer.scene.primitives.add(
        new Cesium.Primitive({
            id: "video",
            geometryInstances: instance,
            appearance: new Cesium.MaterialAppearance({
                closed: false,
                material: material,
            }),
            show: true,
        }),
    )
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction(function (e) {
        //  选取实体类
        let pointDraged = viewer.scene.pick(e.position)
        let el = document.getElementById("pbubble")
        if (pointDraged) {
            switch (pointDraged.id.id) {
                case "sxt0":
                    viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(
                            _this.mydata.camera[0].position[0],
                            _this.mydata.camera[0].position[1],
                            _this.mydata.camera[0].position[2],
                        ),
                        orientation: {
                            heading: Cesium.Math.toRadians(_this.mydata.camera[0].heading), // 方向
                            pitch: Cesium.Math.toRadians(_this.mydata.camera[0].pitch), // 倾斜角度
                            roll: 0.0,
                        },
                        duration: 2,
                    })
                    viewer.scene.primitives.get(2).show = !viewer.scene.primitives.get(2).show
                    break
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
})
</script>
<style scoped lang="less"></style>
