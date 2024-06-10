<template>
    <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        :tree-data="treeData"
    >
        <template #title="{ title, key }">
            <span
                v-if="key === '0-0-1-0'"
                style="color: #1890ff"
            >
                {{ title }}
            </span>
            <template v-else>{{ title }}</template>
        </template>
    </a-tree>
</template>
<script setup>
import { ref, watch } from "vue"
const treeData = [
    {
        title: "parent 1",
        key: "0-0",
        children: [],
    },
]
const expandedKeys = ref(["0-0-0", "0-0-1"])
const selectedKeys = ref(["0-0-0", "0-0-1"])
const checkedKeys = ref(["0-0-0", "0-0-1"])
watch(expandedKeys, () => {
    console.log("expandedKeys", expandedKeys)
})
watch(selectedKeys, () => {
    console.log("selectedKeys", selectedKeys)
})
watch(checkedKeys, () => {
    console.log("checkedKeys", checkedKeys)
})
</script>
