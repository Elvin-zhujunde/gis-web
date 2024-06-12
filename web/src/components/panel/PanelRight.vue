<template>
    <div class="main-right-panel">
        <div class="growthTrend-type-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "MainRightPanel",
}
</script>
<style lang="less" scoped>
.main-right-panel {
    position: fixed;
    right: 0;
    top: 55px;
    z-index: 50;
    width: 400px;
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
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
.growthTrend-type-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    // background: #fff;
    // .box-border-background-style();
}
</style>
