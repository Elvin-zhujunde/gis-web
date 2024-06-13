// 2024 / 06 / 13 / 星期四 15 : 49 : 06
<template>
    <Map3dLayout>
        <CascaderArea3d></CascaderArea3d>
    </Map3dLayout>
    <router-view></router-view>
</template>

<script setup>
import Map3dLayout from "@/views/map3d/map3d-layout.vue"

import CascaderArea3d from "./components/CascaderArea3d.vue"
</script>
<style scoped lang="less"></style>
