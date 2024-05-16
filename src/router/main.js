import { authStore } from '@/stores/auth-store.js';

// Middleware sẽ kiểm tra xem người dùng đã đăng nhập chưa
const authMiddleware = (to, from, next) => {
  if (!authStore().isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
};

const main = [
  {
    path: "/",
    component: () => import("../layouts/home.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../pages/frontend/home.vue"),
      },
      {
        path: "genres",
        name: "genres",
        component: () => import("../pages/frontend/genres.vue"),
      },
      {
        path: "featured",
        name: "featured",
        component: () => import("../pages/frontend/featured.vue"),
      },
      {
        path: "rankings",
        name: "rankings",
        component: () => import("../pages/frontend/rankings.vue"),
      },
      {
        path: "account",
        name: "account",
        component: () => import("../pages/frontend/account/account.vue"),
        beforeEnter: authMiddleware,
      },
      {
        path: "/stories/:book_id",
        name: "build_stories",
        component: () => import("../pages/frontend/account/ContentComic.vue"),
      },
      {
        path: "/stories/:book_id/:chapter_id",
        name: "edit_stories",
        component: () => import("../pages/frontend/account/ContentComic.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("../pages/frontend/user/login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("../pages/frontend/user/register.vue"),
      },
      {
        path: "/comic/:id", 
        name: "comic",
        component: () => import("../pages/frontend/comic.vue"),
      },
    ],
  },
];

export default main;