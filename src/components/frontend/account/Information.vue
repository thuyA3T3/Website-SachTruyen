<template>
    <form @submit.prevent="updateUsers()">
        <a-card title="Thông tin tài khoản" style="width:100%">
            <div class="row mb-3">
                <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="200">
                                <template #icon>
                                    <img v-if="imageUrl" :src="imageUrl" alt="Avatar">
                                    <img v-if="avatar" :src="avatar" alt="Avatar">
                                    <img v-else src="@/assets/2.jpg" alt="Default Avatar">
                                </template>
                            </a-avatar>
                        </div>
                        <div class="col-12 d-flex justify-content-center">
                            <a-upload :show-upload-list="false" @change="handleImageUpload">
                                <a-button type="primary">
                                    <font-awesome-icon class="me-2" :icon="['fas', 'plus']" />
                                    Chọn ảnh
                                </a-button>
                            </a-upload>
                        </div>
                    </div>
                </div>
                <div class="clo-12 col-sm-8">
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
                    <a-button type="primary" html-type="submit">
                        <span>Cập nhật tài khoản</span>
                    </a-button>
                </div>
            </div>
        </a-card>
    </form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/stores/auth-store.js';
import dayjs from 'dayjs';
export default defineComponent({
    setup() {
        const store = authStore();
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
            change_password: false,
            login_at: "",
            change_password_at: "",
            avatar: "",
        });
        const imageUrl = ref('');
        const userId = store.user.id;
        const getUserEdit = () => {
            axios.get(`http://127.0.0.1:8000/api/users/${userId}/edit`)
                .then((response) => {
                    console.log(response);
                    users.username = response.data.users.username;
                    users.first_name = response.data.users.first_name;
                    users.last_name = response.data.users.last_name;
                    users.email = response.data.users.email;
                    users.status = response.data.users.status;
                    users.avatar = response.data.users.avatar;
                    response.data.users.login_at ? users.login_at = dayjs(response.data.users.login_at).format('DD/MM/YYYY - HH:mm') : users.login_at = "Chua co luot dang nhap";
                    response.data.users.change_password_at ? users.change_password_at = dayjs(response.data.users.change_password_at).format('DD/MM/YYYY - HH:mm') : users.change_password_at = "Chua tung doi mat khau";

                    users_status.value = response.data.users_status;
                })
                .catch((error) => {
                    console.log(error);
                })
        };
        getUserEdit();
        const handleImageUpload = async (event) => {

            const image = event.file.originFileObj;
            const formData = new FormData();
            formData.append('image', image);
            axios.post("http://127.0.0.1:8000/api/upload", formData)
                .then((response) => {
                    if (response) {
                        imageUrl.value = "http://localhost:8000" + response.data.image_path;
                        users.avatar = imageUrl.value;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const updateUsers = () => {
            console.log(users);
            axios.put(`http://127.0.0.1:8000/api/users/${userId}`, users)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("Cập nhật thành công");
                        router.push({ name: "account" });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    errors.value = error.response.data.errors;
                    console.log(errors.value["last_name"]);
                });

        };
        const errors = ref({});
        return {
            errors,
            handleImageUpload,
            imageUrl,
            updateUsers,
            ...toRefs(users),
        }

    }
})

</script>