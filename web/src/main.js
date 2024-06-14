import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import "@/styles/index.css"
import router from "./router/index"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
import "@/styles/index.less"

// import { init } from "./store/map"
// init()
const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(Antd)
app.mount("#app")
