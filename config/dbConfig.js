export default {
  // 数据库配置
  dbs: 'mongodb://127.0.0.1:27017/student',
  // redis配置
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
}
