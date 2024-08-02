<template>
  <div style="overflow: hidden" :class="getThemeColorClass(theme)">
    <HeaderMenu />
    <div class='sidebar' :style="{width: leftWidth + 'px'}">
      <LeftMenu @refreshMenuCollapse="handleMenuCollapse" />
    </div>
    <div id='services-container' class='services-container' :style="{width: 'calc(100% - '+ leftWidth + 'px)'}">
      <div :id="SERVICEID" :class="SERVICEID" style="height:100%">
        <TagRouter ref="TagRouter" v-if="isShow"/>
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cacheRouteList">
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '../config.js'
import axios from 'axios'
import TagRouter from '@/components/TagRouter/TagRouter'
import HeaderMenu from '@/components/HeaderMenu/index'
import LeftMenu from '@/components/Menu/index'
import { getThemeColorClass } from '@/utils/theme.js'
export default {
  components: { HeaderMenu, LeftMenu, TagRouter },
  data () {
    return {
      SERVICEID,
      SERVICENAME,
      isShow: true,
      getThemeColorClass,
      leftWidth: 134
    }
  },
  computed: {
    cacheRouteList () {
      return this.$store.state.publicData.cacheRouteList
    },
    theme() {
      // 获取当前存储的主题色，赋值给变量
      document.documentElement.style.setProperty('--theme-color', this.$store.state.user.theme)
      // 返回当前主题色
      return this.$store.state.user.theme
    }
  },
  watch: {
    $route (val) {
      this.handleChangeRouter(val)
    }
  },
  created () {
    this.checkURLParameters(this.$route)
    this.handleChangeRouter(this.$route)
    axios.get('/api/frameworkserver/frameRealmName').then(res => {
      localStorage.setItem('href', res.data)
    })
  },
  methods: {
    handleMenuCollapse (isCollapse) {
      this.leftWidth = !isCollapse ? 134 : 60
    },
    handleChangeRouter (val) {
      this.$store.commit('SET_ADD_ROUTERLIST', {
        name: val.meta.title || '没有名字',
        path: val.path
      })
      this.$store.commit('SET_CACHEROUTERLIST', val)
    },
    checkURLParameters (val) {
      const path = val.path
      if (!path) {
        console.log('path-app', 'path不存在直接结束')
        return
      }
      const urlPath = '/home'
      // 如果url相等 设置isShow为false
      if (path === urlPath) {
        this.isShow = false
      }
    }
  }
}
</script>
<style scoped lang="less">
ul {
  list-style: none;
}
.sidebar {
  float: left;
  top: 50px;
  left: 0;
  bottom: 0;
  font-size: 16px;
  overflow: hidden;
  height:calc(100vh - 50px);
}
.services-container {
  float: left;
  height: calc(100vh - 50px);
  overflow-y:auto;
  margin:16px 0px 20px 0;
}
</style>
