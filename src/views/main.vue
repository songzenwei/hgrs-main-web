<template>
  <div :id="SERVICEID" :class="SERVICEID">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '@/config.js'
import routes from '@/router/routes.js'
import axios from 'axios'

export default {
  data() {
    return {
      SERVICEID,
      SERVICENAME
    }
  },
  created() {
    axios.get('/api/frameworkserver/frameRealmName').then(res => {
      localStorage.setItem('href', res.data)
    })
  }
}
</script>

