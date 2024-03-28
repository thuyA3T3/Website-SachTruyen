<template>
    <form @submit.prevent="userLogin()">
        <a-card title="Đăng nhập" style="width:100%">
            <div class="row">
                <div class="row mb-3">
                    <div class="col-12 col-sm-3 text-start text-sm-end">
                        <span class="text-danger me-1">*</span>
                        <span>Ten tai khoan</span>
                    </div>
                    <div class="col-12 col-sm-5">
                        <a-input placeholder="Ten tai khoan" allow-clear v-model:value="email" />
                        <small v-if="errors.email" class="text-danger">
                            {{ errors.email[0] }}
                        </small>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12 col-sm-3 text-start text-sm-end">
                        <span class="text-danger me-1">*</span>
                        <span>Mật khẩu</span>
                    </div>
                    <div class="col-12 col-sm-5">
                        <a-input-password placeholder="Xac nhan mat Khau" allow-clear v-model:value="password" />
                        <small v-if="errors.password" class="text-danger">
                            {{ errors.password[0] }}
                        </small>
                        <small v-if="errors.error" class="text-danger">
                            {{ errors.error }}
                        </small>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12 col-sm-8 text-end">
                        <router-link :to="{ name: 'register' }" class="text-danger">Quên mật khẩu</router-link>
                        <span>/</span>
                        <router-link :to="{ name: 'register' }">Đăng ký</router-link>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="clo-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button type="primary" html-type="submit">
                        <span>Đăng nhập</span>
                    </a-button>
                </div>
            </div>
        </a-card>
    </form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { BACKEND_API } from '@/config/config.js';
import axios from 'axios';
import { authStore } from '@/stores/auth-store.js';

export default defineComponent({
    setup() {
        const errors = ref({});
        const router = useRouter();
        const store = authStore();
        const user = reactive({
            email: "",
            password: "",
        });
        const userLogin = () => {
            axios.post("http://127.0.0.1:8000/api/login", user)
                .then((response) => {
                    if (response) {
                        store.login(response.data.user, response.data.token);
                        message.success('Đăng nhập thành công');
                        router.push({ name: "home" });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors;
                    }
                    if (error.response.status === 401) {
                        errors.value = error.response.data;
                    }

                });
        };
        return {
            userLogin,
            errors,
            ...toRefs(user)
        }
    }
})
</script>