<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="admin-users">
            <router-link :to="{ name: 'admin-users' }">
                <span>
                    <UserOutlined class="me-1" /> Tài KHoản
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-roles">
            <router-link :to="{ name: 'admin-roles' }">
                <span>
                    <TagOutlined class="me-1" /> Vai trò
                </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-settings">
            <router-link :to="{ name: 'admin-settings' }">
                <span>
                    <SettingOutlined class="me-1" /> Cài đặt
                </span>
            </router-link>
        </a-menu-item>
        <a-sub-menu key="admin-genres">
            <template #title>
                <span>Thể loại</span>
            </template>
            <template #icon>
                <span>
                    <DownSquareOutlined />
                </span>
            </template>
            <a-menu-item key="admin-list">
                <router-link :to="{ name: 'admin-list-genres' }">
                    Danh sách thể loại
                </router-link>
            </a-menu-item>
            <a-menu-item key="admin-add-genre">
                <router-link :to="{ name: 'admin-add-genre' }">
                    Thêm thể loại
                </router-link>
            </a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>
<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenu } from "../../stores/use-menu.js";
import {
    UserOutlined,
    TagOutlined,
    SettingOutlined,
    DownSquareOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        UserOutlined,
        TagOutlined,
        SettingOutlined,
        DownSquareOutlined
    },
    setup() {
        const store = useMenu();

        return {
            ...storeToRefs(store)
        };
    },
});
</script>