import admin from "./admin.js";
import main from "./main.js";
import { createRouter, createWebHistory } from 'vue-router';
// Sử dụng toán tử spread (...) để kết hợp tất cả các route trong admin.js thành một mảng routes
const routes = [
    ...admin,
    ...main
];

// Khởi tạo router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;