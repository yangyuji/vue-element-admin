<template>
  <header class="app-header">
    <img class="header-logo" :src="'./static/img/logo.png'">
    宣传屏后台管理
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        某某 <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>返回首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
    data() {
      return {}
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-header {
    position: relative;
    height: 48px;
    line-height: 48px;
    background: rgb(69, 154, 255);
    width: 100%;
    padding-left: 20px;
    color: #fff;

    .header-logo {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 5px;
    }

    .avatar-container {
      position: absolute;
      height: 38px;
      display: block;
      right: 20px;
      top: 0;
      color: #fff;

      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        line-height: 38px;
        margin-top: 10px;
      }
    }
  }
</style>
