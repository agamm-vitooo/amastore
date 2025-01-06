<template>
  <aside
    v-if="role === 'admin'"
    class="text-white bg-gray-900 w-64 h-screen fixed md:relative"
    :class="{ 'hidden md:block': !isMobileMenuOpen }"
  >
    <div class="p-4 bg-gray-900">
      <h2 class="text-xl font-bold">Admin Menu</h2>
    </div>
    <nav class="mt-4">
      <router-link
        v-if="role === 'admin'"
        to="/admin/hero"
        class="block py-2 px-4 hover:bg-gray-700"
      >
        Hero
      </router-link>
      <button
        @click="logout"
        class="block w-full text-left py-2 px-4 bg-orange-500 mt-6 hover:active:bg-orange-700"
      >
        Logout
      </button>
    </nav>
  </aside>
</template>

<script>
import { useAuthStore } from "../../store/auth.js";

export default {
  name: "Sidebar",
  props: {
    isMobileMenuOpen: Boolean,
  },
  computed: {
    role() {
      const authStore = useAuthStore();
      return authStore.role; // Ambil role dari store
    },
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
};
</script>
