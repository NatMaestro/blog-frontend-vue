<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-10">Blogs</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articles" :key="article.id" class="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">
          {{ article.title }}
        </h2>
        <p class="text-gray-600 mb-4">Published by <span class="font-bold px-10 ml-3 rounded-lg bg-gray-300">{{ article.author }}</span></p>
        <router-link :to="{ name: 'details', params: { slug: article.slug } }" class="text-blue-500 hover:text-blue-700">
          Read more
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios'; // Adjust the path based on your file structure

export default {
  data() {
    return {
      articles: [],
      bgColors: [
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-pink-500',
      ],
    }
  },
  methods: {
    async getAllArticles() {
      try {
        // // Retrieve the token from localStorage
        // const token = localStorage.getItem('token');
        // console.log('token', token)

        // if (!token) {
        //   throw new Error("No authentication token found");
        // }

        // CSRF token setup and adding Authorization header
        // axios.defaults.withCredentials = true;

        // Fetch the articles with Authorization header
        const response = await axios.get('/api/articles/', {
            headers: {
              // 'Authorization': `Bearer ${token}`,  // Include token in headers
              'Content-Type': 'application/json',
            }
          })
          console.log('response', response)


        // Check if response is successful
        if (response.status === 200) {
          this.articles.push(...response.data)
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('An error occurred while fetching articles:', error);
      }
    }
  },
  mounted() {
    this.getAllArticles();
  }
}
</script>


<style scoped>
/* Scoped styles */
</style>
