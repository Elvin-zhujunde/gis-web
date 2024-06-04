// 2024 / 03 / 28 / 星期四 19 : 52 : 10
<template>
    <div class="NotFound">
        <div class="content">
            <div class="img">
                <img
                    src="./404.png"
                    width="100%"
                    height="100%"
                    alt=""
                />
                <div class="text">网站维护中……</div>
                <div class="text">为了让您更好的使用系统，我们正在对服务器进行升级，升级期间暂时无法访问。</div>
                <div class="text">给您带来的不便，敬请谅解！</div>
            </div>
        </div>
    </div>
</template>

<script setup></script>
<script>
import { defineComponent } from "vue"

export default defineComponent({
    name: "NotFound",
})
</script>
<style scoped lang="less">
.NotFound {
    width: 100vw;
    height: 100vh;
    background: #000;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
            width: 20%;
            
        }
        .text {
            padding: 20px 0;
            text-align: center;
        }
    }
}


</style>
