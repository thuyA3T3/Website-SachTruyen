<template>
    <a-card title="Danh sách truyện cửa bạn" style="width: 100%">

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="comic" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'stt'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <a-button type="primary" class="me-sm-2 mb-2">



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



        getComic();

        return {
            columns,
            comic,
        };
    }
});
</script>