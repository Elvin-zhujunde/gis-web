import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"

const routes = [
    {
        path: "/",
        redirect: "/overview",
    },
    {
        path: "/MarkdownEdit",
        name: "MarkdownEdit",
        component: () => import("@/pages/MarkdownEdit/MarkdownEdit.vue"),
        meta: {
            describe: "尝试md文件编辑器案例，可以删除",
        },
    },
    {
        path: "/threeAndCesium",
        name: "ThreeAndCesium",
        component: () => import("@/pages/ThreeAndCesium/ThreeAndCesium.vue"),
        meta: {
            describe: "尝试三维Cesium和Three结合的效果案例，可以删除",
        },
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("@/views/Login/Login.vue"),
    },
    {
        path: "/layout",
        component: () => import("@/views/Layout/Layout.vue"),
        children: [
            {
                path: "/overview",
                component: () => import("@/views/Overview/OverviewIndex.vue"),
                meta: {
                    title: "总览",
                    describe: "大屏展示",
                },
            },
        ],
    },

    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound/NotFound.vue"),
        meta: {
            title: "NotFound",
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, form, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router
export function getRoutes() {
    return routes
}
