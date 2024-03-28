<template>
    <form @submit.prevent="createUsers()">
        <a-card title="Tao moi Tai khoan" style="width:100%">
            <div class="row mb-3">
                <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="200">
                                <template #icon>
                                    <img src="../../../assets/2.jpg" alt="Avatar">
                                </template>
                            </a-avatar>
                        </div>
                        <div class="col-12 d-flex justify-content-center">
                            <a-button type="primary">
                                <font-awesome-icon class="me-2" :icon="['fas', 'plus']" />
                                Chon anh
                            </a-button>
                        </div>
                    </div>
                </div>
                <div class="clo-12 col-sm-8">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.status }">
                                Tinh trang
                            </span>

                        </div>
                        <div class="col-12 col-sm-5">
                            <a-select show-search placeholder="Tinh trang" style="width:100%" :options="users_status"
                                :filter-option="filterOption" v-model:value="status"></a-select>
                            <div class="w-100">
                                <small v-if="errors.status" class="text-danger">
                                    {{ errors.status[0] }}
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.username }">Ten tai khoan</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Ten tai khoan" allow-clear v-model:value="username" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.username[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.first_name }">Ho</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Ho" allow-clear v-model:value="first_name" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.first_name[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.last_name }">Ten</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Ten" allow-clear v-model:value="last_name" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.last_name[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.email }">Email</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Email" allow-clear v-model:value="email" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.email[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.password }">Mat khau</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input-password placeholder="Mat Khau" allow-clear v-model:value="password" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.password[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.password }">Xac nhan mat khau</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input-password placeholder="Xac nhan mat Khau" allow-clear
                                v-model:value="password_confirmation" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.password[0] }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="clo-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button class="me-sm-2 mb-3 mb-sm-0">
                        <router-link :to="{ name: 'admin-users' }">
                            <span>Huy</span>
                        </router-link>
                    </a-button>
                    <a-button type="primary" html-type="submit">
                        <span>Luu</span>
                    </a-button>
                </div>
            </div>
        </a-card>
    </form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useMenu } from "../../../stores/use-menu.js";
export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-users"]);

        const router = useRouter();
        const users_status = ref([]);
        const users = reactive({
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            status: "",
        });
        const errors = ref({})

        const getUsersCreate = () => {
            axios.get("http://127.0.0.1:8000/api/users/create")
                .then((reponse) => {
                    users_status.value = reponse.data.users_status;
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const createUsers = () => {
            axios.post("http://127.0.0.1:8000/api/users", users)
                .then((response) => {
                    if (response) {
                        message.success('Tao moi thanh cong');
                        router.push({ name: "admin-users" });
                    }
                })
                .catch((error) => {
                    errors.value = error.response.data.errors;
                });
        }
        getUsersCreate();
        return {
            users_status,
            errors,
            filterOption,
            createUsers,
            ...toRefs(users)
        }
    },
})
</script>