import { resdata, errdata } from '../../utils/serve'
// 登录
exports.getUser = async (ctx, next) => {
  if (ctx.isAuthenticated()) { // 如果已登录
    const { username, email } = ctx.session.passport.user
    return resdata('0', '', {
      user: username,
      email: email
    });
  } else {
    return resdata('0', '', {
      user: '',
      email: ''
    });
  }
}
