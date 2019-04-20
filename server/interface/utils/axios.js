import axios from 'axios'

// 创建实例
const instance = axios.create({
  // 获取环境变量的主机：端口号
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  // 超时
  timeout: 2000,
  headers: {

  }
})

export default instance
