<template>
    <div class="">
        <h2>Thể loại</h2>
    </div>
    <a-list item-layout="horizontal" :data-source="genres" :pagination="pagination">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-list-item-meta :description=item.author>
                    <template #title class="fs-5">
                        <p>{{ item.name }}</p>
                    </template>
                    <template #avatar>
                        <a-avatar :src=item.avatar :size="64" />
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>
<script setup lang="ts">
import axiosInstance from '@/axiosInstance';
import { reactive } from 'vue';

interface Genre {
    id: number,
    name: string,
    avatar: string,
}

const genres = reactive<Genre[]>([]);

const getGenres = async () => {
    try {
        const response = await axiosInstance.get('/list_genres')
        Object.assign(genres, response.data)
    } catch (error) {
        console.error('Error fetching genres:', error)
    }
};

getGenres();

const pagination = {
    onChange: page => {
    },
    pageSize: 6,
};

</script>