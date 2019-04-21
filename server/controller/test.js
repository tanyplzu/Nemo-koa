import { resdata, errdata } from '../../utils/serve'
exports.register = async (ctx) => {
  let newUser = {
    username: ctx.username,
    userid: ctx.userid,
    password: '123456',
    phone: '',
    emial: '',
    content: '123123'
  }
  try {
    return resdata('0', 'success', newUser);
  } catch (err) {
    throw new Error(err);
    return errdata(err);
  }
}
