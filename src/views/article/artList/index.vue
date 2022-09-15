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
          <el-button type="primary" size="small" @click="filterResult">筛选</el-button>
          <el-button type="info" size="small" @click="resetRsesult">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 发表文章的按钮 -->
      <el-button type="primary" size="small" class="btn-pub" @click="Publications">发表文章</el-button>
    </div>
    <!-- 发表文章的弹框 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisible" fullscreen :before-close="handleClose"
      @closed="onDialogClosedFn">
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
          <quill-editor v-model="pubForm.content" @blur="onEditorChange"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img src="@/assets/images/cover.jpg" alt="请选择图片" ref="imgRef" class="cover-img" @click="chooseImgFn">
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
    <!-- 文章表格区域 -->
    <el-table :data="artList" style="width: 100%;" border stripe>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template v-slot="{row}">
          <span>{{$formatDate(row.pub_date)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="warning"  icon="el-icon-edit">修改文章</el-button>
          <el-button type="danger"  icon="el-icon-delete">删除文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      size-change 每页条数发生改变触发的事件
      current-change  当前页发生改变触发的事件
      current-page 当前页
      page-sizes 页面数据可以变化的条数
      page-size 每页展示多少条数据
      layout 分页器里面组件的布局
      total总数据条数
      prev-click 点击上一页触发的回调
      next-click 点击下一页触发的会调
    -->
    <!-- 前提需要有总页数 和当前页 当前每页显示的条数 -->
    <el-pagination @size-change="handleSizeChange" @current-change="getArticleList" :current-page="q.pagenum"
      :page-sizes="[5, 10, 15, 20]" :page-size="q.pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @prev-click="getArticleList" @next-click="getArticleList" style="margin-top:15px">
    </el-pagination>
  </el-card>

</template>

<script>
// 导入默认的封面图片
import defaultImg from '@/assets/images/cover.jpg'
// 引入接口发送请求
import { getArticleListApi } from '@/api/index'
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
        pagesize: 5,
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
        // 因为quill-editor 不是一个表单输入框所以没有blur】和change事件，但是通过查文档他可以绑定这两个事件，我们通过给他绑定change事件
        // 在内容发生改变的时候利用element的单独验证表单某个数据在进行验证
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        cover_img: [{ required: true, message: '请上传文章封面', trigger: 'change' }]
      },
      artList: [], // 文章的列表数据
      total: 0 // 总数据条数
    }
  },
  created() {
    // 获取文章分类
    this.getArtlist()
    // 获取文章列表
    this.getArticleList()
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
        this.$refs.pubFormRef.resetFields()
        this.$refs.imgRef.setAttribute('src', defaultImg)
        done()
      }).catch((error) => {
        return error
      })
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
      this.$refs.pubFormRef.validateField('cover_img')
    },
    // 发布或存为草稿按钮的回调
    pubArticleFn(state) {
      this.pubForm.state = state
      this.$refs.pubFormRef.validate(async valid => {
        if (valid) {
          // 创建 FormData 对象
          const fd = new FormData()
          // Object.keys(this.pubForm)返回这个对象中所有的键放在一个数组中
          // 为创建的FormData 对象添加数据
          Object.keys(this.pubForm).forEach(key => {
            fd.append(key, this.pubForm[key])
          })
          // 发送请求
          const { data } = await this.$store.dispatch('article/uploadCate', fd)
          if (data.code !== 0) return this.$message.error('发布文章失败！')
          this.$message.success('发布文章成功！')

          // 关闭对话框
          this.dialogVisible = false
          // 重新获取文章列表
          this.getArticleList()
        } else {
          return false
        }
      })
    },
    // 富文本内容发生改变的回调
    onEditorChange() {
      // validateField对表单某个元素进行单独验证
      this.$refs.pubFormRef.validateField('content')
    },
    // 对话框关闭的回调
    onDialogClosedFn() {
      this.$refs.pubFormRef.resetFields()
      this.$refs.imgRef.setAttribute('src', defaultImg)
    },
    // 获取文章列表数据
    // 在这里设置当前页默认值的好处，1.方面了我们在页码发生改变时在额外写回调函数修改页码在发送请求，直接使用当前回调就可以
    // 2.当我们更改每页条数或者该筛选等需要重新发送请求获取数据的时候，会默认回到第一页。
    // 还会避免一个隐藏偶发性的bug ：因为当前页和每页显示条数发生改变时都会触发回调重新获取数据，当我们先点击最后一页数据，在改变每页显示的
    // 条数（又少变多），两个回调都会被执行，当每页展示的数据变多时，页码条数会改变，所以就有可能出现我们最后一页数据可能有可能没有，因为两个
    // 网络请求一起发，谁先回来不一定，解决办法：每次改变每页显示条数的时候，将当前页设置为1
    async getArticleList(pager = 1) {
      this.q.pagenum = pager // 接受一个参数，修改当前第几页，如果不传默认是第一页
      const { data: res } = await getArticleListApi(this.q)
      if (res.code !== 0) return this.$message.error('获取文章列表失败!')
      this.artList = res.data
      this.total = res.total
    },
    // 修改每页显示的条数
    handleSizeChange(val) {
      this.q.pagesize = val // 修改每页显示的条数
      // 重新获取数据
      this.getArticleList()
    },
    // 筛选按钮的回调
    filterResult() {
      if (!this.q.cate_id && !this.q.state) {
        this.$message.error('请选择筛选条件')
      } else {
        this.q.pagesize = 5
        this.getArticleList()
      }
    },
    // 重置按钮的回调
    resetRsesult() {
      this.q = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      }
      this.getArticleList()
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
