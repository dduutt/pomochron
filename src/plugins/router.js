import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Settings from '../components/Settings.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/settings', component: Settings }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
