<template>
    <a-list item-layout="horizontal" :data-source="comics" :pagination="pagination">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-list-item-meta :description=item.author>
                    <template #title>
                        <a>{{ item.title }}</a>
                    </template>
                    <template #avatar>
                        <a-avatar :src=item.image :size="64" />
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <span>
                        <font-awesome-icon :icon="['far', 'eye']" />
                    </span>
                </template>
            </a-list-item>
        </template>
    </a-list>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        comics: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const comics = ref(props.comics);
        const pagination = {
            onChange: page => {
            },
            pageSize: 6,
        };
        return {
            pagination,
            comics,
        };
    },
});
</script>