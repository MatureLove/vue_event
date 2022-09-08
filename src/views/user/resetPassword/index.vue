<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>

    </div>
    <el-form :model="pwdForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width :500px">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'resrtPassword',
  data () {
    const samePwd = (rule, value, callback) => {
      if (this.pwdForm.old_pwd === value) {
        return callback(new Error('原密码不能和新密码相同'))
      } else {
        callback()
      }
    }
    const rePwd = (rule, value, callback) => {
      if (this.pwdForm.new_pwd !== value) {
        return callback(new Error('两次新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      // 表单的数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      rules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改密码->点击确认
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            const result = await this.$store.dispatch('user/updatePwd', this.pwdForm)
            this.$message.success(result)// 更新密码成功
            this.$refs.ruleForm.resetFields() // 更新完之后重置输入框并且重置校验规则
            this.$store.commit('user/QUITLOGIN') // 退出登录重新登录
            this.$router.push('/login') // 返回登陆页
          } catch (error) {
            this.$message.error(error)
          }
        } else {
          // 未通过校验拦住
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>
</style>
