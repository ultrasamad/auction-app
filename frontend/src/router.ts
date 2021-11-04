import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import ProductDetail from "./views/ProductDetail.vue";
import useAuth from "./hooks/useAuth";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            layout: "site",
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            layout: "default",
            requiresAuth: false,
        },
    },
    {
        path: "/products/:id",
        name: "product.details",
        component: ProductDetail,
        meta: {
            layout: "site",
            requiresAuth: true,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
            layout: "dashboard",
            requiresAuth: true,
        }
    },
];

const router =  createRouter({
    history: createWebHistory(),
    routes,
});


const { isAuthenticated } = useAuth();
router.beforeEach((to, from) => {
    if(to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            return '/login';
        }
    }
});

export default router;