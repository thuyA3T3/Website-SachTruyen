import { authStore } from '@/stores/auth-store.js';

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
        component: () => import("../pages/frontend/account.vue"),
        beforeEnter: authMiddleware,
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
        path: "comic", 
        name: "comic",
        component: () => import("../pages/frontend/comic.vue"),
      },
    ],
  },
];


export default main;