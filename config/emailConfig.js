export default {
  // smtp配置
  smtp: {
    get host() {
      return 'smtp.qq.com' // 腾讯的qq邮箱
    },
    get user() {
      return '759227027@qq.com' // 账户
    },
    get pass() {
      return 'yujjftbfwbtwbeeg' // 授权码
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase() // 随机生成4位验证码
      }
    },
    // 设置过期时间
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000 // 1分钟有效时间
      }
    }
  },
}
