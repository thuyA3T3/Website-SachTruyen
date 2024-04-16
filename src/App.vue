<template>
  <router-view></router-view>
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import { authStore } from './stores/auth-store.js';

export default defineComponent({
  setup() {
    const store = authStore();

    onMounted(() => {
      // Kiểm tra xem có thông tin đăng nhập trong localStorage không
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token) {
        // Nếu có, cập nhật trạng thái đăng nhập của store
        store.login(JSON.parse(user), token);
      }
    });
  },
});
</script>
