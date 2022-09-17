# 软件准备

1. 问题: 新的电脑上, 需要准备哪些软件, 我们才能开发vue项目?
   * VSCode -> 写代码
     * Vetur插件 (让.vue文件代码高亮)
     * VueHelper插件 (有些代码块, 补全代码)
     * ESLint插件 (帮我们根据打开项目文件夹根目录eslintrc配置检查和修复问题)
   * Node环境 -> 为了得到node命令和npm命令, 下载全局包, 得到一些扩展命令
     * 下载@vue/cli全局包(一次)(得到vue命令, 用于创建脚手架项目)
   * 谷歌浏览器
     * 查看我们写完的项目, 运行html网页
     * vue-devtool插件 -> 调试开发环境下vue项目, 直接看变量值...
   * git软件 -> 管理代码版本/和别人合并代码
   * 接口文档
   * 项目设计图

# 项目

## 工具准备

1. 问题: 如何创建一个脚手架项目?

   * 前提: 需要确保你正确安装@vue/cli全局包并得到vue命令一次

     > yarn global add @vue/cli  
     >
     >  npm i @vue/cli -g

   * 创建命令

     > vue create 脚手架文件夹名

2. 问题: 用yarn或者npm如何运行**项目带**的自定义命令?

   * 前提: 自定义命令在package.json(包清单文件)里 scripts选项定义的, 右侧才是真正执行的命令

   * 前提: 你敲击命令时, 终端所在文件夹, 应该是package.json所在的文件夹(项目文件夹)

     > yarn 自定义命令
     >
     > npm run 自定义命令

3. 问题: 什么是ESLint?

   * 代码检查工具 (本质上: 它是脚手架环境带的包和配置, 也是一些代码)
   * 运行在哪2个地方?
     * webpack开发服务器环境下(终端)
     * vscode+eslint插件, 编写代码区域
   * 如何让vscode自动修复一些问题?
     * vscode打开项目的根目录(eslint插件要用根目录下eslintrc.js文件规则)
     * eslint插件填入配置
     * 按ctrl+s可以修复此文件的一些语法问题



## 框架准备

> 代码相关

### 组件库

1. 什么是组件库?
   * 别人封装好的标签样式和一些vue功能代码, 多个组件形成的一个仓库(其实也是一个包)
2. 项目为何要使用组件库?
   * 用它封装好的标签和样式和Vue代码, 快速的搭建我的项目
3. 是否所有的项目都适用组件库?
   * 你要做的项目设计图(标签+样式)和现有的组件库比较贴合, 才能使用贴合的这个组件库

4. 是否采用组件库? 用的是哪个? 如何使用?
   * 采用的是ElementUI组件库, 根据文档说明, 下载并引入到项目代码中, 全局注册了组件

### 网络请求库

1. 采用的是哪个网络请求的库?

   * axios库

2. 项目里是如何管理网络请求的?

   * 下载axios包到当前项目文件夹中
   * 封装request请求函数并配置基地址
   * 封装api统一接口方法
   * 在逻辑页面, 需要用到哪个就引入后调用等待请求后的结果, 在逻辑页面使用后台返回的数据

   

## 管理准备

> 项目代码版本管理工具: git

1. 自己新建, 新项目, 确保有什么文件夹?

   * 项目文件夹下, 有隐藏.git文件夹 (它里面记录了你所有的版本提交, 远程仓库相关配置)

   * 如果没有则运行如下命令, 初始化一个

     > git init

2. 别人的/克隆的项目, 我们需要git init吗?
   * 不需要的, 因为项目已经拥有了git本地仓库

### 拿到

1. 如果旧项目(进公司第一件事)? 如何得到别人的项目代码?

   * 先知道git远程仓库的地址

   * 本机新建空白的文件夹, 敲击如下命令, 第一次克隆

     > git clone 远程仓库git地址

2. 克隆命令是做什么的呢?

   * 把远程仓库git地址位置对应的代码+它里面所有之前提交记录都下载到本地
   * 注意
     * https开头的地址, 如果是公开的仓库, 可以直接克隆
     * https开头的地址, 如果是私有的仓库, 你必须要在git仓库网站注册账号, 让管理员拉你进组, 才能克隆
     * git@开头的地址, 如果是公开的仓库,  你必须要在git仓库网站注册账号, 并把本机电脑和远程网站账号配置ssh秘钥, 才能克隆
     * git@开头的地址, 如果是私有的仓库, 同上后, 还要让管理员拉你的账号进项目组, 才能克隆

3. 如果远程仓库有更新, 如何拿到更新以后的内容到本地?

   * 如果本地无变更

     > git pull

   * 如果本地有变更

     > git add .
     >
     > git commit -m '写点你本次提交了什么, 注释, 为了方便以后回滚到这里查看的注释' 
     >
     > **注释: 提交一次就会在本地git仓库里出现一次提交保存的记录(本时间节点的代码记录一次快照)**
     >
     > git pull
     >
     > **注释: git pull以后会把远程更新和本地的更新合并到一个项目内, 所以冲突很可能发生在这个命令后**



### 推送

1. 本机, 每次写完一个功能, 本地提交一次, 暂时不上传到远程仓库?

   > git add .
   >
   > git commit -m '注释'

2. 如果你今日代码写完了, 你本地git记录有很多次, 一次性, 保存到远程仓库上?

   * 本地仓库第一次新建的, 无远程仓库配置

     > git remote add origin 远程仓库git地址
     >
     > git push -u origin master
     >
     > **注释: 把本地master主分支所有提交记录, 推送到远程仓库的master主分支上, -u配置一条通道以后直接本地在master分支时, 可以直接git push即可**

   * 之前本地仓库已经配置好了, 远程仓库的地址

     > git push





# 代码问题

## 包和模块的使用

1. 什么叫做包?

   * 多个模块组成的一个文件夹, 默认会有出口文件和导出, 让别人引入它封装的代码使用

2. 什么叫模块?

   * 封装的一些属性和方法的文件 / webpack是一个静态模块打包工具(每个文件都会被认为是一个模块)
   * 特点: js模块需要导出, 别的文件想要使用其内部的东西需要导入
   * 模块导出和导入的语法
     * 默认导出: export default 对象/函数
     * 默认导入: import 变量名 from '模块标识' (自己模块相对路径开头, 第三方直接写模块名)
     * 命名导出: export 变量声明
     * 命名导入: import { 同名变量 } from '模块标识' 
     * 无导出: 直接一个文件
     * 直接导入: import '模块标识' (常常为了让目标文件参与运行)

3. 问题: npm或yarn如何下包?

   > yarn add 包名
   >
   > npm i 包名

4. 问题: 如何在下包的时候, 指定版本?

   * 前提: npmjs.com网站搜下这个包有哪些版本 / 通过百度, 笔记得知适配版本

   > yarn add 包名@版本号
   >
   > npm i 包名@版本号

5. 问题: 下的包都在哪里呢?

   * 在node_modules下

6. 问题: 下的包如何在工程里使用?

   * 在需要使用的文件中, 用import引入过来

7. 问题: yarn和npm下的包, 用import引入, 但是浏览器不能直接识别import语法, 我们下的包是如何作用在html网页里的呢?

   * webpack构建工具, 翻译预执行你的代码, 然后把打包后的代码放到html中运行

8. 问题: 如果你拿到别人的项目, 发现没有node_modules, 怎么办?

   * 一定要确保终端在项目文件夹下, 敲击如下命令

   > yarn
   >
   > npm i

   * 作用: 它会根据敲击命令时, 所在文件夹下package.json里记录的包名和版本, 帮你挨个下载到当前工程文件夹下node_modules里 (精简: 就是下载本项目需要的所有第三方包)

## Vue.use作用

> 它其实为了给Vue扩展一些功能, 给Vue添加插件

```js
Vue.use((Vue) => {
    Vue.prototype.$a = 10
    Vue.pprototype.$message = () => {}
    Vue.component()
    Vue.directive()
    // ...
})
Vue.use({
    install(Vue) {
        Vue.prototype.$a = 10
        Vue.pprototype.$message = () => {}
        Vue.component()
        Vue.directive()
        // ...
    }
})

// 我们把函数或者对象带install方法的交给Vue.use方法内部, 它会调用你的函数/install方法回传过来vue类
// 那你可以在函数内给Vue添加一些全局功能, 全局属性, 全局方法, 全局组件, 全局自定义指令......
```

## vue代码里使用其他文件

1. style和template标签里直接写路径即可, webpack分析到路由后, 会把目标文件当做模块引入和打包处理并转换真实路径

2. js里, 我们需要自己显示写出import语句来引入其他的模块文件(例如图片), 引入后数据我们才能赋予到template里标签上

   > 特殊: 如果图片是外链, 字符串直接使用后, 浏览器发现http:// 直接请求外部服务器地址, 就不会有问题
   >
   > 如果图片是相对路径, 必须在当前服务器环境下, 保证运行时相对路径正确



## vuex如何使用

> 语法太多: 一定要画图

store只能是唯一的一个

state里定义全局状态变量

mutations里唯一同步修改state里的值

> 用 store.commit('要触发的mutations函数名')  触发mutations里函数执行

actions里定义异步代码(一般调用后端接口, 然后把值commit给mutations)

> 用 store.dispatch('要触发的actions函数名') 触发actions里函数执行

modules: 分模块+开启命名空间



## el-form表单数据问题

el-form在第一次创建并挂载的时候, 会使用model对应数据对象值, 复制到内部作为初始值 (这个值以后不会受到影响)

接着调用resetFields()方法, 它会用model绑定的初始值来重置



问题: 先给了要编辑的值, 再让el-form出现, 它用到了要编辑的值作为默认值, 置空不掉

解决: 让回显的值稍微慢点执行



# 经验问题

## 图片文件

1. 前端项目中, 如何让用户看到一个美观的按钮, 点击后能选择文件?
   * 准备原生input[type=file]标签并用css方式隐藏掉
   * 再准备美观按钮绑定点击事件, 在事件方法中获取到input标签, 并用js触发它的点击事件, 导致它的选择窗口默认行为出现
   * 给input绑定change事件, 等待它选择后通过事件对象.target.files拿到文件数组

2. 如果用户选择的是图片文件, 如何做**纯前端的预览**?

   前提: img标签的src属性的值, 只能是图片base64字符串(data:image/png格式开头的) 或者是 图片链接地址

   * 图片文件 -> 图片base64字符串

     ```js
     const fr = new FileReader()
     fr.readAsDataURL(files[0]) // 传入文件对象开始读
     fr.onload = (e) => { // onload等待把文件读成base64字符串后会触发onload事件函数
         // e.target.result的值就是读完的结果
         this.avatar = e.target.result // 赋予给变量, 让他显示在img的src里
     }
     ```

   * 图片文件 -> 前端临时地址

     > 注意: 此地址只能在浏览器本地使用, 不能传给后台

     ```js
     URL.createObjectURL(files[0])
     ```

3. 如何把图片文件传递给后台?

   * 图片base64字符串

     * 可以用application/json的格式, 传递json字符串给后台
     * 可以用formData, 传递表单数据给后台

   * 图片文件本身直接发给后台

     * 可以用formData, 传递表单数据给后台

     ```js
     const fd = new FormData() // 准备一个表单数据对象的容器 FormData类是HTML5新出的专门为了装文件内容和其他的参数的一个容器
     // fd.append('参数名', 值)
     fd.append('title', this.pubForm.title)
     fd.append('cate_id', this.pubForm.cate_id)
     fd.append('content', this.pubForm.content)
     fd.append('cover_img', this.pubForm.cover_img) // 文件对象
     fd.append('state', this.pubForm.state)
     ```

4. 后台返回的图片路径, 为何只有后半段?

   * 防止以后后台服务器域名更改, 频繁切换的麻烦
   * 后端告诉前端前缀固定地址, 让前端请求时自己拼接即可

## 组件默认值问题

1. 效果: 控制台里报错了, 但是效果还出来了

   > 具体分析

   知识点: 组件在创建和挂载时, 会先使用data里变量默认值, 让template标签渲染一次, 可能你取到的undefined导致了报错

   接着, 网络请求的数据稍后回来了, 会让使用此变量的标签重新更新, 所以效果出现了

   解决: v-if先让没有数据的时候, 标签不去加载默认值防止报错, 等数据回来后, v-if为true, 标签再创建执行

## 函数形参的对象解构赋值

1. 不解构, 正常传递

   ```js
   const getListFn = (obj) => {
       // 在函数内使用接收到的对象的属性
      console.log(obj.name)
      console.log(obj.age)
      console.log(obj.sex)
   }
   
   const perObj = {
       name: '老李',
       age: 18,
       sex: '男'
   }
   
   getListFn(perObj)
   ```

2. 函数形参如果是个对象, 那解构一下

   > 函数内, 用对象变量一个个点我决得有点麻烦

   > 目标: 我想用3个变量, 分别提取对象里同名属性的值

   ```js
   const getListFn = ({ name: name, age: age, sex: sex, 同名key: 变量名 }) => {
      // 本来用一个变量接收一个大对象
      // obj = { name: '老李', age: 18, sex: '男' }
      // 正常写解构赋值(快速提取对象里属性的值)
      // 知识点1: 解构赋值语法:
      // { key名: 变量名 } = { key名: 值 }
      // 运行时效果: 变量名里装的, 会是右侧赋予给左边的值
       
       
      // 套用一下
      // { name: name1, age: age1, sex: sex1  } = { name: '老李', age: 18, sex: '男' }
      // name1的值: '老李'
      
       
      // 变量名能随便起, 我想简化一下
      // 知识点2: key和value变量名同名可以简写
      // { name: name, age: age, sex: sex } = { name: '老李', age: 18, sex: '男' }
      // name的值: '老李'
      
      // 简写
      // { name, age, sex } = { name: '老李', age: 18, sex: '男' }
      // 效果: name即是key也是变量名
      
   }
   
   const perObj = {
       name: '老李',
       age: 18,
       sex: '男'
   }
   
   getListFn(perObj)
   ```



## token判断

1. 在全局前置路由守卫中, 我们用token只能判断什么?

   > 判断它是否登录, 有token证明登录过(即使过期的), 可以看到登录才能看到的页面放行
   >
   > 如果未登录, 无token值, 如果你要去登录页面/注册页面放行, 其他页面强制next切换到登录页面

2. 在axios响应拦截器里, 我们判断的是token的什么呢?

   > 前端携带过期token给后端, 后端验证过期后返回401, 进入响应拦截器
   >
   > 我们在响应拦截器里写判断代码, 所以401了, 就强制退出登录

3. 在axios请求拦截器里, 我们对token做了什么呢?

   > 把token值携带在请求头上, 任意一次请求都会执行这里携带



## 退出登录

无论是主动退出, 还是被动(强制)退出

* 清除vuex和本地的值
* 强制切换到登录页面



## 新增和编辑用同一套标签和代码

怎么在点击确定的时候区分, 是新增/编辑

1. 定义变量标记一下, 例如: isEdit (true编辑, false新增)默认false
2. 在点击编辑的时候, isEdit改为ture
3. 在点击新增的时候, isEdit改为false
4. 在点击确定的时候, 就用isEdit变量做区分即可



## 在组件上绑定的原生事件名字

1. 在组件标签上, 绑定的原生事件名字, 是原生的事件?
   * 不是, 需要组件标签内, 通过$emit()来触发才行, 所以去看看文档/试试
   * 如果不支持
     * 先用@原生事件名.native修饰符, 它可以试着给组件根标签绑定原生事件
     * 看看是否可以用插槽, 传入原生标签显示内容, 在原生的标签上绑定原生的事件



## 前端参数名

> 最后对象的属性名, 直接和一会儿要调用的接口需要的参数名一致
>
> 我们可以直接把对象传递给后台

# 打包相关(自己总结)

```html
打包后的相对路径的修改

影响打包时，index.html引入其他资源的前缀地址

./可以让开发环境和生产环境都可以正常使用

为了严谨一些

开发环境:'/'

生产环境:'./'

问题：有无代码可以让他们自己识别当前运行环境

node里有个内置的环境变量process.env.NODE_ENV

process.env.NODE_ENV 它会根据你敲击的命令来使用不同的值

解决：

如果你点击的是npm run serve process.env.NODE_ENV的值就是'development'字符串

如果你惦记的是npm run build process.env.NODE_ENV的值就是'production'字符串
```

```html
我们虽然排除掉了第三方的包

打包dist和开发环境都会使用这套方案，并排除掉第三方

生产环境：打包时会以public/index.html作为模板生成dist/index.html，index.html就有了那些cdn地址

开发环境：public/index.html也有哪些第三方的cdn地址，所以也能正常运行，

但是第一次的加载速度有点慢，所以开发环境还是想让webpack引入本地node_modules那些第三方的包

process.env.NODE_ENV可以根据敲击的命令不同，值也不同，能够一个代码区分不同环境
```

```javascript
总结：
1.publicPath:影响的是打包(webpack开发服务器/dist)的时候index.html引入其他资源的前缀地址
情况1：开发环境，值：'/'
情况2：生产环境，值:'./'(才能确保dist/indexhtml相对路径下访问)

2.dist瘦身
他可以影响dist的体积，其他第三方的包用cdn地址进行引入到index.html中保证运行
情况1：开发环境,还是引入第三方包进行使用,index.html中也不引入cdn地址
情况2:生产环境，排除第三方包，index.html引入cdn地址

动态引入cdn地址：
1.// 需要配置的cdn链接
let CDN = { css: [], js: [] }

2.当为生产环境时，在vue.config.js判断是否为生产环境，如果时添加一下cdn
CDN = {
    css: [
      'https://unpkg.com/element-ui@2.15.8/lib/theme-chalk/index.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.core.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.snow.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.bubble.css'
    ],
    js: [
      'https://unpkg.com/echarts@5.3.2/dist/echarts.min.js',
      'https://unpkg.com/vue@2.6.14/dist/vue.js',
      'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js',
      'https://unpkg.com/vuex@3.6.2/dist/vuex.js',
      'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
      'https://unpkg.com/dayjs@1.11.3/dayjs.min.js',
      'https://unpkg.com/element-ui@2.15.8/lib/index.js',
      'https://unpkg.com/quill@1.3.7/dist/quill.js',
      'https://unpkg.com/vue-quill-editor@3.0.6/dist/vue-quill-editor.js',
      'https://unpkg.com/vuex-persistedstate@3.2.1/dist/vuex-persistedstate.umd.js'
    ]
  }
  
3.vue.config.js中配置
// 注入cdn变量，打包时执行
chainWebpack(config) {
    config.plugin('html').tap(args => {
        // 参数对象添加属性cdn，值就是上面准备的CDN对象
        args[0].cdn = CDN// 配置cdn给插件
        return args
    })
}

4. 在index.html head中配置，
    <!-- 
模板引擎的语法：ejs,artTemplate
可以直接在html文件的标签里，注入js代码
后来有了vue，vue也有自己的模板语法（指令，插值表达式）
模板都会被代码翻译成原生的标签让浏览器执行
    -->
    <!-- 引入样式 -->
    <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
        <link rel="stylesheet" href="<%=css%>">
            <% } %>
                <!-- 引入js -->
                <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
                    <script src="<%=js%>"></script>
                                                                    <% } %>
```

