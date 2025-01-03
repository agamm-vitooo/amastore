// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false, // Default: tidak login
    }),
    getters: {
        role: (state) => (state.isAuthenticated ? "admin" : "client"),
    },
    actions: {
        login() {
            this.isAuthenticated = true;
        },
        logout() {
            this.isAuthenticated = false;
        },
    },
});