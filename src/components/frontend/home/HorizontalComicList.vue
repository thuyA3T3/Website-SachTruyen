<template>
    <div class="featured-comics-container">
        <div class="featured-comics">
            <a-row :gutter="16" class="comic-list">
                <a-col :xs="8" :sm="6" :md="4" :lg="4" v-for="(comic, index) in comics" :key="index" class="p-1">
                    <router-link :to="{ name: 'comic', params: { id: comic.id } }">
                        <a-card hoverable class="mb-3 p-0">
                            <a-image :preview="{ visible: false }" :src="comic.image" style="border-radius: 5px"
                                class="mb-3" />
                            <a-card-meta :title="comic.title" :description="comic.author"></a-card-meta>
                        </a-card>
                    </router-link>
                </a-col>

            </a-row>
            <button class="next-button" @click="next"><font-awesome-icon :icon="['fas', 'chevron-right']" /></button>
        </div>

    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { Card, Row, Col, Avatar, Button } from 'ant-design-vue';
import { watchEffect } from 'vue';

export default defineComponent({
    props: {
        comics: {
            type: Array,
            required: true,
        },
    },
    components: {
        'a-card': Card,
        'a-row': Row,
        'a-col': Col,
        'a-avatar': Avatar,
        'a-card-meta': Card.Meta,
        'a-button': Button,
    },
    setup(props) {
        const comics = ref(props.comics);

        const viewComic = (comicId) => {
            console.log('View comic:', comicId);
        };

        const next = () => {
            const comicList = document.querySelector('.comic-list');

            if (comicList) {

                comicList.scrollLeft += 300;
            }
        };

        watchEffect(() => {
            comics.value = props.comics;
        });

        onMounted(() => {
        });
        return {
            comics,
            next,
            viewComic,
        };
    },
});
</script>

<style scoped>
.featured-comics {
    padding: 20px 0px 20px 20px;
}

.featured-comics {
    display: flex;
}

.comic-list {
    flex-wrap: nowrap;
    overflow-x: auto;
}

.next-button {
    z-index: 999;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #333;
    transition: color 0.3s ease;
    padding-left: 10px;
    padding-right: 0px;
}

.next-button:hover {
    color: #555;
}
</style>