<template>
    <!--
        default-active  当前激活菜单的 index
        open sub-menu 展开的回调
        close sub-menu 收起的回调
        active-text-color 当前激活菜单的文字颜色
        menu下包含menu-item代表一行, 然后submenu是带子菜单的容器

     -->
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#23262e" text-color="#fff" active-text-color="#ffd04b" unique-opened  router>
        <template v-for="item in navList">
            <el-menu-item :index="item.indexPath" :key="item.indexPath" v-if="!item.children">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-if="item.children">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item :index="childItem.indexPath" v-for="childItem in item.children" :key="childItem.indexPath">
                    <i :class="childItem.icon"></i>
                    <span>{{childItem.title}}</span>
                </el-menu-item>
            </el-submenu>
        </template>
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
  },
  created () {
    this.$store.dispatch('layout/getNavInfo')
  },
  computed: {
    navList () {
      return this.$store.state.layout.navList
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
