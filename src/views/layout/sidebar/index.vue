
<template>
  <el-menu mode="vertical"
           :default-active="isSamePath"
           :collapse="isCollapse"
           :default-openeds="openeds"
           @open="menuOpen"
           background-color="rgba(38, 38, 38, 1)"
           text-color="#fff"
           active-text-color="#409EFF">
    <sidebar-item v-for="route in permission_routers"
                  :key="route.name"
                  :item="route"
                  :base-path="route.path"></sidebar-item>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebarItem'

  export default {
    components: { SidebarItem },
    data() {
      return {
        openeds: ['/examples']
      }
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isSamePath() {
        const idx = this.$route.path.indexOf('/list')
        if (idx > 0) {
          return this.$route.path.substr(0, idx)
        }
        return this.$route.path
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
      menuOpen(idx) {
        if (this.openeds.indexOf(idx) < 0) {
          this.openeds.push(idx)
        }
      }
    }/*,
    mounted() {
      console.log('permission_routers', this.permission_routers)
      console.log('path', this.$route.path)
    }*/
  }
</script>
