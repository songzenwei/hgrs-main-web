<!--
 * @Author: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @Date: 2024-07-26 14:54:57
 * @LastEditors: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @LastEditTime: 2024-07-29 09:41:40
 * @FilePath: \hgrs-main-web\src\views\homeCustom\index.vue
 * @Description: menu 菜单渲染
-->
<template>
    <div>home-custom</div>
</template>
<script>
// import { getMenuList, logout } from '@/api'
export default {
  data () {
    return {

    }
  },
  created () {
    this.handleGetMenuList()
  },
  methods: {
    handleGetMenuList () {
      // try {
      //   const res =  getMenuList({})
      //   if (res.success) {
      //     this.moduleList = res.detail.menuList ? res.detail.menuList : []
      //     setLocData('MenuList', JSON.stringify(this.moduleList))
      //     this.moduleList.forEach((item, index) => {
      //       letfMenu.forEach(res => {
      //         if (item.id === res.id) {
      //           this.$set(this.moduleList[index], 'imgIcon', res.imgIcon)
      //           this.$set(this.moduleList[index], 'Select', res.Select)
      //         }
      //       })
      //     })
      //   }
      // } catch (error) {
      //   throw new Error(error)
      // }
    }
  }
}
</script>
