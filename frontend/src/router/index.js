// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth.js';

// Client Routes
import Home from '../pages/Home.vue';

// Admin Routes
import Admin from '../admin/pages/Dashboard.vue';
import Login from '../admin/pages/Login.vue';

const routes = [
    // Client Routes
    { path: '/', component: Home },

    // Admin Routes
    {
        path: '/admin',
        component: Admin,
        meta: { requiresAuth: true },
    },
    { path: '/login', component: Login, meta: { hideNavbar: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Mengecek apakah halaman yang ingin diakses membutuhkan autentikasi
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Jika tidak login, redirect ke halaman login
        return next('/login');
    }
    next();
});

export default router;