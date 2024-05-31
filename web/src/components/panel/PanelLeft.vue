<template>
    <div
        class="main-left-panel"
        :class="{ activeScreen: bigScreen }"
    >
        <div class="overview-structure-header">
            <slot name="header"></slot>
        </div>

        <div class="overview-structure-panel">
            <slot></slot>
        </div>
        <div class="overview-structure-corner">
            <slot name="corner"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const bigScreen = ref(false)
// export default {
//     name: "MainLeftPanel",
//     computed: {},
// }
</script>
<style lang="less" scoped>
.main-left-panel {
    position: fixed;
    left: 0;
    top: 55px;
    z-index: 50;
    width: 400px;
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    // background: linear-gradient(270deg, rgba(0, 9, 40, 0.532) 0%, rgba(0, 9, 40, 0.366) 100%);
    background: rgba(255, 255, 255, 1);
    &.activeScreen {
        top: 10px;
        height: calc(100vh - 80px);
    }
    z-index: 10;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 8px;
}
.overview-structure-header {
    position: relative;
}
.overview-structure-corner {
    position: absolute;
    left: 410px;
    bottom: 10px;
    z-index: 10;
}
.overview-structure-panel {
    flex-grow: 1;
    height: 0;
}
</style>
