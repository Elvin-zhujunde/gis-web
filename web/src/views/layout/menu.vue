<template>
    <div class="menu-container">
        <div class="logo">{{ $config.homeTitle }}</div>
        <div class="search">
            <a-select
                v-model:value="searchState.value"
                mode="tags"
                style="width: 100%"
                placeholder="请输入"
                :options="searchState.options"
                @change="searchState.handleChange"
            ></a-select>
        </div>
        <div class="menu">
            <div
                class="menu-item"
                :class="{ active: route.path === menu.route }"
                v-for="menu in menuState.options"
                :key="menu.route"
                @click.stop="menuState.onClickMenu(menu)"
            >
                {{ menu.label }}
            </div>
        </div>
        <div class="author">
            <a-badge dot>
                <a-avatar>
                    <template #icon><UserOutlined /></template>
                </a-avatar>
            </a-badge>
        </div>
    </div>
</template>

<script setup>
import { UserOutlined } from "@ant-design/icons-vue"
import { usePlaceStore } from "@/store/place.js"
import $config from "@/const"
const route = useRoute()
const router = useRouter()

const placeStore = usePlaceStore()
console.log(route, "@@@@@@@@@@@@@@@@")
const searchState = reactive({
    current: {},
    options: [],
    handleChange(value) {
        console.log(value)
    },
})

const menuState = reactive({
    options: [
        {
            label: "大屏展示",
            dataIndex: "isShowLayerManger",
            route: "/overview",
        },
        {
            label: "图层管理",
            key: "isShowLayerManger",
            route: "/layers",
        },
    ],
    onClickMenu(menu) {
        router.replace({ path: menu.route })
    },
})
function handleMenuClick(e) {
    console.log(e)
}
</script>

<style lang="less" scoped>
.menu-container {
    height: 55px;
    background: #fff;
    border-bottom: 2px solid #5f5f5f;
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    .logo {
        flex-shrink: 0;
        padding: 0 10px;
        width: 160px;
        height: 100%;
        text-align: center;
        line-height: 55px;
        font-size: 18px;
        font-family: PangMenZhengDao;
    }
    .search {
        padding: 0 10px;
        width: 300px;
        min-width: 200px;
    }
    .menu {
        flex: 1;

        padding: 0 36px;
        display: flex;
        .menu-item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 12px;
            font-size: 18px;
            font-family: PangMenZhengDao;
            cursor: pointer;
            color: #4b4b4b;
            &.active {
                color: #000000;
                text-decoration: underline;
            }
        }
    }
    .author {
        display: flex;
        justify-content: end;
        width: 200px;
        padding: 0 20px;
    }
}
</style>
