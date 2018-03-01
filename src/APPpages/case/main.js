import Vue from 'vue'
import MintUI from 'mint-ui'
import VueRouter from 'vue-router'
import Ehomy from '../../APPcommon/modules/public.js'
import App from './app.vue'
import 'mint-ui/lib/style.css'
import '../../APPcommon/style/main.scss'


Vue.use(MintUI);
Vue.use(VueRouter);
new Vue({
    el:'#app',
    router,
    render:(h) => h(App)
});