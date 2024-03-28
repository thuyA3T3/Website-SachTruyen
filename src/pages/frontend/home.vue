<template>
    <div class="row d-flex justify-content-center ">
        <TheBanner :items="carouselItems" />
    </div>
    <div class="row d-flex justify-content-center ">
        <div class="col-6">
            <h3 class="mt-3">
                <span class="h3 fw-bold p-2 border-bottom border-dark bg-light">Truyện nổi bật</span>
            </h3>
        </div>
        <div class="col-6">

        </div>
        <HorizontalComicList :comics="homeComics" />
    </div>
    <div class="row">
        <div class="col-sm-8 col-12">
            <div class="row">
                <h3 class="mt-3">
                    <span class="h3 fw-bold p-2 border-bottom border-dark bg-light">Truyện mới cập nhật</span>
                </h3>
            </div>
            <div class="row">
                <ComicList :comics="homeComics" />
            </div>
        </div>
        <div class="col-sm-4 col-12">
            <div class="row">
                <h3 class="mt-3">
                    <span class="h3 fw-bold p-2 border-bottom border-dark bg-light">Bảng xếp hạng</span>
                </h3>
            </div>
            <div class="row">
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane key="1" tab="Hôm nay">
                        <VerticalComicList :comics="homeComics" />
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Tuần nay" force-render>
                        <VerticalComicList :comics="homeComics" />
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="Tháng qua">
                        <VerticalComicList :comics="homeComics" />
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import { homeMenu } from "../../stores/home-menu.js";
import TheBanner from "../../components/frontend/home/TheBanner.vue";
import HorizontalComicList from "../../components/frontend/home/HorizontalComicList.vue";
import ComicList from "../../components/frontend/home/ComicList.vue";
import VerticalComicList from "../../components/frontend/home/VerticalComicList.vue";


import { authStore } from '@/stores/auth-store.js';
export default {
    components: {
        TheBanner,
        HorizontalComicList,
        ComicList,
        VerticalComicList,
    },
    setup() {
        const store = authStore();
        console.log(store.user);
        homeMenu().onSelectedKeys(["home"]);
        const carouselItems = [
            { id: 1, imageUrl: '../../../assets/logo.jpg', title: 'Slide 1', link: 'http://localhost:5173/home' },
            { id: 2, imageUrl: '../../../assets/logo.jpg', title: 'Slide 2', link: 'http://localhost:5173/account' },

        ];
        const homeComics = [
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
            {
                id: 2,
                title: 'One Piece',
                author: 'Eiichiro Oda',
                image: 'http://localhost:8000/storage/images/1711508546.jpg',
            },
        ];
        return {
            carouselItems,
            homeComics,
        };
    },
}
</script>