<template>
    <nav class="bg-gray-900 w-full h-[80px] flex items-center">
      <div class="flex justify-between items-center text-white w-full m-10">
        <router-link class="font-bold text-2xl" to="/">BlogApp</router-link>
  
        <div>
          <ul class="flex gap-5">
            <router-link to="/">Home</router-link>
            <router-link to="/create">Create Article</router-link>
            <!-- Logout Button -->
            
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import {csrftoken} from '../csrf/csrf_token'
  export default {
    computed: {
      isAuthenticated() {
        console.log('localStorage', localStorage)
          return !!localStorage.getItem('token'); // Check if token exists in local storage
      },
    },
    methods: {
      logout() {
            localStorage.removeItem('token'); // Clear the token from local storage
            this.$router.push('/login'); // Redirect to login page
        },
    }

  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  