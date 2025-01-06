import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth.js';

// Client Routes
import Home from '../pages/Home.vue';

// Admin Routes
import Admin from '../admin/pages/Dashboard.vue';
import Login from '../admin/pages/Login.vue';
import Hero from '../admin/pages/Hero.vue';

const routes = [
    // Client Routes
    { path: '/', component: Home },

    // Admin Routes
    {
        path: '/admin',
        component: Admin,
        meta: { requiresAuth: true },
        children: [{
            path: 'hero',
            component: Hero,
            meta: { requiresAuth: true, role: 'admin' },
        }, ],
    },
    { path: '/login', component: Login, meta: { hideNavbar: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Check authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login');
    }

    // Check role
    if (to.meta.role && to.meta.role !== authStore.role) {
        return next('/'); // Redirect ke home jika role tidak sesuai
    }

    next();
});

export default router;