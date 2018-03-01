import Vue from 'vue'
import MintUI from 'mint-ui'
import router from '../../APPcommon/modules/route'
import Ehomy from '../../APPcommon/modules/public.js'
import App from './app.vue'
import 'mint-ui/lib/style.css'
import '../../APPcommon/style/main.scss'

Vue.use(MintUI);
new Vue({
    el:'#app',
    router,
    render:(h) => h(App)
});


Ehomy.initTitle('首页');

