<template>
    <a-card title="Danh sách truyện của bạn" style="width: 100%">
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="comic" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'stt'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template>
                        <template v-if="column.key === 'right'">
                            <a-button type="primary" class="me-sm-2 mb-2">
                                <router-link :to="{ name: 'build_stories', params: { book_id: record.id } }">
                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                </router-link>
                            </a-button>
                        </template>
                        <template v-if="column.key === 'action'">
                            <a-button type="primary" class="me-sm-2 mb-2">
                                <router-link
                                    :to="{ name: 'edit_stories', params: { book_id: record.id, chapter_id: 1 } }">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                </router-link>
                            </a-button>
                            <a-button type="primary" danger @click="deleteComic(record.id)">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </a-button>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-card>
</template>
<script>
import { createVNode, defineComponent, ref } from 'vue';
import axiosInstance from '@/axiosInstance';
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { authStore } from '@/stores/auth-store.js';

export default defineComponent({
    setup() {
        const store = authStore();
        const comic = ref([]);
        const columns = [
            {
                title: 'STT',
                key: 'stt'
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                responsive: ['lg']
            },
            {
                title: 'Tiêu đề truyện',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Mô tả',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Viết tiếp',
                key: 'right',
            },
            {
                title: 'Công cụ',
                fixed: 'right',
                key: 'action'
            },
        ];

        const getComic = () => {
            axiosInstance.get(`/book/${store.user.id}`)
                .then((response) => {
                    comic.value = response.data;
                    console.log(comic.value);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const deleteComic = (id) => {
            Modal.confirm({
                content: 'Bạn có chắc chắn muốn xóa?',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    axiosInstance.delete(`/book/${id}`)
                        .then((response) => {
                            if (response.status == 200) {
                                message.success("Truyện đã được xóa");
                                getComic();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                },
                cancelText: 'Hủy',
                onCancel() {
                    Modal.destroyAll();
                },
            });
        };

        getComic();

        return {
            columns,
            comic,
            deleteComic,
        };
    }
});
</script>