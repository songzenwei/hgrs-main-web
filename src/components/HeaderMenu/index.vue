<template>
  <div id='domain' class='domain theme-header-menu-bg'>
    <div class="header-left">
      <div class='logo'></div>
      <p class="title">{{SERVICENAME}}</p>
    </div>
    <div class="header-menu theme-header-menu-title"></div>
    <div class="header-right">
      <p>提醒：256</p>
      <span class="line">|</span>
      <p>待办：156</p>
      <el-button icon="el-icon-search" class="search"></el-button>
      <p>张某某</p>
    </div>
  </div>
</template>
<script>
import { SERVICENAME } from '@/config.js'
export default {
  data () {
    return {
      SERVICENAME,
      searchInfo: ''
    }
  }
}
</script>
<style scoped lang="less">
.domain {
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  align-items: center;
  padding: 0 30px;
  background-color: var(--theme-color);
  background-size: cover; /* 背景图片覆盖整个div区域 */
  background-position: center; /* 背景图片居中 */
}
.header-left {
  display: flex;
  align-items: center;
  width: 340px;
  .logo {
    float: left;
    width: 62px;
    height: 62px;
    background-size: cover; /* 背景图片覆盖整个div区域 */
    background-position: center; /* 背景图片居中 */
    background-image: url('../../assets/img/headlog.png');
  }
  .title {
    color: #fff;
    flex: 1;
    font-size: 26px;
    margin-left: 10px;
  }
}
.header-menu {
  flex: 1;
  height: 40px;
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
}
.header-right {
  display: flex;
  color: #fff;
  max-width: 340px;
  .line {
    margin: 0 5px;
  }
  .search {
    background:transparent;
    color:#fff;
    padding:10px;
    border-radius: 20px;
    margin: 0 5px;
    margin-top: -7px;
  }
}
</style>
