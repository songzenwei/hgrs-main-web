/* 调整左侧菜单 */
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
    }
  },
  computed: {
    opens () {
      return this.$store.state.assessment.opne
    },
    isLeftMenu () {
      return this.$store.state.user.open
    }
  },
  mounted () {
    setTimeout(() => {
      this.handledragControllerDiv()
    }, 200)
  },
  watch: {
    isLeftMenu () {
      setTimeout(() => {
        this.handledragControllerDiv()
      }, 200)
    }
  },
  methods: {
    handledragControllerDiv () {
      const resize = document.getElementById('bk_resize')
      const left = document.getElementById('public_left')
      // const right = document.getElementById('public_right')
      const box = document.getElementById('public')
      const menuAside = document.getElementById('menuAside')
      resize.onmousedown = (e) => {
        const startX = e.clientX + (!this.isLeftMenu ? (menuAside ? menuAside.offsetWidth + 60 : 60) : 0)
        resize.left = resize.offsetLeft
        box.onmousemove = function (e) {
          const endX = e.clientX
          let moveLen = resize.left + (endX - startX)
          const maxT = box.clientWidth - resize.offsetWidth
          if (moveLen > maxT - 670) moveLen = maxT - 680
          resize.style.left = moveLen
          left.style.width = moveLen + 'px'
          // right.style.width = (box.clientWidth - moveLen - 13) + 'px'
          eventBus.$emit('expandMenu')
        }
        box.onmouseup = function () {
          box.onmousemove = null
          box.onmouseup = null
          box.releaseCapture && resize.releaseCapture()
        }
        box.setCapture && box.setCapture()
        return false
      }
    }
  }
}
