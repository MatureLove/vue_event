<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- status-icon 校验结果的反馈图标-->
    <el-form :model="userForm" ref="ruleForm" label-width="100px" status-icon :rules="userFormrules">
      <el-form-item label="登录名称" prop="username">
        <el-input type="text" disabled v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input type="text" v-model="userForm.nickname" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input type="email" v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
        <el-button @click="resetUserinfo">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      userForm: {
        username: this.$store.getters['user/username'], // 默认值用登录后获取到的用户名
        nickname: '',
        email: ''
      },
      userFormrules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }

        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 更新用户信息
    updateUserInfo () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            this.userForm.id = this.$store.getters['user/id']
            const result = await this.$store.dispatch('user/updateUserInfo', this.userForm)
            this.$message.success(result)
            this.$store.dispatch('user/getUserInfo')
          } catch (error) {
            this.$message.error(error)
          }
        } else {
          return false
        }
      })
    },
    // 重置用户信息
    resetUserinfo () {
      // this.userForm.nickname = ''
      // this.userForm.email = ''
      // 重置表单，并且重置报错提示
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
