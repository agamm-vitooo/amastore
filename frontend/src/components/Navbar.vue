<template>
  <header>
    <nav class="flex justify-between items-center p-4 bg-orange-500">
      <!-- Logo di kiri -->
      <div class="text-white font-bold text-xl">
        <img :src="logo" alt="Logo" class="h-8 w-auto rounded-full" />
      </div>

      <!-- Menu di kanan -->
      <div class="hidden md:flex space-x-6">
        <router-link to="/katalog" class="text-white hover:text-gray-300">Katalog</router-link>
        <router-link to="/about" class="text-white hover:text-gray-300">About</router-link>
        <router-link to="/contact" class="text-white hover:text-gray-300">Contact Us</router-link>
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
      <router-link to="/katalog" class="block text-white hover:text-gray-300 py-2">Katalog</router-link>
      <router-link to="/about" class="block text-white hover:text-gray-300 py-2">About</router-link>
      <router-link to="/contact" class="block text-white hover:text-gray-300 py-2">Contact Us</router-link>
    </div>
  </header>
</template>

<script>
import logo from '../assets/amastore.jpg'; // Ganti dengan path gambar yang sesuai

export default {
  name: 'Navbar',
  data() {
    return {
      isMobileMenuOpen: false,
      logo, // Menyimpan logo dalam data
    };
  },
  methods: {
    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus di sini jika diperlukan */
</style>
