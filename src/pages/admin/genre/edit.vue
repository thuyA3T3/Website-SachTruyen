<template>
    <form @submit.prevent="updateGenres()">
        <a-card title="Thêm thể loại" style="width:100%">
            <div class="row mb-3">
                <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="200">
                                <template #icon>
                                    <img v-if="imageUrl" :src="imageUrl" alt="Avatar">
                                    <img v-else src="@/assets/2.jpg" alt="Default Avatar">
                                </template>
                            </a-avatar>
                        </div>
                        <div class="col-12 d-flex justify-content-center">
                            <a-upload :show-upload-list="false" @change="handleImageUpload">
                                <a-button type="primary">
                                    <font-awesome-icon class="me-2" :icon="['fas', 'plus']" />
                                    Đổi ảnh
                                </a-button>
                            </a-upload>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-8">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <span class="text-danger me-1">*</span>
                            <span :class="{ 'text-danger': errors.name }">Tên thể loại</span>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Ten tai khoan" allow-clear v-model:value="name" />
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.name[0] }}
                            </small>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="clo-12 d-grid d-sm-flex justify-content-sm-end mx-auto">

                    <a-button type="primary" html-type="submit">
                        <span>Cập nhật</span>
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
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const imageUrl = ref("");
        const router = useRouter();
        const route = useRoute();
        const genres = reactive({
            name: "",
            avatar: "",
        });
        const errors = ref({});
        const handleImageUpload = async (event) => {

            const image = event.file.originFileObj;
            const formData = new FormData();
            formData.append('image', image);
            axios.post("http://127.0.0.1:8000/api/upload", formData)
                .then((response) => {
                    if (response) {
                        imageUrl.value = "http://localhost:8000" + response.data.image_path;
                        genres.avatar = imageUrl.value;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const getUserEdit = () => {
            console.log(`id user truy van: ${route.params.id}`);
            axios.get(`http://127.0.0.1:8000/api/genres/${route.params.id}/edit`)
                .then((response) => {
                    console.log(response);
                    genres.name = response.data.name;
                    genres.avatar = response.data.avatar;
                    imageUrl.value = genres.avatar;

                })
                .catch((error) => {
                    console.log(error);
                })
        };
        getUserEdit();
        const updateGenres = () => {
            axios.put(`http://127.0.0.1:8000/api/genres/${route.params.id}`, genres)
                .then((response) => {
                    if (response.status == 200) {
                        router.push({ name: "admin-list-genres" });
                        message.success("Cập nhật thành công");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    errors.value = error.response.data.errors;
                });
        };
        return {
            imageUrl,
            handleImageUpload,
            errors,
            updateGenres,
            ...toRefs(genres),
        }
    },

});
</script>