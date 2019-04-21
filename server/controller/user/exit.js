import { resdata, errdata } from '../../utils/serve'
// 登录
exports.exit = async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) { //没登陆,passport 文档中定义
    return resdata('0');
  } else {
    return resdata('-1');
  }
}
