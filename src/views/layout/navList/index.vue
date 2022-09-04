<template>
    <!--
        default-active  当前激活菜单的 index
        open sub-menu 展开的回调
        close sub-menu 收起的回调
        active-text-color 当前激活菜单的文字颜色
        menu下包含menu-item代表一行, 然后submenu是带子菜单的容器

     -->
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#23262e" text-color="#fff" active-text-color="#ffd04b" unique-opened>
        <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/file">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>文件管理</span>
            </template>
            <el-menu-item index="/file1">
                <i class="el-icon-s-data"></i>
                <span>文件分类</span>
            </el-menu-item>
            <el-menu-item index="/file2">
                <i class="el-icon-document-copy"></i>
                <span>文件列表</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="/my">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>个人中心</span>
            </template>
            <el-menu-item index="/my1">
                <i class="el-icon-s-fold"></i>
                <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/my2">
                <i class="el-icon-camera"></i>
                <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/my3">
                <i class="el-icon-key"></i>
                <span>重置密码</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: 'navList',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
.el-menu {

    .el-submenu,
    .el-menu-item {
        width: 200px;
    }

    .el-submenu .el-menu-item {
        font-size: 12px;
        user-select: none;
    }

}
</style>
