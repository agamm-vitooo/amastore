import { createApp } from 'vue';
import App from '../App.vue';
import { createRouter, createWebHistory } from 'vue-router';

//client
import Home from '../pages/Home.vue';

//admin
import Login from '../admin/pages/Login.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router