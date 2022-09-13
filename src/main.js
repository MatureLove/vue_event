import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less' // 全局初始化样式
import '@/elementUI/index' // 注册element全局组件
import '@/quile/index' // 引入vue-quill-editor富文本组件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
