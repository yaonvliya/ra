import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store/index'
import publicMethods from './utils/public-methods.js'
import "amfe-flexible" // 引入flexible
import './assets/icons/iconfont.css';
import './static/js/resize.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.prototype.$publicMethods = publicMethods

//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
//test
