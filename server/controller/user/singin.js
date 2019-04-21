import Passport from '../../utils/passport'
import { resdata, errdata } from '../../utils/serve'
// 登录
exports.signin = async (ctx, next) => {
  // 调用passport-local策略，会返回信息
  Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      return errdata(err);
    } else {
      if (user) {
        return resdata('0', '登陆成功', user);
      } else {
        return resdata('1', info);
      }
    }
  })(ctx)
}
