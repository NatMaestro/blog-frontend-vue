import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import CreateArticle from "./components/CreateArticle.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import ArticleDetails from "./components/ArticleDetails.vue";
import ArticleEdit from "./components/ArticleEdit.vue";

const routes = [
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: Login
    // },
    // {
    //     path: "/signup",
    //     name: "Sign Up",
    //     component: SignUp
    // },
    {
        path: "/",
        name: "Home",
        component: Home,
        // meta: { requiresAuth: true } // Add this line to protect the Home route
    },
    {
        path: "/create",
        name: "Create",
        component: CreateArticle,
        // meta: { requiresAuth: true } // Protect Create route as well
    },
    {
        path: "/details/:slug",
        name: "details",
        component: ArticleDetails,
        props: true,
        // meta: { requiresAuth: true } // Protect Create route as well
    },
    {
        path: "/edit/:slug",
        name: "article-edit",
        component: ArticleEdit,
        props: true,
        meta: { requiresAuth: true } // Protect Create route as well
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard to protect routes
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = !!localStorage.getItem('token'); // or your preferred method of checking authentication
//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next({ name: 'Login' });
//     } else {
//         next();
//     }
// });

export default router;
