<template></template>
<script setup>
import { useMapStore } from "@/store/map.js"
const store = useMapStore()
var marker = new AMap.Marker({
    position: [114.3, 30.59],
    // 将 html 传给 content
    content: `
        <img
            width="50px"
            height="50px"
            src="${"https://img.zcool.cn/community/01a3a2599c3deba80121ad7b597cab.jpg@1280w_1l_2o_100sh.jpg"}"
        />
    `,
    // 以 icon 的 [center bottom] 为原点
    offset: new AMap.Pixel(-13, -30),
})

// 将 markers 添加到地图
map.add(marker)
onMounted(() => {})
</script>

<style scoped>
.traffic-layer {
    z-index: 5000;
}
</style>
