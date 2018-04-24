import axios from 'axios'
import router from './router/index'
import { Loading, Message } from 'element-ui'
import store from './store/index'
import * as types from './store/types'

//全局默认配置
//超时时间
axios.default.timeout = 5000
//全局请求headers配置
// axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')

axios.defaults.headers.post['Content-Type'] = 'application/json'

var instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

//添加一个请求拦截器
// axios.interceptors.request.use = instance.interceptors.request.use
// instance.interceptors.request.use(config => {
//   if(sessionStorage.getItem('token')) {
//     config.headers.Authorization = `token ${localStorage.getItem('token')}`
//     .replace(/(^\")|(\"$)/g, '')
//   }
//   return config
// },err => {
//   return Promise.reject(err)
// })

// axios.interceptors.request.use = instance.interceptors.request.use
// instance.interceptors.request.use(config => {
//   if(!(sessionStorage.getItem('username'))){
//     Message.info({
//       message: '登录失效！请重新登录'
//     })
//     router.replace({
//       path: '/login',
//       query: {redirect: router.currentRoute.fullPath}
//     })
//   }
//   return config
// },err => {
//   return Promise.reject(err)
// })

//axios响应拦截器
axios.interceptors.response.use(function(response){
  if(response.data.status == 401) {
    Message.info({
      message: '登录失效！请重新登录'
    })
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return response
}, err => {
  // Message.error({
  //   message: '页面出错，请联系管理员解决'
  // })
  // router.replace({
  //   path: '/login',
  //   query: {redirect: router.currentRoute.fullPath}
  // })
  return Promise.reject(err)
  // return err
})
export default axios
// export default {
//   //用户注册
//   userRegister(data) {
//     return instance.post('/api/register', data)
//   },
//   //用户登录
//   userLogin(data) {
//     return instance.post('/userLogin', data)
//   },
//   //获取用户
//   getUser() {
//     return instance.get('/getUser')
//   },
//   //删除用户
//   delUser(data) {
//     return instance.post('/api/delUser', data)
//   },
//   //获取部门
//   // getDepartment() {
//   //   return instance.get('/getDepartment')
//   // }
// }
