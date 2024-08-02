<template>
<div>
    <el-row class="top-menu">
      <el-col :span="6" class="menu-icon theme-home-icon-bg" @click="goMenuPath('/level/menu2')">
        <div class="icon-img img5"></div>
        <p>中心任务作战图</p>
      </el-col>
      <el-col :span="6" class="menu-icon theme-home-icon-bg" @click="goMenuPath('/level/menu2')">
        <div class="icon-img img4"></div>
        <p>胜任力地图</p>
      </el-col>
      <el-col :span="6" class="menu-icon theme-home-icon-bg" @click="goMenuPath('/level/menu2')">
        <div class="icon-img img6"></div>
        <p>机构编制图谱</p>
      </el-col>
      <el-col :span="6" class="menu-icon theme-home-icon-bg" @click="goMenuPath('/level/menu2')">
        <div class="icon-img img7"></div>
        <p>智慧党建</p>
      </el-col>
    </el-row>
    <el-row class="bottom-info">
      <el-col :span="12">
        <div class="china-map menu-bottom">
          <div class="list-header">
            <div class="line"></div>
            <p>全国海关队伍建设情况</p>
          </div>
          <!-- <img src="@/assets/img/chinamap.png" alt="" class="china-map" /> -->
          <el-radio-group v-model="theme" @input="handleThemeChange">
            <el-radio label="#094194">蓝色</el-radio>
            <el-radio label="#a91415">红色</el-radio>
            <el-radio label="#8a46ff">紫色</el-radio>
            <el-radio label="#73c088">绿色</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="home-list menu-bottom">
          <div class="list-header">
            <div class="line"></div>
            <p>中心任务推进情况</p>
          </div>
          <ul class="list-ul">
            <li class="list-li" v-for="(item, index) in homeList" :key="index">
              <p class="list-num">{{ index + 1 }}</p>
              <p class="list-title">{{ item.title }}</p>
              <el-button type="text" class="list-btn">查看详细</el-button>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
      theme: localStorage.getItem('theme'),
      homeList: [
        {
          title: '推进智慧海关建设',
          id: 1
        },
        {
          title: '推进智关强国行动',
          id: 2
        },
        {
          title: '着力构建全链条安全监管体系',
          id: 3
        },
        {
          title: '守牢疫情防控第一道防线',
          id: 4
        },
        {
          title: '落实一揽子外贸促稳提质措施',
          id: 5
        },
        {
          title: '服务高质量共建“一带一路’',
          id: 6
        },
        {
          title: '打造高水平对外开放平台',
          id: 7
        },
        {
          title: '坚持高标准全面从严治党',
          id: 8
        },
        {
          title: '推进智慧海关建设',
          id: 9
        },
        {
          title: '推进智慧海关建设',
          id: 10
        }
      ]
    }
  },
  methods: {
    // 选择设置主题色
    handleThemeChange (val) {
      this.$store.commit('SET_THEME', val)
      // 保存主题色的设置在本地，避免在刷新时主题色被置空
      localStorage.setItem('theme', val)
      // 存储主题色为变量
      document.documentElement.style.setProperty('--theme-color', val)
    },
    goMenuPath (path) {
      this.$router.push(path)
    }
  },
  created: function() {},
  // 通过计算属性返回状态
  computed: {},
  mounted: function() {}
}
</script>
<style lang="less" scoped>
.top-menu {
  width: 100%;
  .menu-icon {
    text-align: center;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 95%;
    cursor: pointer;
    .icon-img {
      width: 150px;
      height: 120px;
      margin: 0 auto;
      background-position: center;
      background-repeat: no-repeat;
      background-size: inherit;
    }
    p {
      font-size: 22px;
      font-weight: 600;
      color: #3a4049;
      margin-bottom: 10px;
      margin-top: -15px;
    }
  }
}
.bottom-info {
  height: 450px;
  .el-col-12 {
    height: 100%;
  }
}
.menu-bottom {
  border-radius: 10px;
  height: 100%;
  margin-top: 10px;
  background: linear-gradient(256.55deg, #e2edfb 0%, #fffffd 100%);
  .list-header {
    display: flex;
    border-bottom: 2px solid #e4e4e4;
    padding: 0 10px;
    height: 50px;
    align-items: center;
    color: #3a4049;
    .line {
      width: 5px;
      height: 20px;
      background: var(--theme-color);
      margin-right: 5px;
    }
    p {
      margin: 0;
    }
  }
}
.china-map {
  margin-right: 5px;
  .china-map {
    height: 90%;
    margin-left: 15%;
  }
}
.home-list {
  margin-left: 5px;
  .list-ul {
    height: calc(100% - 60px);
    padding: 0 15px;
    overflow: scroll;
    margin: 0;
    .list-li {
      display: flex;
      border-bottom: 2px solid #e4e4e4;
      height: 50px;
      align-items: center;
      .list-num {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        color: #fff;
        background: var(--theme-color);
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        margin-right: 10px;
        margin-bottom: 0;
      }
      .list-title {
        margin: 0;
        flex: 1;
        color: #55595e;
      }
      .list-btn {
        color: var(--theme-color);
      }
    }
  }
}
</style>
