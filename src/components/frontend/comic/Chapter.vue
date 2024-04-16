<template>
    <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
            <a-list-item :key="item.title">
                <span>{{ item.title }}</span>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
import { defineComponent } from 'vue';

const data = [
    { title: 'chương 1' },
    { title: 'chương 2' },
    { title: 'chương 3' },
    { title: 'chương 4' },
];

export default defineComponent({
    setup() {
        return {
            data,
        };
    },
});
</script>