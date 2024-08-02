<template>
  <div style="background:#fff;">
    <div class="tagRouter">
      <el-scrollbar :vertical="true" ref="scrollWrapper" class="scroll-container" @wheel.native.prevent="handleScroll">
        <router-link v-for="(item, index) in routerList" class="tags-view-item" :class="isActive(item) ? 'active-tags' : ''" :key="index" tag="span" ref="tag" :to="{path: item.path }">
          {{ item.name }}
          <i class="el-icon-close" v-if="routerList.length !== 1" @click.prevent.stop="handleCloseTag(item, index)"></i>
        </router-link>
      </el-scrollbar>
      <!-- <div class="operationManual" @click="handleDownOperation">
        <i class="el-icon-question"></i>
        帮助手册
      </div> -->
    </div>
  </div>
</template>

<script>
import global from '@/global/global.js'
// import { dellocked } from '@/api/hexp/hp/check/checkProcessModification/index.js'
// import { unlock } from '@/api/hexp/hp/random/distributeLeaflets/index.js'
const tagAndTagSpacing = 4
export default {
  name: 'tagRouter',
  data() {
    return {}
  },
  watch: {
    $route() {
      this.handleMoveCurrentTag()
    }
  },
  methods: {
    isActive(item) {
      return item.path === this.$route.path
    },
    handleCloseTag(item, index) {
      if (
        index === this.routerList.length - 1 &&
        !this.isActive(this.routerList[0])
      ) {
        this.$router.push({
          path: this.routerList[this.routerList.length - 2].path
        })
      } else if (
        this.isActive(this.routerList[0]) ||
        this.routerList.length > 0
      ) {
        if (index === 0) {
          this.$router.push({
            path: this.routerList[this.routerList.length - 1].path
          })
        }
      } else {
        this.$router.push({
          path: this.routerList[this.routerList.length - 1].path
        })
      }
      this.$store.commit('DEL_ROUTERLIST', item)
      this.$store.commit('DEL_CACHEROUTERLIST', item)
      if (item.name === '分单查验结果录入' && this.tabData.length > 0) {
        let arr = []
        this.tabData.forEach(item => {
          arr.push({ resourceKey: item.entryId })
        })
        if (arr.length > 0) {
          // dellocked({ query: [...arr] })
          //   .then(res => {
          //     if (res.data.code !== '200') {
          //       this.$alert(res.data.message, '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //   })
          //   .catch(error => {
          //     console.log(error)
          //   })
        }
      } else if (item.name === '查验随机派单') {
        // unlock().then(res => {
        //   if (res.data.code !== '200') {
        //     this.$alert(res.data.message, '提示', {
        //       confirmButtonText: '确定'
        //     })
        //   }
        // })
      }
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft += eventDelta / 4
    },
    handleMoveToTarget(currentTag) {
      const $container = this.$refs.scrollWrapper.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = this.$refs.tag
      let firstTag = null
      let lastTag = null
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]
        const afterNextTagoffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing
        if (
          afterNextTagoffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    },
    handleMoveCurrentTag() {
      const tagsList = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tagsList) {
          if (tag.to.path === this.$route.path) {
            this.handleMoveToTarget(tag)
            break
          }
        }
      })
    },
    handleDownOperation() {
      window.location.href = global.TARGETS + '/operateManual/download'
    }
  },
  computed: {
    routerList() {
      return this.$store.state.publicData.addRouterList
    },
    scrollWrapper() {
      return this.$refs.scrollWrapper.$refs.wrap
    },
    tabData() {
      return this.$store.state.publicData.tabData
    }
  }
}
</script>
<style>
.tagRouter {
  width: calc(100% - 115px);
  position: relative;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  margin-bottom: 10px;
}
.operationManual {
  position: absolute;
  cursor: pointer;
  height: 50px;
  top: 0;
  right: -89px;
  cursor: pointer;
  color: #409eff;
  font-size: 16px;
  font-style: normal;
  display: flex;
  padding-right: 2px;
  align-items: center;
}
.operationManual > i {
  font-size: 20px;
  margin-right: 5px;
}
.tags-view-item {
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  border-radius: 2px;
  display: inline-block;
  border: 1px solid #eeeeee;
  margin-right: 10px;
}
.active-tags {
  background: #1786ec;
  color: #ffffff;
  border-color: #1786ec;
}
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.tagRouter .el-scrollbar__thumb {
  width: 0px;
}
</style>
