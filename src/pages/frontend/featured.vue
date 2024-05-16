<template>
    <div class="col-12 col-sm-9 mt-4">
        <div class="d-flex justify-content-between">
            <div>
                <h2>Truyện gợi ý</h2>
            </div>
            <div class="flex">
                <a-select class="me-4" ref="selectWhere" v-model:value="query.where" style="width: 120px">
                    <a-select-option value="1">Tính phí</a-select-option>
                    <a-select-option value="2">Miễn Phí</a-select-option>
                    <a-select-option value="3">Tất cả</a-select-option>
                </a-select>

                <a-select ref="selectOrderBy" placeholder="Sắp xếp" v-model:value="query.orderBy" style="width: 120px">
                    <a-select-option value="asc">Đăng gần nhất</a-select-option>
                    <a-select-option value="desc">Đăng lâu nhất</a-select-option>
                </a-select>
            </div>
        </div>
        <ComicList :comics="comics" />
    </div>
    <div class="col-12 col-sm-3 mt-4">
        <ListGenre />
    </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/axiosInstance.js";
import ComicList from "@/components/frontend/home/ComicList.vue";
import ListGenre from "@/components/frontend/ListGenre.vue";
import { homeMenu } from "../../stores/home-menu.js";

const route = useRoute();
const comics = ref([]);

homeMenu().onSelectedKeys(["featured"]);

const query = reactive({
    search: '',
    where: '',
    orderBy: null,
});

query.search = route.query.search || '';

watch(() => route.query.search, () => {
    query.search = route.query.search;
    getComic();
});

watch(() => query.where, (newWhere) => {
    getComic();
});

watch(() => query.orderBy, (newOrderBy) => {
    getComic();
});

const getComic = async () => {
    try {
        const response = await axiosInstance.get('/get_book', {
            params: {
                search: query.search,
                where: query.where,
                oderBy: ['created_at', query.orderBy]
            }
        });
        comics.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
};

getComic();
</script>