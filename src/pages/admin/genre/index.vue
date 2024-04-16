<template>
    <a-card title="Tài Khoản" style="width: 100%">

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="genres" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'stt'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <a-button type="primary" class="me-sm-2 mb-2">

                                <router-link :to="{ name: 'admin-genres-edit', params: { id: record.id } }">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                </router-link>

                            </a-button>
                            <a-button type="primary" danger @click="deleteGenre(record.id)">
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
import axios from 'axios';
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    setup() {
        const genres = ref([]);
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
                title: 'Tên danh mục',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Công cụ',
                fixed: 'right',
                key: 'action'
            },
        ];

        const getGenres = () => {
            axios.get('http://127.0.0.1:8000/api/list_genres')
                .then((response) => {
                    genres.value = response.data;
                    console.log(genres.value);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const deleteGenre = (id) => {
            Modal.confirm({
                content: 'Bạn có chắc chắn muốn xóa?',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    axios.delete(`http://127.0.0.1:8000/api/genres/${id}`)
                        .then((response) => {
                            if (response.status == 200) {
                                message.success("Xóa thể loại thành công");
                                getGenres();
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

        getGenres();

        return {
            columns,
            genres,
            deleteGenre,
        };
    }
});
</script>