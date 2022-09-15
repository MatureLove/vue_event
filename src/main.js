import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less' // 全局初始化样式
import '@/elementUI/index' // 注册element全局组件
import '@/quile/index' // 引入vue-quill-editor富文本组件
import dayjs from 'dayjs' // 导入dayjs
Vue.config.productionTip = false
// 定义时间格式化对象
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
