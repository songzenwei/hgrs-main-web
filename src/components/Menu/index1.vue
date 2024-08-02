<!--
 * @Author: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @Date: 2024-07-26 15:32:28
 * @LastEditors: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @LastEditTime: 2024-07-29 10:25:34
 * @FilePath: \hgrs-main-web\src\components\Menu\index.vue
 * @Description: 菜单menu
-->
<template>
  <div class="menus">
    <!-- <div class="menusBag">
      <div>
        <img v-if="MenuData === '99'" src="/static/img/system/99.png" alt="">
        <img v-if="MenuData === '97'" src="/static/img/system/97.png" alt="">
        <div>
          <span>{{ showName[MenuData] }}</span>
        </div>
        <div class="markMenu"></div>
      </div>
    </div> -->
    <div class="menusContent">
      <el-button @click="isCollapse=!isCollapse">展开/收起</el-button>
      <el-menu
        :default-active="$route.path"
        ref="ismnu"
        class="el-menu-vertical-demo"
        background-color="transparent"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        text-color="#333"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        active-text-color="#145BED"
      >
        <template v-for="(item, index) in myMenu">
          <el-menu-item
            :index="item.path"
            v-if="!item.children || item.children.length === 0"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="expandWidth" :title="item.name">{{
                item.name
              }}</span>
            </template>
          </el-menu-item>
          <el-submenu :index="item.path" v-else class="submenu" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="expandWidth" :title="item.name">{{
                item.name
              }}</span>
            </template>
            <div v-for="(item1, index1) in item.children" :key="index1">
              <el-menu-item
                :index="item1.path"
                v-if="!item1.children || item1.children.length === 0"
              >
                <span slot="title" :title="item1.name">{{ item1.name }}</span>
              </el-menu-item>
              <el-submenu :index="item1.path" v-else class="submenu1">
                <template slot="title">
                  <span :title="item1.name">{{ item1.name }}</span>
                </template>
                <div v-for="(item2, index2) in item1.children" :key="index2">
                  <el-menu-item
                    :index="item2.path"
                    v-if="!item2.children || item2.children.length === 0"
                  >
                    <span slot="title" :title="item2.name">{{
                      item2.name
                    }}</span>
                  </el-menu-item>
                  <el-submenu :index="item2.path" v-else class="submenu1">
                    <template slot="title">
                      <span :title="item2.name">{{ item2.name }}</span>
                    </template>
                    <div
                      v-for="(item3, index3) in item2.children"
                      :key="index3"
                    >
                      <el-menu-item
                        :index="item3.path"
                        v-if="!item3.children || item3.children.length === 0"
                      >
                        <span slot="title" :title="item3.name">{{
                          item3.name
                        }}</span>
                      </el-menu-item>
                      <el-submenu :index="item3.path" v-else class="submenu1">
                        <template slot="title">
                          <span :title="item3.name">{{ item3.name }}</span>
                        </template>
                        <div
                          v-for="(item4, index4) in item3.children"
                          :key="index4"
                        >
                          <el-menu-item
                            :index="item4.path"
                            v-if="
                              !item4.children || item4.children.length === 0
                            "
                          >
                            <span slot="title" :title="item4.name">{{
                              item4.name
                            }}</span>
                          </el-menu-item>
                        </div>
                      </el-submenu>
                    </div>
                  </el-submenu>
                </div>
              </el-submenu>
            </div>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
const { SERVICEID } = require('@/config.js')
// import menuData from '@/router/menu'
// import { getAvailButtons, getMenuList } from '@/api/home'
// import { getOneArr, isExistence } from '@/utils/methods'
// import { getLocData, setSesData } from '@/utils/auth'
export default {
  data () {
    return {
      isCollapse: false,
      expandClass: 'el-icon-s-unfold',
      myMenu: [],
      MenuData: '',
      showName: {
        99: '系统管理',
        97: '个人中心'
      }
    }
  },
  watch: {
    $route (to, from) {
      if (this.myMenu.length > 0) {
        // this.handleGetAvailButtons()
      }
    }
  },
  mounted () {
    this.handeGetModuleList()
  },
  methods: {
    handeGetModuleList () {
      const url = window.location.href
      const MenuData =
        url.indexOf('?mc=') > 0 ? url.split('?mc=')[1].split('#')[0] : ''
      this.MenuData = MenuData
      // setSesData('module', JSON.stringify(this.showName[this.MenuData]))
      // const res = getMenuList({ parentId: MenuData })
      // if (res.success && res.detail.menuList.length > 0) {
      this.myMenu = [
        {
          path: `/${SERVICEID}/home/index`,
          name: '首页',
          meta: { title: '首页', icon: 'fa fa-home' } // icon 支持 font-awesome 和 element
        },
        {
          path: `/${SERVICEID}/home/element/message`,
          name: '示例',
          meta: { title: '示例', icon: 'fa fa-inbox' },
          children: [
            {
              path: `/${SERVICEID}/home/element/message`,
              name: 'element',
              meta: { title: 'element', icon: 'el-icon-star-on' },
              children: [
                {
                  path: `/${SERVICEID}/home/element/message`,
                  name: '消息提示',
                  meta: { title: '消息提示', icon: 'fa fa-comment' }
                },
                {
                  path: `/${SERVICEID}/home/element/notice`,
                  name: '通知',
                  meta: { title: '通知', icon: 'fa fa-bell' }
                },
                {
                  path: `/${SERVICEID}/home/element/form`,
                  name: '表单验证',
                  meta: { title: '表单验证', icon: 'fa fa-list-alt' }
                }
              ]
            }
          ]
        },
        {
          id: '9901',
          parentId: '99',
          name: '用户管理',
          path: '/module',
          icon: '/f',
          isParent: true,
          children: [
            {
              id: '990103',
              parentId: '9901',
              name: '用户管理',
              path: '/home-custom/index',
              icon: '/f',
              isParent: false,
              children: []
            },
            {
              id: '990101',
              parentId: '9901',
              name: '功能管理',
              path: '/module/funcManagement',
              icon: '/f',
              isParent: false,
              children: []
            }
          ]
        }
      ]
      // if (!isExistence(this.$route.path, this.myMenu) && !getLocData('paramsJson')) {
      //   this.handleRecursionPush(this.myMenu[0])
      // }
      setTimeout(() => {
        // this.handleGetAvailButtons()
        // this.handleChangeColor()
      }, 300)
      // }
    },
    handleRecursionPush (val) {
      if (val.children && val.children.length > 0) {
        this.handleRecursionPush(val.children[0])
      } else {
        // setSesData('menu', JSON.stringify(val.name))
        this.$router.push(val.path)
      }
    },
    handleSelect (val, keyPath) {
      // const indexData = getOneArr(this.myMenu).find(item => item.path === val)
      // setSesData('menu', JSON.stringify(indexData.name))
      // this.handleChangeColor()
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
    // 按钮权限
    // async handleGetAvailButtons () {
    //   const indexData = getOneArr(this.myMenu).find(item => item.path === this.$route.path)
    //   setSesData('menuId', indexData.id)
    //   try {
    //     const res = await getAvailButtons({
    //       funcId: indexData.id
    //     })
    //     if (res.success) {
    //       console.log(res.detail)
    //       this.$store.commit('SET_AUTHOR_LIST', res.detail)
    //     }
    //   } catch (e) {
    //     throw new Error(e)
    //   }
    // }
  }
}
</script>
<style scoped>
.expand {
  font-size: 18px;
  color: #909399;
  cursor: pointer;
}
.expandWidth {
  display: inline-block;
  width: 180px;
}
.expandI {
  line-height: 40px;
  padding-left: 20px;
}
</style>
