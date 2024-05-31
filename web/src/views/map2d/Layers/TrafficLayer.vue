<template></template>
<script setup>
import { useMapStore } from "@/Hooks/useMap.js"
const store = useMapStore()
onMounted(() => {})
</script>

<style scoped>
.traffic-layer {
    z-index: 5000;
}
</style>
