<template>
    <a-carousel arrows autoplay>
        <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <left-circle-outlined />
            </div>
        </template>
        <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
                <right-circle-outlined />
            </div>
        </template>
        <a v-for="item in items" :key="item.id" :href="item.avatar">
            <div style="display: flex; position: relative; justify-content: center; align-items: center;">
                <img :src="item.avatar" alt="" />
                <h3 style="position: absolute;">{{ item.name }}</h3>
            </div>
        </a>
    </a-carousel>
</template>

<script>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
    props: {
        items: {
            type: Object,
            required: true,
        },
    },
    components: {
        LeftCircleOutlined,
        RightCircleOutlined,
    },
    setup(props) {

        const items = computed(() => {
            return props.items
        });
        return {
            items,
        };

    },
});
</script>


<style scoped>
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 160px;
    line-height: 160px;
    overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
    display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
    font-size: xx-large;
}
</style>