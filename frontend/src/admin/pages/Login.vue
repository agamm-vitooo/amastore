<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-sm p-8 bg-white rounded shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-2 px-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            class="mt-2 px-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth', {
          email: this.email,
          password: this.password
        });
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          this.$router.push('/dashboard'); // Redirect ke halaman dashboard setelah login berhasil
        }
      } catch (error) {
        this.errorMessage = 'Invalid email or password';
      }
    }
  }
};
</script>

<style scoped>
</style>
