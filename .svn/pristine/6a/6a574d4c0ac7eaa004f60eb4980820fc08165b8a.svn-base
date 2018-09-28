import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  console.log('token值为='+getToken())
  if (store.getters.token) {
    config.headers['Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log('返回值DATA\n' + JSON.stringify(res,null,2))
    // if (res.errno !== 0) {
    //   MessageBox.alert('超时自动退出系统，请重新登录', '已退出', {
    //     confirmButtonText: '重新登录',
    //     type: 'error'
    //   }).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //       location.reload()
    //     })
    //   })
    //   return Promise.reject('error')
    // } else {
    //   return response
    // }
    if (res.code === '2000') {
      return response.data
    }else if (res.code === '3001') {
      store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
      })
      return Promise.reject('error')
    }else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  }, error => {
    var errMessage = ''
    console.log('返回值进到这里' + error.response.status)
    switch (error.response.status) {
      case 400:
        errMessage = '400请求错误'
        break

      case 401:
        errMessage = '401未授权，请登录'
        break

      case 403:
        errMessage = '403拒绝访问'
        break

      case 404:
        errMessage = '404请求地址出错: '
        break

      case 408:
        errMessage = '408请求超时'
        break

      case 500:
        errMessage = '500服务器内部错误'
        break

      case 501:
        errMessage = '501服务未实现'
        break

      case 502:
        errMessage = '502网关错误'
        break

      case 503:
        errMessage = '503服务不可用'
        break

      case 504:
        errMessage = '504网关超时'
        break

      case 505:
        errMessage = '505HTTP版本不受支持'
        break

      default:
        errMessage = '未知异常'
        break
    }
    console.log('错误处理errMessage' + errMessage)// for debug
    console.log('错误处理' + error)// for debug
    Message({
      message: errMessage,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
