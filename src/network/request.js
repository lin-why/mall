import axios from 'axios'
  //利用instance本身是promise函数的特性 直接return 出来 在需要的地方使用.then和.catch
export function request (config) {
  const instance = axios.create({
    baseURL: '**********************', //url的公共部分
    timeout: 5000
  })

  // instance.interceptors.request.use(config => {
  //   // console.log(config)
  //   //比如config中的一些信息不符合服务器的要求
  //   //比如每次发送网络请求时,都希望显示一个请求的图标
  //   //某些网络请求(比如登录(token)),必须携带一些特殊的信息
  //   return config
  // },err => {
  //   console.log(err)
  // })

  // instance.interceptors.response.use(res =>{
  //   console.log(res)
  //   return res
  // },err => {
  //   console.log(err)
  // })
  return instance(config)
}




      //利用Promise方法封装request请求
// export function request (config) {
//   //创建axios的实例
//   return new Promise((reslove, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     //发送真正的网络请求
//     instance(config).then(res =>{
//       reslove(res)
//     })
//     .catch(err => {
//       reject(err)
//     })
//   })
// }
// export function request (config) {
//   //创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   //发送真正的网络请求
//   instance(config)
// }