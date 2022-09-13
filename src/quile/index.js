import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor' // 引入vue-quill-editor

// 引入 styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 全局注册富文本编辑器
Vue.use(VueQuillEditor)
