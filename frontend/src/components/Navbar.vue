<template>
  <header v-if="!$route.meta.hideNavbar"> 
    <nav class="flex justify-between items-center p-4 bg-orange-500">
      <!-- Logo di kiri -->
      <div class="text-white font-bold text-xl">
        <img :src="logo" alt="Logo" class="h-8 w-auto rounded-full" />
      </div>

      <!-- Menu di kanan -->
      <div class="hidden md:flex space-x-6">
        <router-link to="/" class="text-white hover:text-gray-300">Home</router-link>
        <router-link to="/katalog" class="text-white hover:text-gray-300">Katalog</router-link>
        <router-link to="/about" class="text-white hover:text-gray-300">About</router-link>
        <router-link to="/contact" class="text-white hover:text-gray-300">Contact Us</router-link>

        <!-- Menu Admin (Hanya Ditampilkan Jika Login dan Role Admin) -->
        <template v-if="role === 'admin'">
          <router-link to="/admin/dashboard" class="text-white hover:text-gray-300">Dashboard</router-link>
          <router-link to="/admin/settings" class="text-white hover:text-gray-300">Settings</router-link>
          <button @click="logout" class="text-white hover:text-gray-300">Logout</button>
        </template>
      </div>

      <!-- Hamburger Menu untuk Mobile -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-orange-500 p-4">
      <router-link to="/" class="block text-white hover:text-gray-300 py-2">Home</router-link>
      <router-link to="/katalog" class="block text-white hover:text-gray-300 py-2">Katalog</router-link>
      <router-link to="/about" class="block text-white hover:text-gray-300 py-2">About</router-link>
      <router-link to="/contact" class="block text-white hover:text-gray-300 py-2">Contact Us</router-link>

      <!-- Menu Admin di Mobile (Hanya Ditampilkan Jika Login dan Role Admin) -->
      <template v-if="role === 'admin'">
        <router-link to="/admin/dashboard" class="block text-white hover:text-gray-300 py-2">Dashboard</router-link>
        <router-link to="/admin/settings" class="block text-white hover:text-gray-300 py-2">Settings</router-link>
        <button @click="logout" class="block text-white hover:text-gray-300 py-2">Logout</button>
      </template>
    </div>
  </header>
</template>

<script>
import logo from '../assets/amastore.jpg'; // Ganti dengan path gambar yang sesuai
import { useAuthStore } from "../store/auth.js";

export default {
  name: 'Navbar',
  data() {
    return {
      isMobileMenuOpen: false,
      logo, // Menyimpan logo dalam data
    };
  },
  computed: {
    role() {
      const authStore = useAuthStore();
      return authStore.role;
    },
    hideNavbar() {
      return this.$route.meta.hideNavbar;
    }
  },
  methods: {
    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus di sini jika diperlukan */
</style>
