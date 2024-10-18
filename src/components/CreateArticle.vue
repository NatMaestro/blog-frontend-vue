<template>
    <div class="container mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 class="text-4xl font-bold text-center mb-6">Create New Article</h1>
        <form @submit.prevent="submitArticle">
            <!-- Title Input -->
            <div class="mb-6">
                <label for="title" class="block text-xl font-semibold mb-2">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    v-model="article.title" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter article title"
                    required
                />
            </div>

            <!-- Author Input -->
            <div class="mb-6">
                <label for="author" class="block text-xl font-semibold mb-2">Author</label>
                <input 
                    type="text" 
                    id="author" 
                    v-model="article.author" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter author's name"
                    required
                />
            </div>

            <!-- Body Textarea -->
            <div class="mb-6">
                <label for="body" class="block text-xl font-semibold mb-2">Article Body</label>
                <textarea 
                    id="body" 
                    v-model="article.content" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm h-40 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Write your article content"
                    required
                ></textarea>
            </div>
            
            <!-- Submit Button -->
            <div class="text-center">
                <button 
                    type="submit" 
                    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    Publish Article
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from '../axios'; // Adjust the path based on your file structure
    import { csrftoken } from '../csrf/csrf_token';  // Ensure csrf_token module is properly set up

    export default {
        data() {
            return {
                article: {
                    title: '',
                    author: '',  // Add author field
                    content: ''
                }
            };
        },
        methods: {
            async submitArticle() {
                // Validate form fields
                if (this.article.title === '' || this.article.content === '' || this.article.author === '') {
                    alert('Please fill in all required fields');
                    return;
                }

                try {
                    // Make POST request with CSRF token included
                    const response = await axios.post(
                        '/api/articles/',  // Your API endpoint
                        this.article,      // Data to send
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': csrftoken   // Include CSRF token in headers
                            }
                        }
                    );

                    // If successful, redirect or notify user
                    this.$router.push('/');  // Redirect to home page
                    alert('Article created successfully!');

                } catch (err) {
                    console.error('Error creating article:', err);
                    alert('Failed to create the article');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9; /* Light gray background */
}

input, textarea {
    border: 1px solid #ccc;
    outline: none;
}

input:focus, textarea:focus {
    border-color: #3182ce;
}

button:focus {
    outline: none;
}
</style>
