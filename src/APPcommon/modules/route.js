import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import detail from '../components/productDetail.vue'

const routes = [
    { path: '/home', component: home},
    { path: '/detail/:id', component: detail},
];

const router = new VueRouter({
    routes
});
Vue.use(VueRouter);
export default router;