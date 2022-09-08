<template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>更换头像</span>
  </div>
  <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="!avatar" class="the_img" src="@/assets/images/avatar.jpg" alt="" />
      <img v-else class="the_img" :src="avatar" alt="" />

      <!-- 按钮区域  accept="image/*" 不限制图像的格式-->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''">上传头像</el-button>
      </div>
    </div>
</el-card>
</template>

<script>
export default {
  name: 'updateAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片
    chooseImg () {
      // 触发点击事件
      this.$refs.iptRef.click()
    },
    // 在选择框中选择图片后触发的改变事件
    onFileChange (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      // 没有选择图片
      if (files.length === 0) {
        this.avatar = ''
      } else {
        // 选择了图片
        console.log(files[0])
        // 1.创建FileReader对象
        const fr = new FileReader()
        // 2.调用readAsDataURL函数，读取文件内容
        fr.readAsDataURL(files[0])
        // 3.监听fr的onload事件
        fr.onload = e => {
          // 通过e.target.result获取读取的结果，值是字符串base64格式的字符串
          this.avatar = e.target.result
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-box {
    margin-top: 10px;
  }
  .preview {
    object-fit: cover;
  }
  .the_img{
      width: 350px;
      height: 350px;
  }
  </style>
