import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
    path: '/',
    name: 'home',
    component: require('./components/Home.vue').default
}]




const router = createRouter({
    history: createWebHistory(process.env.BASH_URL),
    routes
});

export default router;