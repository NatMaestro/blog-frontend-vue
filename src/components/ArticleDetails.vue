<template>
    <div class="min-h-screen bg-gray-100 py-10 px-5">
    <!-- Blog Header Section -->
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-6">
        <!-- Blog Title -->
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          {{ article.title }}
        </h1>

        <!-- Author and Date -->
        <div class="mb-6 text-gray-600">
          <span>Publish By {{ article.author }}</span>
          <span class="mx-2">|</span>
          <span>{{ formattedDate }}</span>
        </div>

        <!-- Blog Content -->
        <div class="prose lg:prose-xl max-w-none">
          <p>{{ article.content }}</p>
        </div>
      </div>
      <ArticleActions :slug="article.slug" />
    </div>
  </div>
</template>


<script>
    import { csrftoken } from '../csrf/csrf_token'
    import axios from '../axios'; // Adjust the path based on your file structure
    import ArticleActions from '../components/ArticleActions.vue';
    export default {
        components: {
            ArticleActions
        },
        props: {
            slug: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                article: {}, // Initially, it's an empty object
                requestUser: null, //
                // loading: true, // To track the loading state
                // error: null // To handle any errors
            }
        },
        methods: {
                async getArticle() {
                    try {
                        const response = await axios.get(`/api/articles/${this.slug}`, {
                            headers: {
                            // 'Authorization': `Bearer ${token}`,  // Include token in headers
                            'Content-Type': 'application/json',
                            }
                        })

                        // const contentType = response.headers.get("content-type");

                        // if (!response.ok) {
                        //     throw new Error(`HTTP error! status: ${response.status}`);
                        // }
                        console.log('data', response)
                        this.article =response.data;

                        // if (contentType && contentType.includes("application/json")) {
                        //     // It's JSON, so parse it
                        //     const articles = await response.data;

                        //     // Find the article with the matching slug
                        //     const matchedArticle = articles.find(article => article.slug === this.slug);

                        //     if (matchedArticle) {
                        //         this.article = matchedArticle;  // Set the article if found
                        //     } else {
                        //         alert("Article not found.");
                        //     }
                        // } else {
                        //     // It's not JSON, likely HTML (could be an error page)
                        //     const errorText = await response.text();
                        //     console.error("Received non-JSON response:", errorText);
                        //     throw new Error("Expected JSON response but received HTML.");
                        // }
                    } catch (error) {
                        console.error('Error fetching articles:', error.message);
                        alert("Failed to load articles.");
                    }
                },
                // getUserRequest() {
                //     // Fetch the authenticated user's information
                //     this.requestUser = localStorage.getItem("username")
                // }
            },
            computed: {
                // IsAuthor() {
                //     return this.article.author === this.requestUser
                // },
                formattedDate() {
                const dateString = this.article.created_at;
                if (!dateString) return 'N/A';  // Handle missing date
                
                const date = new Date(dateString);  // Parse the ISO date string
                if (isNaN(date.getTime())) {
                    return 'Invalid Date';  // Handle invalid date
                }
                
                return new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,  // Display time in 12-hour format with AM/PM
                }).format(date);
            }
        },

            mounted() {
                this.getArticle()
                // this.getUserRequest()
            },
    }
</script>

<style lang="scss" scoped>
/* Scoped styles */
</style>
