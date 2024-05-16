<template>
    <div class="row">
        <a-card style="width: 100%">
            <template #title>
                <span style="font-weight: bold; font-size: 20px;">Hãy viết bộ truyện của bạn</span>
            </template>
            <form @submit.prevent="createChapter()">
                <div class="row mt-2">
                    <div class="col-12 col-sm-3 text-start">
                        <span class="text-danger me-1">*</span>
                        <span>Tiêu đề chương</span>
                    </div>
                    <div class="col-12 col-sm-5">
                        <a-input placeholder="Tiêu đề chương" allow-clear v-model:value="chapter_title" />
                        <small v-if="errors.chapter_title" class="text-danger">
                            {{ errors.chapter_title }}
                        </small>
                    </div>
                    <div v-if="chapter_number" class="col-12 col-sm-2 text-start">
                        <span class="text-danger me-1">*</span>
                        <span>Chương</span>
                    </div>
                    <div v-if="chapter_number" class="col-12 col-sm-2">
                        <a-select style="width:100%" :options="chapters" v-model:value="chapter_number"
                            @change="navigateToChapter()"></a-select>
                        <div class="w-100">
                            <small v-if="errors.status" class="text-danger">
                                {{ errors.chapter_number }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="row mb-3">
                        <div class="col-12 text-start">
                            <span class="text-danger me-1">*</span>
                            <span>Nội dung</span>
                        </div>
                    </div>
                    <div class="row ms-1">
                        <div class="col-12">
                            <div class="row" style="min-height: 300px;">
                                <QuillEditor theme="snow" ref="quill" v-model:content="chapter_content"
                                    contentType="html" placeholder="Hãy viết nội dung ở đây" style="height: 300px" />
                                <small v-if="errors.chapter_content" class="text-danger">
                                    {{ errors.chapter_content }}
                                </small>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-if="!chapter_number" class="clo-12 d-grid d-sm-flex justify-content-sm-end mx-auto  ">
                    <a-button type="primary" html-type="submit">
                        <span>Lưu</span>
                    </a-button>
                </div>
                <div v-if="chapter_number" class="clo-12 d-grid d-sm-flex justify-content-sm-end mx-auto  ">
                    <a-button type="primary" html-type="submit">
                        <span>Cập nhật</span>
                    </a-button>
                </div>
            </form>
        </a-card>

    </div>
</template>

<script>
import { ref, defineComponent, reactive, toRefs } from 'vue';
import axiosInstance from '@/axiosInstance';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const book_chapter = reactive({
            book_id: route.params.book_id,
            chapter_number: route.params.chapter_id,
            chapter_title: "",
            chapter_content: "",
        });
        const chapters = ref([]);
        const errors = ref({});
        const createChapter = () => {
            if (book_chapter.chapter_number) {
                console.log(book_chapter);
                axiosInstance.post(`/book_chapter/${route.params.chapter_id}`, book_chapter)
                    .then((response) => {
                        message.success('Bạn đã cập nhật chươnng tành công')
                        router.push({ name: 'account', query: { activeKey: 6 } });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                console.log(book_chapter);
                axiosInstance.post('/book_chapter', book_chapter)
                    .then((response) => {
                        console.log(response);
                        message.success('Bạn đã tạo chươnng tành công');
                        router.push({ name: 'account', query: { activeKey: 6 } });
                    })
                    .catch((error) => {
                        console.log(error);
                        errors.value = error.response.data.errors;
                    });
            }
        }
        const getChapterList = () => {
            if (book_chapter.chapter_number) {
                axiosInstance.get(`book-chapters/${route.params.book_id}`)
                    .then((response) => {
                        const book_chapter = response.data;
                        book_chapter.forEach(chapter => {
                            chapters.value.push({
                                value: chapter,
                                label: "Chương: " + chapter
                            });
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        const getChapter = () => {
            if (book_chapter.chapter_number) {
                axiosInstance.get(`book-chapters/${route.params.book_id}/${route.params.chapter_id}`)
                    .then((response) => {
                        console.log(response);
                        book_chapter.chapter_content = response.data.chapter_content;
                        book_chapter.chapter_title = response.data.chapter_title;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        getChapter();
        getChapterList();
        const navigateToChapter = () => {
            console.log(book_chapter.chapter_number);
            if (book_chapter.chapter_number) {
                router.push({ name: 'edit_stories', params: { book_id: book_chapter.book_id, chapter_id: book_chapter.chapter_number } });
                route.params.chapter_id = book_chapter.chapter_number;
                getChapter();
            }

        };
        return {
            errors,
            createChapter,
            chapters,
            navigateToChapter,
            ...toRefs(book_chapter),
        };
    },
});
</script>
<style scoped></style>