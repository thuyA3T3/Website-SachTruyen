import './assets/main.css';
import { createApp } from 'vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import axios from 'axios';
window.axios = axios;

import {
    Layout,
    Menu,
    List,
    Drawer,
    Button,
    Card,
    Table,
    Avatar,
    Select,
    Input,
    Checkbox,
    Dropdown,
    Breadcrumb,
    Carousel,
    Upload,
    Image,
    Tabs,
    message
} from 'ant-design-vue';

import App from './App.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


library.add(fas, fab, far); 

import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);


app.use(router);
app.use(Layout);
app.use(Button);
app.use(Drawer);
app.use(List);
app.use(Menu);
app.use(Card);
app.use(Table);
app.use(Avatar);
app.use(Select);
app.use(Input);
app.use(Checkbox);
app.use(Dropdown);
app.use(Breadcrumb);
app.use(Carousel);
app.use(Upload);
app.use(Tabs);
app.use(Image);

app.use(pinia);

app.mount('#app');

app.config.globalProperties.$message = message;