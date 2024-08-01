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
        path: "/map-layout",
        component: () => import("@/views/Layout/MapLayout.vue"),
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
        path: "/layout",
        component: () => import("@/views/Layout/Layout.vue"),
        children: [
            {
                path: "/Tres",
                component: () => import("@/views/ThreeBuildHouse/index.vue"),
                meta: {
                    title: "智居搭",
                    describe: "智居搭",
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
