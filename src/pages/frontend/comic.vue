<template>
    <div class="row mt-3 mb-3">
        <div class="col-sm-4 col-12 d-flex justify-content-center ">
            <div class="pt-3" style="width: 70%;">
                <a-image :src=homeComics[1].image class="rounded" />
            </div>
        </div>
        <div class="col-sm-8 col-12 pt-3">
            <div class="ps-5">
                <div class="title" style="width: 70%">
                    <h2>Name</h2>
                </div>
                <div class="row">
                    <p><span class="me-5">/5 <font-awesome-icon :icon="['fas', 'star']"
                                style="color: #FFD43B;" /></span><span> lượt đánh giá</span></p>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p style="opacity: 0.5;">Tác giả:</p>
                        <p>aaa</p>
                    </div>
                    <div class="col-6">
                        <p style="opacity: 0.5;">Thể loại:</p>
                        <p>aaa</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <a-button type="primary" shape="round">
                            Đọc từ đầu
                        </a-button>
                    </div>
                    <div class="col-6">
                        <a-button type="primary" shape="round">
                            <font-awesome-icon :icon="['far', 'heart']" style="color: #ffffff;" />
                        </a-button>
                    </div>
                </div>
                <div class="row">
                    <a-tabs>
                        <a-tab-pane key="1" tab="Danh sách chương">
                            <Chapter />
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="Bình luận" force-render>
                            <Comment />
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>

        </div>

    </div>
    <div class="row d-flex justify-content-center ">
        <div class="col-6">
            <h3 class="mt-3">
                <span class="h3 fw-bold p-2 border-bottom border-dark bg-light">Có thể bạn thích</span>
            </h3>
        </div>
        <div class="col-6">

        </div>
        <HorizontalComicList :comics="homeComics" />
    </div>
    <div class="row d-flex justify-content-center ">
        <div class="col-6">
            <h3 class="mt-3">
                <span class="h3 fw-bold p-2 border-bottom border-dark bg-light">Cùng tác giả</span>
            </h3>
        </div>
        <div class="col-6">

        </div>
        <HorizontalComicList :comics="homeComics" />
    </div>
</template>
<script>

import { defineComponent, ref } from "vue";
import HorizontalComicList from "../../components/frontend/home/HorizontalComicList.vue";
import Comment from "../../components/frontend/comic/Comment.vue";
import Chapter from "../../components/frontend/comic/Chapter.vue";

import { authStore } from "@/stores/auth-store.js";
export default defineComponent({
    components: {
        HorizontalComicList,
        Comment,
        Chapter,
    },
    setup() {
        const store = authStore();
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
            homeComics,
            store,
        };
    },
})
</script>