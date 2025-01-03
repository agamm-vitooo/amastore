<template>
  <div class="flex justify-center items-center h-screen px-4 sm:px-0">
    <div class="w-full max-w-sm p-6 bg-white rounded-xl shadow-md sm:p-8">
      <h2 class="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-4 sm:mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-2 px-4 py-2 w-full bg-gray-200 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-2 px-4 py-2 w-full border bg-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from "../../store/auth.js";
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth', {
          email: email.value,
          password: password.value
        });
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          authStore.login(); // Menyimpan status login di store
          router.push('/admin'); // Redirect ke halaman dashboard setelah login berhasil
        }
      } catch (error) {
        errorMessage.value = 'Invalid email or password';
      }
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin
    };
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
