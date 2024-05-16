<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal"
        :style="{ lineHeight: '64px' }">
        <a-menu-item key="home">
            <router-link :to="{ name: 'home' }">
                <span>
                    <font-awesome-icon :icon="['fas', 'house']" /> Trang chủ
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="genres">
            <router-link :to="{ name: 'genres' }">
                <span>
                    Thể loại
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="rankings">
            <router-link :to="{ name: 'rankings' }">
                <span>
                    Xếp hạng
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="featured">
            <router-link :to="{ name: 'featured' }">
                <span>
                    Đáng xem
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="account" class="me-auto">
            <router-link :to="{ name: 'account' }">
                <span>
                    Tài Khoản
                </span>
            </router-link>
        </a-menu-item>
    </a-menu>
</template>
<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { homeMenu } from "../../../stores/home-menu.js";

export default defineComponent({
    setup() {
        const store = homeMenu();

        return {
            ...storeToRefs(store)
        };
    },
});
</script>
<style scoped>
.ant-menu {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>