import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js'; // Import router instance

createApp(App)
    .use(router) // Use the router here
    .mount('#app');