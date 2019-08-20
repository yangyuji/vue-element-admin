<template>
  <el-submenu v-if="!item.hidden" :index="item.path">

    <template slot="title">
      <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" style="margin-right:0;"></i>
      <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
    </template>

    <template v-if="!child.hidden" v-for="child in item.children">
      <router-link :to="resolvePath(child.path)" :key="child.name">
        <el-menu-item style="padding-left:48px;" :index="resolvePath(child.path)">
          <!--i class="el-icon-arrow-right"></i-->
          <span v-if="child.meta && child.meta.title"
                slot="title">{{child.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>

  </el-submenu>
</template>

<script>
  import path from 'path'

  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: 179px!important;
  }
  .el-menu--collapse .el-menu .el-submenu{
    min-width: 180px!important;
  }
</style>
