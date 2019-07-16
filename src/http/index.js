// 导出一个已经配置好的axios
import axios from 'axios'

// // // baseURL 全局配置
// // // 获取源系统数据模式
// // // axios.defaults.baseURL = 'http://10.30.140.204:6269'
// // // ODS建表/ODS脚本生成
// // // axios.defaults.baseURL = 'http://10.30.140.97:6269'
// // // DW建表/DW脚本生成
// axios.defaults.baseURL = 'http://10.119.1.40:6269'

var baseURL
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:6269' // 开发
 // baseURL = 'http://10.30.140.77:6269' // 开发
  // baseURL = 'http://10.30.138.173:6269' // 入湖报告
  // baseURL = 'http://10.30.140.139:6269' // 入湖总览
} else if (process.env.NODE_ENV === 'testing') {
  baseURL = 'http://10.119.1.41:6269' // 测试
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://10.119.1.40:6269' // 线上环境
}
axios.defaults.baseURL = baseURL

// axios.interceptors.response.use(function (res) {
//   // 对响应数据做点什么
//   console.log(res)
//   return res;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

// // // 导出
export default axios
