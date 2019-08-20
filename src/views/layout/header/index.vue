<template>
  <header class="app-header">
    <img class="header-logo" src="https://yangyuji.github.io/vue-element-admin/static/img/logo.png">vue-element-admin管理后台
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="https://yangyuji.github.io/vue-element-admin/static/img/logout.png">
        <i class="el-icon-caret-bottom"></i>
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
      return {
      }
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
    height: 68px;
    line-height: 68px;
    background: rgb(69, 154, 255);
    width: 100%;
    padding-left: 40px;
    color: #fff;

    .header-logo {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 15px;
    }

    .avatar-container {
      position: absolute;
      height: 50px;
      display: block;
      right: 35px;
      top: 0;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 15px;
        position: relative;

        .user-avatar {
          width: 20px;
          height: 20px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
</style>
