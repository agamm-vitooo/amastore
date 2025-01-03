import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Proxy ke backend Express
                changeOrigin: true, // Menyesuaikan header `Host` sesuai dengan target
                rewrite: (path) => path.replace(/^\/api/, ''), // Menghapus prefix '/api' jika diperlukan
            },
        },
    },
});