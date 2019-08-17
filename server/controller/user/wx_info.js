import { resdata, errdata } from '../../utils/serve'
// 登录
exports.wx_info = async (ctx, next) => {
  return {
    "code": 201,
    "msg": "ok",
    "errorCode": 0,
    "shouldToClient": true
  }
}