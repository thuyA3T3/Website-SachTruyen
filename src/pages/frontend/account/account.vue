<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <h2>DAO CHUNG THUY</h2>
            </div>
            <div class="row mb-5 mt-3">
                <a-tabs v-model:activeKey="activeKey" :tab-position="mode" class="ps-0">
                    <a-tab-pane key="1" tab="Chi tiết" class="ps-0 pe-2">
                        <Infomation />
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Đã đọc" force-render></a-tab-pane>
                    <a-tab-pane key="3" tab="Thông báo"></a-tab-pane>
                    <a-tab-pane key="4" tab="Làm tác giả" v-if="user.role === 'user'">
                        <AuthorRegis :user="user" />
                    </a-tab-pane>
                    <a-tab-pane key="5" tab="Đăng truyện" v-if="user.role === 'author'">
                        <ComicUploadForm />
                    </a-tab-pane>
                    <a-tab-pane key="6" tab="Danh sách truyện" v-if="user.role === 'author'">
                        <ListComic />
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import { homeMenu } from "../../../stores/home-menu.js";
import Infomation from "../../../components/frontend/account/Information.vue";
import ComicUploadForm from "../../../components/frontend/account/comic/ComicUploadForm.vue";
import ListComic from "../../../components/frontend/account/comic/ListComic.vue";
import AuthorRegis from "../../../components/frontend/account/AuthorRegis.vue";
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { authStore } from '@/stores/auth-store.js';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        Infomation,
        AuthorRegis,
        ComicUploadForm,
        ListComic,

    },
    setup() {
        const router = useRouter();
        const content = ref('');
        const user = authStore().user;
        console.log(authStore().isAuthenticated);
        const activeKey = ref('1');
        const mode = ref(window.innerWidth >= 576 ? 'left' : 'top');

        const setMode = () => {
            mode.value = window.innerWidth >= 576 ? 'left' : 'top';
        };

        onMounted(() => {
            window.addEventListener('resize', setMode);
            const queryActiveKey = router.currentRoute.value.query.activeKey;
            if (queryActiveKey) {
                activeKey.value = queryActiveKey;
            }
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', setMode);
        });
        homeMenu().onSelectedKeys(["account"]);
        return {
            activeKey,
            mode,
            content,
            user,
        }
    },
});
</script>
