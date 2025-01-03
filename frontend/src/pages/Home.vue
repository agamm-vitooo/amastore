<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-blue-500">Welcome to the Home Page</h1>
      <p class="mt-4 text-lg text-gray-700">This is the homepage of our application.</p>
      <router-link to="/about" class="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Go to About Page
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
</style>
