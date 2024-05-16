<template>
    <div>
        <a-row :gutter="16" class="comic-list">
            <a-col :xs="12" :sm="8" :md="6" :lg="6" v-for="(comic, index) in paginatedComics" :key="index" class="p-1">
                <router-link :to="{ name: 'comic', params: { id: comic.id } }">
                    <a-card hoverable class="mb-3 p-0">
                        <a-image :preview="{ visible: false }" :src="comic.image" style="border-radius: 5px"
                            class="mb-3" />
                        <a-card-meta :title="comic.title" :description="comic.author"></a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
        </a-row>
        <a-pagination :total="comics.length" :pageSize="pageSize" v-model:current="currentPage"
            @change="handlePageChange" />
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { Card, Row, Col, Avatar, Pagination } from 'ant-design-vue';

export default {
    props: {
        comics: {
            type: Array,
            required: true,
        },
    },
    components: {
        'a-row': Row,
        'a-col': Col,
        'a-card': Card,
        'a-avatar': Avatar,
        'a-card-meta': Card.Meta,
        'a-pagination': Pagination,
    },
    setup(props) {
        const pageSize = ref(8);
        const currentPage = ref(1);

        const handlePageChange = (page) => {
            currentPage.value = page;
        };

        const paginatedComics = computed(() => {
            const startIndex = (currentPage.value - 1) * pageSize.value;
            const endIndex = startIndex + pageSize.value;
            return props.comics.slice(startIndex, endIndex);
        });

        return {
            paginatedComics,
            pageSize,
            currentPage,
            handlePageChange,
        };
    },
};
</script>