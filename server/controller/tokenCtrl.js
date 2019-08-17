import { errdata } from '../utils/serve'
import { getToken } from '../utils/userToken'
import { get } from 'https';
exports.user = async (ctx) => {
  const { code } = ctx.request.body
  if(!code){
    errdata('token获取失败！')
  }
  const {data} = await getToken(code);
  console.log(2222)
  return {
    token: session
  };
}
exports.verify = async (ctx) => {
  const token = '124234';
  return {
    token: token
  };
}