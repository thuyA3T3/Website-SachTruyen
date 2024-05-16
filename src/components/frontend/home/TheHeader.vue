<template>
    <div class="containter">
        <a-layout class="layout">
            <div class="row">
                <a-layout-header class="d-flex align-items-center justify-content-center ">
                    <div class="col-2 d-flex d-sm-none">
                        <span @click="showDrawer()">
                            <font-awesome-icon :icon="['fas', 'list']" style="color: #ffffff;" />
                            <a-drawer v-model:open="visible" title="DANH MỤC" placement="left">
                                <TheMenu :mode="'inline'" />
                            </a-drawer>
                        </span>

                    </div>
                    <div class="col-4 col-sm-2 align-items-center">
                        <img src="../../../assets/logo.jpg" class="ms-3"
                            style="max-width: 70%; max-height: 50px; border-radius: 10%;" alt="Logo">
                    </div>


                    <div class="col-sm-6 d-sm-flex  d-none ">
                        <TheMenu />
                    </div>
                    <div class="col-sm-3 col-4 d-flex align-items-center">
                        <a-input-search v-model:value="searchValue" placeholder="Tìm kiếm" @search="search()"
                            enter-button />
                    </div>
                    <div class="col-sm-1 d-none d-sm-flex align-items-center justify-content-end">
                        <div class="col-sm-1 d-none d-sm-flex align-items-center justify-content-end">
                            <a-dropdown placement="bottom" :arrow="false">
                                <a-button><font-awesome-icon :icon="['fas', 'user']" /></a-button>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>
                                            <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
                                        </a-menu-item>
                                        <a-menu-item>
                                            <router-link :to="{ name: 'register' }">Đăng ký</router-link>
                                        </a-menu-item>
                                        <a-menu-item>
                                            <a @click="logout()">Đăng xuất</a>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </div>
                    </div>
                    <div class="col-2 d-flex d-sm-none justify-content-end">
                        <font-awesome-icon :icon="['fas', 'user']" style="color: #ffffff;" />
                    </div>
                </a-layout-header>
            </div>
        </a-layout>
    </div>
</template>
<script setup>
import TheMenu from '@/components/frontend/home/TheMenu.vue';
import { defineComponent, ref } from "vue";
import { authStore } from "@/stores/auth-store";
import { useRouter } from "vue-router";

const router = useRouter();
const searchValue = ref('');
const visible = ref(false);
const visible_user = ref(false);

const search = () => {
    router.push({ name: 'featured', query: { search: searchValue.value } })
}

const logout = () => {
    authStore().logout();
    router.push({ name: "login" });
};

const showDrawer = () => {
    visible.value = true;
};

const showDrawerUser = () => {
    visible_user.value = true;
};
</script>
