<!-- 菜单menu -->
<template>
  <div>
    <ul>
      <el-button @click="handleExpendMenu">展开/收起</el-button>
      <li v-for="(item, index) in myMenu" :key="index">
        <el-popover placement="right" trigger="hover" width="400"
          :disabled="item.children && item.children.length > 0 ? false : true">
          <div>
            <ul>
              <li v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="handleSelectRoute(subItem)">
                {{ subItem.name }}
                <ul>
                  <li v-for="(subChildItem, subChildIndex) in subItem.children" :key="subChildIndex" @click="handleSelectRoute(subChildItem)">
                    {{ subChildItem.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="menu-bg" slot="reference"
            :style="{width: bgWidth + 'px', height: bgWidth + 'px', marginTop: !isCollapse ? 20 + 'px' : 10 + 'px'}"
            @click="handleSelectRoute(item)">
            <div class="menu-icon"
              :style="{width: iconWidth + 'px', height: iconWidth + 'px'}"></div>
            <p class="menu-title" v-html="item.name" v-if="!isCollapse"></p>
          </div>
        </el-popover>
      </li>
    </ul>
  </div>
</template>

<script>
const { SERVICEID } = require('@/config.js')
export default {
  data () {
    return {
      isCollapse: false,
      myMenu: [],
      MenuData: '',
      bgWidth: 90,
      iconWidth: 40
    }
  },
  mounted () {
    this.handeGetModuleList()
  },
  methods: {
    handleExpendMenu () {
      this.isCollapse = !this.isCollapse
      this.bgWidth = !this.isCollapse ? 90 : 36
      this.iconWidth = !this.isCollapse ? 40 : 20
      this.$emit('refreshMenuCollapse', this.isCollapse)
    },
    handleSelectRoute (item) {
      if (!item.children && item.path) {
        this.$router.push({
          path: item.path,
          query: {
            t: +new Date()
          }
        })
      }
    },
    handeGetModuleList () {
      const url = window.location.href
      const MenuData =
        url.indexOf('?mc=') > 0 ? url.split('?mc=')[1].split('#')[0] : ''
      this.MenuData = MenuData
      this.myMenu = [
        {
          path: `/${SERVICEID}/home/index`,
          name: '我的<br/>工作台',
          meta: { title: '我的工作台', icon: 'fa fa-home' } // icon 支持 font-awesome 和 element
        },
        {
          path: `/${SERVICEID}/home/element/message`,
          name: '数据中台',
          meta: { title: '数据中台', icon: 'fa fa-inbox' },
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
                },
                {
                  path: `/${SERVICEID}/home/element/treeListTable`,
                  name: '带机构树列表',
                  meta: { title: '带机构树列表', icon: 'fa fa-list-alt' }
                }
              ]
            }
          ]
        },
        {
          id: '9901',
          parentId: '99',
          name: '"一站式"<br/>集成管理',
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
    },
    handleRecursionPush (val) {
      if (val.children && val.children.length > 0) {
        this.handleRecursionPush(val.children[0])
      } else {
        this.$router.push(val.path)
      }
    }
  }
}
</script>
<style scoped lang="less">
ul {
  text-align: center;
  li {
    .menu-bg {
      margin: 0 auto;
      color: #fff;
      border-radius: 5px;
      padding-top: 8px;
      background: var(--theme-color);
      .menu-icon {
        margin: 0 auto;
        background-image: url(../../assets/img/navicon/gongzuotai.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .menu-title {
        text-align: center;
        line-height: 18px;
      }
    }
    .menu-bg:hover {
      cursor: pointer;
      background: #fff;
      border: 1px solid var(--theme-color);
      color: var(--theme-color);
    }
  }
}
</style>
