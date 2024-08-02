<!--
 * @Author: dayu
 * @Date: 2021-05-20 17:56:09
 * @LastEditTime: 2021-10-22 17:05:17
 * @LastEditors: Please set LastEditors
 * @Description: 自定义tabs
 * @FilePath: \gazg-cadre-web\src\components\MyTabs\index.vue
-->
<template>
  <div class="myTabs clearfix">
    <ul>
      <li v-for="item in tabList" :key="item.active" @click="handleChangeTabs(item)" :class="{isActive: active === item.active}">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    active: {
      type: String,
      default: () => {
        return ''
      }
    },
    showTotal: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  methods: {
    handleChangeTabs (item) {
      this.$emit('ChangeTab', item)
    }
  }
}
</script>
<style lang="less" scoped>
.myTabs {
  padding: 0 10px;
  margin-top: 10px;
  li {
    float: left;
    padding: 7px 17px;
    font-size: 15px;
    color: #999;
    font-weight: 700;
    border: 1px solid #DCDFE6;
    border-left: none;
    cursor: pointer;
  }
  .isActive {
    color: #1989FA;
    background: #F0F2F5;
  }
}
.myTabs li:first-child {
  border-left: 1px solid #DCDFE6 !important;
}
.el-badge__content.is-fixed {
  z-index: 999;
}
</style>
