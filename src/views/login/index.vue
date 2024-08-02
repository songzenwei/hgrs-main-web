<!--
 * @Author: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @Date: 2024-07-25 17:40:16
 * @LastEditors: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @LastEditTime: 2024-07-26 16:50:34
 * @FilePath: \hgrs-main-web\src\views\login\index.vue
 * @Description: 登陆页面
-->
<template>
  <button @click="handleLogin">login</button>
</template>
<script>
import { SERVICEID } from '@/config.js'
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleLogin () {
      // this.loading = true
      this.$router.push({
        path: `/${SERVICEID}/home-custom/index`
      })
      try {
        // const res = await login({
        //   username: this.username,
        //   pwd: this.$sm3(this.password),
        //   uuid: this.uuid,
        //   code: this.verificationCode,
        //   end: 'b' // 端类型，这里先写死后端，生产环境由服务器端进行判定
        // })
        // if (res.detail !== null && res.detail.login_msg) {
        //   handleAlert(res.detail.login_msg, 'warning', 0, 3)
        // }
        // if (res.detail !== null && (res.detail.face === 1 || res.detail.face === '1')) {
        //   this.uid = res.detail.uid
        //   this.loading = false
        //   this.CameraLoginVisible = true
        // } else {
        //   this.handleChangeUser(res)
        // }
      } catch (e) {
        // this.loading = false
      }
    },
    handleChangeUser () {
      const res = this.handleGetCachedDicsBySetCode()
      if (res.success) {
        // setLocData('loginUrl', JSON.stringify(window.location.origin + '/zplatform/' + '#/login'))
        // setLocData('homeUrl', JSON.stringify(window.location.origin + '/zplatform/' + '#/home'))
        // setLocData('loginSuccess', '1')
        this.handleGetUserInfor()
      } else {
        // this.loading = false
        // setLocData('loginSuccess', '0')
      }
    },
    handleGetUserInfor () {
      // getCurrentUser().then((res) => {
      //   if (res.success) {
      //     // 存储用户登录信息
      //     setLocData('userInfor', JSON.stringify(res.detail))
      //     this.loading = false
      //     this.handleToTargetAddress()
      //   }
      // }).catch(e => {
      //   this.loading = false
      //   throw new Error(e)
      // })
    }
  }
}
</script>
