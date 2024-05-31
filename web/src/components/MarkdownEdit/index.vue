<template>
    <md-editor
        v-model="state.value"
        :editorId="state.editorId"
        :theme="theme"
        :language="language"
        :previewTheme="state.previewTheme"
        :codeTheme="state.codeTheme"
        :noImgZoomIn="true"
        :autofocus="true"
        :read-only="state.readOnly"
        :style="state.mStyle"
        :toolbarsExclude="state.toolbarsExclude"
        @save="save"
        @upload-img="uploadImg"
    />
</template>

<script setup>
import { MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"

const state = reactive({
    value: '',
    editorId: "markRaw_MdEditor",
    previewTheme: "default",
    codeTheme: "atom",
    readOnly: false,
    contentWidth: 180,
    mStyle: { height: "100vh" },
    toolbarsExclude: ["htmlPreview", "codeRow", "code", "unorderedList", "orderedList", "quote"],
    modelValue: "",
})

// markdown内容
const emit = defineEmits(["update:modelValue", "save", "uploadImg"])
// const value = computed({
//     get() {
//         return state.modelValue
//     },
//     set(value) {
//         emit("update:modelValue", value)
//     },
// })

// const themeStore = useThemeStore()
// 颜色主题
const theme = computed(() => {
    // if (themeStore.isDark) return "dark"
    return "light"
})

// 语言
const language = computed(() => {
    // if (themeStore.language === "en") return "en-US"
    return "zh-CN"
})

// 保存
const save = (text, h) => {
    // emit("save", text, h)
}
// 上传文件
const uploadImg = async (files, callBack) => {
    const res = await Promise.all(
        files.map(file => {
            return new Promise((rev, rej) => {
                const form = new FormData()
                form.append("file", file)
                const params = state.methodParams
                if (params) {
                    Object.keys(params).map(item => {
                        if (params.hasOwn(item)) {
                            form.append(item, params[item])
                        }
                    })
                }
                const method = state.uploadImgMethod
                if (method) {
                    method(params)
                        .then(res => {
                            rev(res)
                        })
                        .catch(error => {
                            rej(error)
                        })
                }
            })
        }),
    )

    callBack(res.map(item => item.data.url))
    emit("uploadImg", res)
}
</script>
