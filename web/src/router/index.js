import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"

const routes = [
    {
        path: "/",
        redirect: "/overview3d",
    },
    {
        path: "/MarkdownEdit",
        name: "MarkdownEdit",
        component: () => import("@/views/MarkdownEdit/MarkdownEdit.vue"),
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("@/views/Login/Login.vue"),
    },
    {
        path: "/layout",
        component: () => import("@/views/layout/layout.vue"),
        children: [
            // {
            //     path: "/map2d",
            //     component: () => import("@/views/map2d/index.vue"),
            //     children: [],
            //     redirect: "/layers",
            // },
            {
                path: "/layers",
                component: () => import("@/views/map2d/LayerStore/index.vue"),
                meta: {
                    title: "Place",
                    describe: "记录我关于地点的图层",
                },
            },
            {
                path: "/overview2d",
                component: () => import("@/views/Overview/OverviewIndex.vue"),
                meta: {
                    title: "总览",
                    describe: "大屏展示",
                },
            },
            {
                path: "/overview3d",
                component: () => import("@/views/map3d/index.vue"),
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
