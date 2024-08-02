import axios from 'axios'
import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true, // 跨域请求携带凭据
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})

// request 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone 响应拦截器
service.interceptors.response.use(
  response => response,
  error => {
    const { status, statusText, headers, data } = error.response
    const errortext = codeMessage[status] || statusText
    const { addtionalMessage, code } = data
    var loginUrl = data.loginUrl
    var logoutUrl = data.logoutUrl
    if (status === 401) {
      // 拦截登录信息跳转
      if (code === '11001' || code === '11002' || code === '11003') { // 11002 用户信息为空
        const start = loginUrl.indexOf('&ru=')
        const end = loginUrl.indexOf('&fc=')
        const rep = loginUrl.substring(start, end)
        var hrefStr = window.location.href
        // 截取域名 + /
        if (hrefStr.includes('?token') === true) {
          const num = hrefStr.indexOf('?token=')
          const token = /token=([^=&]*)/.exec(hrefStr)[1]
          console.log('token------', decodeURIComponent(token))
          localStorage.setItem('token', decodeURIComponent(token))
          hrefStr = hrefStr.substring(0, num)
        }
        const lchref = escape(hrefStr)
        const realurl = '&ru=' + lchref
        const hrefUrl = loginUrl.replace(rep, realurl)
        window.open(hrefUrl, '_self')
      } else if (code === '11004') {
        const indexhref = localStorage.getItem('href')
        window.open(`${logoutUrl}?ru=http://${indexhref}&lar=1`, '_self')
      } else if (code === '01003') {
        MessageBox.alert(
          `<p style="font-size: 20px;color:red;">会话超时</p>`,
          '提示',
          {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning',
            callback: action => {
              let lchref = localStorage.getItem('href')
              let realurl = '?ru=http://' + lchref + '&lar=1'
              let hrefUrl = addtionalMessage + realurl
              window.location.href = hrefUrl
            }
          }
        )
      }
      Message.error(errortext)
    }
    console.log(
      'response：' + status + '~' + statusText + '~' + headers + '~' + data
    ) // for debug
    Message({
      message: errortext,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
Vue.prototype.$http = service // 注册全局service

export default service
