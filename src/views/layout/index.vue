<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../..//assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff"
        active-text-color="#409EFF">
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img v-if="!user_pic" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="" class="avatar" />
            <el-avatar v-else :src="user_pic" class="avatar">
            </el-avatar>
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="quitLogin"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="" v-else>
          <span>欢迎{{ nickname || username }}</span>
        </div>
        <NavList></NavList>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import NavList from './navList/index.vue'
export default {
  name: 'Layout',
  methods: {
    quitLogin () {
      this.$confirm('确定要离开我了吗， 不爱我了吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('user/QUITLOGIN')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'nickname', 'user_pic'])
  },
  components: { NavList }
}
</script>

  <style lang="less" scoped>
  .main-container {
    height: 100%;

    .el-header,
    .el-aside {
      background-color: #23262e;
    }

    .el-header {
      padding: 0;
      display: flex;
      justify-content: space-between;
    }

    .el-main {
      overflow-y: scroll;
      height: 0;
      background-color: #F2F2F2;
    }

    .el-footer {
      background-color: #eee;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    //   background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
  }

  .user-box {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    user-select: none; //用户不可以选择文本

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 15px;
      object-fit: cover; //被替换的内容正好填充元素的内容框
    }
    span{
      font-size: 12px;
      color: white;
    }
  }
  </style>
