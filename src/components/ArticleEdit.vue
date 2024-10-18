<template>
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-5">Update Article</h1>
      <form @submit.prevent="submitArticle">
        <!-- Title Input -->
        <div class="mb-4">
          <label for="title" class="block text-xl font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            v-model="article.title"
            class="w-full px-4 py-2 border-2 rounded-md"
            placeholder="Enter article title"
            required
          />
        </div>
  
        <!-- Body Textarea -->
        <div class="mb-6">
          <label for="body" class="block text-xl font-semibold mb-2">Article Body</label>
          <textarea
            id="body"
            v-model="article.content"
            class="w-full px-4 py-2 border-2 rounded-md h-40"
            placeholder="Write your article content"
            required
          ></textarea>
        </div>
  
        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Update Article
        </button>
      </form>
    </div>
  </template>
  
  <script>
    import { csrftoken } from '../csrf/csrf_token'
    import axios from '../axios'; // Adjust the path based on your file structure
  
  export default {
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data() {
      return {
        article: {
          title: '',
          content: ''
        }
      };
    },
    async beforeRouteEnter(to, from, next) {  
    if (to.params.slug) {
        try {
            const response = await axios.get(`/api/articles/${to.params.slug}/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
          next(vm => {
            // Set the article data in the component's state
            vm.article.title = response.data.title;
            vm.article.content = response.data.content;
          });
        })
        } catch (error) {
            console.error('Error fetching article:', error);
            alert('Failed to fetch article. Please check the console for details.');
            next();
        }
    } else {
        next();
    }
},

    methods: {
      async submitArticle() {
        if (this.article.title === '' || this.article.content === '') {
                    alert('Please fill in all required fields');
                    return;
                }
                try {
                    const response = await axios.put(
                      `/api/articles/${this.slug}/`,this.article, {
                        headers: {
                            'Content-Type': 'application/json',
                        },

                    });

                    // if (!response.ok) {
                    //     throw new Error('Error updating article');
                    // }

                    // const data = await response.json();
                    // console.log('Article updated:', data);
                    // Optionally, navigate to a different page or show a success message
                    this.$router.push('/');  // Redirect to home after submission
                    alert('Article updated successfully!');
                } catch (err) {
                    console.error(err);
                    alert('Failed to update the article');
                }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  