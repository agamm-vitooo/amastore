<template>
  <div class="flex h-screen">
    <!-- Sidebar hanya untuk admin -->
    <Sidebar
      v-if="role === 'admin'"
      :isMobileMenuOpen="isMobileMenuOpen"
      @closeMenu="toggleMenu"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <header v-if="!$route.meta.hideNavbar" class="bg-orange-500">
        <nav class="flex justify-between items-center p-4">
          <!-- Logo -->
          <div class="text-white font-bold text-xl">
            <img :src="logo" alt="Logo" class="h-8 w-auto rounded-full" />
          </div>

          <!-- Admin-specific Hamburger -->
          <div v-if="role === 'admin'" class="md:hidden">
            <button @click="toggleMenu" class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <!-- Non-admin Desktop Menu -->
          <div v-if="role !== 'admin'" class="hidden md:flex space-x-6">
            <router-link to="/profile" class="text-white hover:text-gray-300">
              Profile
            </router-link>
            <button @click="logout" class="text-white hover:text-gray-300">
              Logout
            </button>
          </div>

          <!-- Non-admin Mobile Menu Button -->
          <div v-if="role !== 'admin'" class="md:hidden">
            <button @click="toggleMenu" class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        <!-- Non-admin Mobile Menu -->
        <div
          v-if="isMobileMenuOpen && role !== 'admin'"
          class="absolute top-16 left-0 w-full bg-orange-500 z-50 flex flex-col items-start p-4 space-y-4"
        >
          <router-link to="/katalog" class="text-white hover:text-gray-300">
            Katalog
          </router-link>
          <router-link to="/about" class="text-white hover:text-gray-300">
            About
          </router-link>
          <router-link to="/contact" class="text-white hover:text-gray-300">
            Contact Us
          </router-link>
          <button @click="logout" class="text-white hover:text-gray-300">
            Logout
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import logo from "../assets/amastore.jpg";
import Sidebar from "../admin/components/Sidebar.vue";
import { useAuthStore } from "../store/auth.js";

export default {
  name: "Navbar",
  components: { Sidebar },
  data() {
    return {
      isMobileMenuOpen: false,
      logo,
    };
  },
  computed: {
    role() {
      const authStore = useAuthStore();
      return authStore.role; // Ambil role dari store
    },
  },
  methods: {
    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
};
</script>

<style>
/* Tambahkan sedikit padding untuk menghindari konflik posisi fixed */
body {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}
</style>
