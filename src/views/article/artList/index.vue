<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>文章列表</span>
    </div>
    <!-- 行内表单区域 -->
    <div class="search-box">
      <el-form :inline="true" :model="q">
        <el-form-item label="文章分类">
          <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
            <el-option :label="obj.cate_name" :value="obj.id" v-for="obj in cateList" :key="obj.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态" style="margin-left: 15px;">
          <el-select v-model="q.state" placeholder="请选择状态" size="small">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">筛选</el-button>
          <el-button type="info" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 发表文章的按钮 -->
      <el-button type="primary" size="small" class="btn-pub" @click="Publications">发表文章</el-button>
    </div>
    <!-- 发表文章的弹框 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">
      <!-- 发布文章的对话框 -->
      <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%;">
            <el-option :label="obj.cate_name" :value="obj.id" v-for="obj in cateList" :key="obj.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <!-- 使用 v-model 进行双向的数据绑定 -->
          <quill-editor v-model="pubForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img src="@/assets/images/cover.jpg" alt="请选择图片" ref="imgRef" class="cover-img">
          <br>
          <!-- 文件选择框，默认被隐藏 -->
          <input type="file" style="display: none;" accept="image/*" ref="iptFileRef" @change="onCoverChangeFn" />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="chooseImgFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')">发布</el-button>
          <el-button type="info" @click="pubArticleFn('草稿')">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>

</template>

<script>
// 导入默认的封面图片
import defaultImg from '@/assets/images/cover.jpg'
/**
 * 标签和样式中，引入图片直接写静态路径，把路径放在js中的vue变量在赋予是不可以的
 * 原因：webpack在解析标签的时候，遇到src属性，属性值如果是一个相对路径，他会帮我们去找个这个路径的文件，然后根据文件的大小进行解析，
 * 小图转换为base64位字符串在赋予给src，如果是大图拷贝图片换个路径赋予给img的src属性进行显示
 *
 * 如果把相对路径赋值给一个vue变量在赋予给src，都会当作普通的字符串
 * 不会再进行打包，在经过webpack打包完之后，都会被打包到dist目录下或内存中，相对路径就会变化，你写的那个路径就会找不到文件的真身了
 *
 * 解决办法：js中引入图片就用import引入，让webpack把他当作模块数据，是转换成打包后的图片路径还是base64位字符串
 *
 * 注意只有相对路径的本地图片需要注意，以http：//开头的不需要，直接写就行
 */
export default {
  name: 'artList',
  data() {
    return {
      dialogVisible: false, // 控制弹框是否显示
      cateList: [], // 文章分类
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubForm: { // 表单的数据对象
        title: '', // 文章标题
        cate_id: '', // 文章分类
        content: '', // 文章的内容
        cover_img: null, // 用户选择的封面图片（null 表示没有选择任何封面）
        state: '' // 发布文章状态
      },
      pubFormRules: { // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '请选择文章标题', trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        cover_img: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 获取文章分类
    this.getArtlist()
  },
  methods: {
    // 获取文章分类
    async getArtlist() {
      try {
        await this.$store.dispatch('article/getCateList')
        this.cateList = this.$store.state.article.cateList
      } catch (error) {
        console.log(error)
      }
    },
    // 发表文章
    Publications() {
      this.dialogVisible = true
    },
    // 关闭弹框前的回调
    handleClose(done) {
      this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
      }).catch((error) => {
        return error
      })
    },
    // 重置按钮
    reset() {
      this.$refs.lineForm.resetFields()
    },
    // 选择封面
    chooseImgFn() {
      this.$refs.iptFileRef.click()
    },
    // 文章封面的上传
    onCoverChangeFn(e) {
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择封面
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', defaultImg)
      } else {
        // 用户选择了封面
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    // 发布或村委草稿按钮的回调
    pubArticleFn(state) {
      this.pubForm.state = state
      this.$refs.pubFormRef.validate(valid => {
        if (valid) {
          console.log(this.pubForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<!--
  scoped的作用:让style里面的选择器只能选择到当前组件的标签，保证样式的独立性，不影响其他的组件
  scoped的原理，多加了一个data-v-hash值的属性选择器
  webpack打包的时候会给每个组件标签上添加相同的data-v属性，也会给所有的选择器后加相同的data-v属性
  需要注意的是：scoped只会给当前组件所有原生标签添加data-v属性，还会给组件标签的根标签添加
  data-v属性，组件内的标签不会添加
 -->
<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .btn-pub {
    margin-top: 5px;
  }
}

// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px; //最小宽度300，可以撑开
}

.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
<!-- 总结：scoped不会给组件内标签添加data-v属性，你需要用::v-deep 穿透选择组件内的标签设置样式-->
