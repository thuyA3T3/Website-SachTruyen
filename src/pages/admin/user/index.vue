<template>
    <a-card title="Tài Khoản" style="width: 100%">
        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <a-button type="primary">
                    <router-link :to="{ name: 'admin-users-create' }">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'stt'">
                            <span>
                                {{ index + 1 }}
                            </span>
                        </template>
                        <template v-if="column.key === 'status'">
                            <span v-if="record.status == 'active'" class="text-primary">{{ record.status }}</span>
                            <span v-if="record.status != 'active'" class="text-danger">{{ record.status }}</span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <a-button type="primary" class="me-sm-2 mb-2">
                                <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                </router-link>
                            </a-button>
                            <a-button type="primary" danger @click="deleteUsers(record.id)">
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
import { useMenu } from "../../../stores/use-menu.js";
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

export default defineComponent({
    setup() {

        useMenu().onSelectedKeys(["admin-users"]);


        const users = ref([]);


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
                title: 'Tên người dùng',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Công cụ',
                fixed: 'right',
                key: 'action'
            },

        ];


        const getUser = () => {
            axios.get('http://127.0.0.1:8000/api/users')
                .then((response) => {

                    users.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        };

        const deleteUsers = (id) => {

            Modal.confirm({
                content: 'Ban co chac chan muon xoa',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
                        .then((response) => {
                            if (response.status == 200) {
                                message.success("Xoa Tai khoan thanh cong");
                                getUser();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                },
                cancelText: 'Huy',
                onCancel() {
                    Modal.destroyAll();
                },
            });
        }

        getUser();

        return {
            users,
            columns,
            deleteUsers
        }
    },
});
</script>