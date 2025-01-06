<template>
  <section class="hero min-h-screen flex items-center justify-center bg-gray-100">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-8">Hero CRUD</h1>

      <form @submit.prevent="handleSubmit" class="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            id="title" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            v-model="form.description" 
            id="description" 
            rows="3" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL</label>
          <input 
            v-model="form.imageUrl" 
            type="url" 
            id="imageUrl" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            required
          />
        </div>
        <div class="mb-4">
          <label for="ctaButtonText" class="block text-sm font-medium text-gray-700">CTA Button Text</label>
          <input 
            v-model="form.ctaButtonText" 
            type="text" 
            id="ctaButtonText" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            required
          />
        </div>
        <div class="mb-4">
          <label for="ctaButtonLink" class="block text-sm font-medium text-gray-700">CTA Button Link</label>
          <input 
            v-model="form.ctaButtonLink" 
            type="url" 
            id="ctaButtonLink" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            required
          />
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          {{ editMode ? 'Update Hero' : 'Add Hero' }}
        </button>
      </form>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in heroes" :key="item.id" class="bg-white p-4 rounded-lg shadow-md">
          <img :src="item.imageUrl" alt="Hero Image" class="w-full h-48 object-cover rounded-t-lg" />
          <h2 class="text-xl font-bold mt-4">{{ item.title }}</h2>
          <p class="text-gray-600 mt-2">{{ item.description }}</p>
          <a :href="item.ctaButtonLink" class="text-blue-500 font-medium mt-4 block">{{ item.ctaButtonText }}</a>
          <div class="flex justify-between mt-4">
            <button 
              @click="editHero(item)" 
              class="text-yellow-500 hover:text-yellow-600">Edit</button>
            <button 
              @click="deleteHero(item.id)" 
              class="text-red-500 hover:text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Hero',
  data() {
    return {
      heroes: [],
      form: {
        id: null,
        title: '',
        description: '',
        imageUrl: '',
        ctaButtonText: '',
        ctaButtonLink: ''
      },
      editMode: false
    };
  },
  methods: {
    async fetchHeroes() {
      try {
        const response = await axios.get('http://localhost:5000/api/hero');
        this.heroes = response.data;
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    },
    async handleSubmit() {
      try {
        if (this.editMode) {
          await axios.put(`http://localhost:5000/api/hero/${this.form.id}`, this.form);
        } else {
          await axios.post('http://localhost:5000/api/hero', this.form);
        }
        this.resetForm();
        this.fetchHeroes();
      } catch (error) {
        console.error('Error saving hero:', error);
      }
    },
    editHero(hero) {
      this.form = { ...hero };
      this.editMode = true;
    },
    async deleteHero(id) {
      try {
        await axios.delete(`http://localhost:5000/api/hero/${id}`);
        this.fetchHeroes();
      } catch (error) {
        console.error('Error deleting hero:', error);
      }
    },
    resetForm() {
      this.form = {
        id: null,
        title: '',
        description: '',
        imageUrl: '',
        ctaButtonText: '',
        ctaButtonLink: ''
      };
      this.editMode = false;
    }
  },
  mounted() {
    this.fetchHeroes();
  }
};
</script>

<style scoped>
.hero {
  background-color: #f9fafb;
}
</style>