<template>
    <div class="login-container">
      <h2 class="text-3xl mb-8 font-bold">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Enter your username"
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
  
        <button type="submit" class="btn">Login</button>

        <p class="mt-5 ">Don't have an account? <span class="text-blue-600 ml-3"> <router-link to="/signup" >Sign Up</router-link></span></p>
  
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
import axios from '../axios'; // Adjust the path based on your file structure

  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
        async login() {
            try {
                // CSRF token setup
                axios.defaults.withCredentials = true;
                // axios.defaults.headers.common['X-CSRFToken'] = this.getCSRFToken();

                const response = await axios.post(
                    '/api/token-auth/',
                    {
                        username: this.username,
                        password: this.password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                // Handle successful login, e.g., save user data and redirect
                console.log('Login successful', response.data);
                localStorage.setItem('token', response.data.token); // Save the token or relevant user data
                this.$router.push('/'); // Redirect to home or dashboard
            } catch (error) {
                console.error('Login failed', error);
                this.errorMessage = 'Invalid username or password. Please try again.';
            }
        },
    }

    // methods: {
    //   async login() {
    //     try {
    //       // CSRF token setup
    //       axios.defaults.withCredentials = true;
    //       axios.defaults.headers.common['X-CSRFToken'] = this.getCSRFToken();
  
    //       const response = await axios.post(
    //         'http://localhost:8000/accounts/login/',
    //         {
    //           username: this.username,
    //           password: this.password,
    //         },
    //         {
    //           headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //         }
    //       );
  
    //       // Handle successful login, e.g., redirect or save user data
    //       console.log('Login successful', response.data);
    //       this.$router.push('/dashboard'); // Redirect to dashboard or another page
    //     } catch (error) {
    //       // Handle login errors
    //       console.error('Login failed', error);
    //       this.errorMessage = 'Invalid username or password. Please try again.';
    //     }
    //   },
    //   getCSRFToken() {
    //     const name = 'csrftoken';
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //       const cookies = document.cookie.split(';');
    //       for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.substring(0, name.length + 1) === name + '=') {
    //           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //           break;
    //         }
    //       }
    //     }
    //     return cookieValue;
    //   },
    // },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .btn {
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  