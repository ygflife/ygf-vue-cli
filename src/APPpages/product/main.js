import Vue from 'Vue'
import MintUI from 'mint-ui'
import VueRouter from 'vue-router'
import Ehomy from '../../APPcommon/modules/public.js'
import App from './app.vue'
import 'mint-ui/lib/style.css'
import '../../APPcommon/style/main.scss'

Ehomy.initTitle('产品列表');
function cl(obj){
    console.log(obj)
}

import Detail from '../../APPcommon/components/productDetail.vue'
const routes = [
    {
        path:'/details/:id',
        component:Detail,
    }
];
const router  = new VueRouter({
    routes
});

Vue.use(MintUI);
Vue.use(VueRouter);
new Vue({
    el:'#app',
    router,
    render:(h) => h(App)
});