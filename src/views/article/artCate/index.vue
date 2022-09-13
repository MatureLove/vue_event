<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class=" header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateList">添加分类</el-button>
      </div>
      <!-- data="" -->
      <el-table :data="cateList" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button type="primary" size="mini" @click="updateCateList(row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteCateList(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isEdit?'修改文章分类':'添加文章分类'" :visible.sync="dialogFormVisible" width="35%" @closed="onAddClosedFn">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="exitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'artCate',
  data() {
    return {
      isEdit: false, // 保存编辑状态(false新增, true编辑)
      cateList: [],
      dialogFormVisible: false, // 控制对话框是否显示
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getArtlist()
  },
  methods: {
    // 获取文章分类列表
    async getArtlist() {
      try {
        await this.$store.dispatch('article/getCateList')
        this.cateList = this.$store.state.article.cateList
      } catch (error) {
        console.log(error)
      }
    },
    addCateList() {
      this.dialogFormVisible = true
      this.isEdit = false
      // 重新重置表单数据
      this.addForm = {
        cate_name: '',
        cate_alias: ''
      }
    },
    // 确定按钮的回调，确定添加文章分类列表
    exitAdd() {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 利用isEdit判断是修改还是添加
          if (this.isEdit) {
            const { data } = await this.$store.dispatch('article/updateCateList', this.addForm)
            if (data.code === 0) {
              this.$message.success('修改分类成功！')
            } else {
              this.$message.error('修改分类失败！')
            }
          } else {
            const { data } = await this.$store.dispatch('article/addCateList', this.addForm)
            if (data.code === 0) {
              this.$message.success('添加分类成功！')
            } else {
              this.$message.error('添加分类失败！')
            }
          }
          this.getArtlist()
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    // 取消的回调
    cancelAdd() {
      this.dialogFormVisible = false
    },
    // 点❌关闭
    onAddClosedFn() {
      this.$refs.addRef.resetFields()
    },
    // 修改按钮的回调
    updateCateList(obj) {
      // obj每行的数据 id cate_name cate_alias
      this.dialogFormVisible = true
      this.isEdit = true
      // 设置数据回显
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.addForm = { ...obj }
      })
    },
    // 删除按钮的回调
    deleteCateList(id) {
      this.$confirm('此操作将永久删除该文章分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await this.$store.dispatch('article/deleteCateList', id)
        if (data.code !== 0) return this.$message.error('删除文章分类失败！')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArtlist()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
