<template>
    <form @submit.prevent="createBook()">
        <div class="row">
            <a-card title="Đăng truyện" style="width: 100%">
                <div class="row">
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
                                        Chọn ảnh bìa
                                    </a-button>
                                </a-upload>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-8">
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.title }">Tiêu đề sách</span>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-input placeholder="Tên sách" allow-clear v-model:value="title" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.description }">Mô tả</span>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-input placeholder="Mô tả" allow-clear v-model:value="description" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.genre_id }">Thể loại</span>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-select show-search placeholder="Thể loại" style="width:100%" :options="book_genre"
                                    :filter-option="filterOption" v-model:value="genre_id"></a-select>
                                <div class="w-100">
                                    <small v-if="errors.status" class="text-danger">
                                        {{ errors.genre_id[0] }}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="clo-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                        <a-button type="primary" html-type="submit">
                            <span>Luu</span>
                        </a-button>
                    </div>
                </div>

            </a-card>
        </div>
    </form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import axios from 'axios';
import { authStore } from '@/stores/auth-store.js';
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const store = authStore();
        const imageUrl = ref('');
        const errors = ref({});
        const book_genre = ref([]);
        const book = reactive({
            title: "",
            author_id: store.user.id,
            genre_id: "",
            description: "",
            image: "",

        });
        const handleImageUpload = async (event) => {

            const image = event.file.originFileObj;
            const formData = new FormData();
            formData.append('image', image);
            axios.post("http://127.0.0.1:8000/api/upload", formData)
                .then((response) => {
                    if (response) {
                        imageUrl.value = "http://localhost:8000" + response.data.image_path;
                        book.image = imageUrl.value;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const fetchGenres = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/list_genres");
                if (response && response.data) {
                    console.log(response.data);
                    const genres = response.data;
                    genres.forEach(genre => {
                        book_genre.value.push({
                            value: genre.id,
                            label: genre.name
                        });
                    });
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        const createBook = () => {
            console.log(book);
            axios.post("http://127.0.0.1:8000/api/book", book)
                .then((response) => {

                    message.success('Bạn đã đăng truyện thành công');
                })
                .catch((error) => {
                    errors.value = error.response.data.errors;
                    console.log(error);
                })
        }

        fetchGenres();
        return {
            imageUrl,
            handleImageUpload,
            errors,
            filterOption,
            ...toRefs(book),
            book_genre,
            createBook,
        }
    }
})
</script>
