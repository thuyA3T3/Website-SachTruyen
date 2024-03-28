<template>
    <form @submit.prevent="updateUsers()">
        <a-card title="Cap nhat Tai khoan" style="width:100%">
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
                            <small v-if="errors.username" class="text-danger">
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
                            <small v-if="errors.first_name" class="text-danger">
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
                            <small v-if="errors.last_name" class="text-danger">
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
                            <small v-if="errors.email" class="text-danger">
                                {{ errors.email[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">

                        </div>
                        <div class="col-12 col-sm-5">
                            <a-checkbox v-model:checked="change_password">
                                Doi mat khau
                            </a-checkbox>
                        </div>
                    </div>
                    <div class="row mb-3" v-if="change_password == true">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.password }">Mat khau</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input-password placeholder="Mat Khau" allow-clear v-model:value="password" />
                            <small v-if="errors.password" class="text-danger">
                                {{ errors.password[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3" v-if="change_password == true">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.password }">Xac nhan mat khau</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input-password placeholder="Xac nhan mat Khau" allow-clear
                                v-model:value="password_confirmation" />
                            <small v-if="errors.password" class="text-danger">
                                {{ errors.password[0] }}
                            </small>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label>
                                <span>Lan dang nhap gan day: </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <span>{{ login_at }}</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label>
                                <span>Lan doi mat khau gan nhat: </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <span>{{ change_password_at }}</span>
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
import { useRoute } from 'vue-router';
import { useMenu } from "../../../stores/use-menu.js";
import axios from 'axios';
import dayjs from 'dayjs';

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-users"]);

        const router = useRouter();
        const route = useRoute();
        const users_status = ref([]);
        const users = reactive({
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            status: "",
            change_password: false,
            login_at: "",
            change_password_at: "",
        });
        const errors = ref({})


        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const getUserEdit = () => {
            console.log(`id user truy van: ${route.params.id}`);
            axios.get(`http://127.0.0.1:8000/api/users/${route.params.id}/edit`)
                .then((response) => {
                    console.log(response);
                    users.username = response.data.users.username;
                    users.first_name = response.data.users.first_name;
                    users.last_name = response.data.users.last_name;
                    users.email = response.data.users.email;
                    users.status = response.data.users.status;

                    response.data.users.login_at ? users.login_at = dayjs(response.data.users.login_at).format('DD/MM/YYYY - HH:mm') : users.login_at = "Chua co luot dang nhap";
                    response.data.users.change_password_at ? users.change_password_at = dayjs(response.data.users.change_password_at).format('DD/MM/YYYY - HH:mm') : users.change_password_at = "Chua tung doi mat khau";

                    users_status.value = response.data.users_status;
                })
                .catch((error) => {
                    console.log(error);
                })
        };

        const updateUsers = () => {
            axios.put(`http://127.0.0.1:8000/api/users/${route.params.id}`, users)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("Cập nhật thành công");
                        router.push({ name: "admin-users" });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    errors.value = error.response.data.errors;
                    console.log(errors.value["last_name"]);
                });

        };
        getUserEdit();
        return {
            users_status,
            errors,
            filterOption,
            updateUsers,
            ...toRefs(users)
        }
    },
})
</script>