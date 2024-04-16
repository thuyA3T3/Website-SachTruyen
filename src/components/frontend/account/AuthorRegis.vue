<template>
    <a-form @submit.prevent="authorRegis()">
        <a-form-item label="Mô tả" name="description"
            :rules="[{ required: true, message: 'Vui lòng nhập mô tả tác giả' }]">
            <a-input v-model:value="description" placeholder="Nhập mô tả tác giả" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit">Đăng ký</a-button>
        </a-form-item>
    </a-form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        const user = ref(props.user);
        const author = reactive({
            user_id: user.value.id,
            authorname: user.value.username,
            avatar: user.value.avatar,
            description: "",
        });

        const authorRegis = () => {
            axios.post("http://127.0.0.1:8000/api/author_registration", author)
                .then((response) => {
                    console.log(response);
                    message.success('Bạn đã là tác giả , hãy đăng nhập lại');
                    router.push({ name: "login" });
                })
                .catch((error) => {
                    console.log(error)
                })
        };
        return {
            user,
            ...toRefs(author),
            authorRegis,
        };
    }
});
</script>