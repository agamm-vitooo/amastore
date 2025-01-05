<template>
  <div class="flex flex-col min-h-screen bg-white">
    <div class="flex flex-col sm:flex-row flex-grow">
      <!-- Left Side: Login Form -->
      <div class="w-full sm:w-1/2 flex justify-center items-center px-4 sm:px-0">
        <div class="w-full max-w-sm p-6 rounded-xl sm:p-8">
          <div class="flex justify-center items-start mb-4">
            <img :src="logo" alt="Amastore Logo" class="w-24 h-24 rounded-2xl" />
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Login</h2>
          <p class="text-sm text-gray-500 mb-6">Welcome back! Please enter your credentials to access your account.</p>
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="mt-2 px-4 py-2 w-full bg-gray-100 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>
            <div class="mb-6 relative">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                class="mt-2 px-4 py-2 w-full bg-gray-100 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="********"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label="Toggle password visibility"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825a10.05 10.05 0 01-3.875.675c-2.5 0-4.775-.875-6.7-2.25C1.875 15.55 1 13.775 1 12s.875-3.55 2.3-4.875C5.3 5.875 7.575 5 10.075 5c1.175 0 2.3.225 3.375.675M21 21l-7-7m2-4.5c0-3-1.5-5.25-4.125-6.375m0 0L13.5 3" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c2.032 0 3.952.593 5.535 1.618m3.007 3.264C20.568 16.058 16.477 19 12 19c-4.477 0-8.268-2.943-9.542-7m18.084 0C20.268 7.943 16.477 5 12 5m-5.535 1.618a10.042 10.042 0 011.47 1.247M20.243 15.422a10.042 10.042 0 01-1.47 1.247" />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
          <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
        </div>
      </div>

      <!-- Right Side: Background and Content -->
      <div class="w-full sm:w-1/2 bg-orange-500 flex flex-col items-center justify-center p-6">
        <img :src="imageSrc" alt="Illustration" class="mb-4 w-3/4 sm:w-2/3 md:w-1/2 h-auto" />
        <div class="text-left text-white mt-4">
          <h3 class="font-thin text-base mb-2">Amastore</h3>
          <p class="font-medium text-xl">Your journey to sustainable fashion starts here. Discover unique thrift treasures and make a difference today!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from "../../store/auth.js";
import axios from 'axios';
import { useRouter } from 'vue-router';

import imageSrc from '../../assets/undraw_fashion-blogging_wfoz.svg';
import logo from '../../assets/amastore.jpg'; 

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
  try {
    const requestData = {
      email: email.value,
      password: password.value
    };

    // Kirim request ke API
    const response = await axios.post('http://localhost:5000/api/auth', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      authStore.login(); 
      router.push('/admin');
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message || 'Invalid email or password';
    } else {
      errorMessage.value = 'Something went wrong. Please try again later.';
    }
  }
};

    return {
      email,
      password,
      errorMessage,
      showPassword,
      togglePasswordVisibility,
      handleLogin,
      imageSrc,
      logo
    };
  }
};
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>
