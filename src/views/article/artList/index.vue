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
      </el-form>
    </el-dialog>
  </el-card>

</template>

<script>
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
        content: '' // 文章的内容
      },
      pubFormRules: { // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '请选择文章标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
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
    async handleClose(done) {
      const result = await this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
      }).catch((error) => {
        return error
      })
      console.log(result)
    },
    // 重置按钮
    reset() {
      this.$refs.lineForm.resetFields()
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
  min-height: 300px;//最小宽度300，可以撑开
}
</style>
<!-- 总结：scoped不会给组件内标签添加data-v属性，你需要用::v-deep 穿透选择组件内的标签设置样式-->
