import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../../models/users'
import Email from '../../../config/emailConfig'
import axios from '../../../utils/axios'
import { resdata, errdata } from '../../utils/serve'

// 获取redis客户端
let Store = new Redis().client

exports.test = (ctx, next) => {
  return resdata('0', '注册成功');
}
exports.signup = async (ctx, next) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;

  // 校验，从redis获取发送的验证码和过期时间
  try {
    if (code) {
      const saveCode = await Store.hget(`nodemail:${username}`, 'code')
      const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
      // 验证码校验
      if (code === saveCode) {
        if (new Date().getTime() - saveExpire > 0) {
          return resdata('-1', '验证码已过期，请重新尝试', '');
        }
      } else {
        return resdata('-1', '请填写正确的验证码', '');
      }
    } else {
      return resdata('-1', '请填写验证码', '');
    }
    // 用户名是否已被注册校验
    let user = await User.find({
      username
    })
    if (user.length) {

      return resdata('-1', '已被注册', '');
    }
    // 写入数据库
    let nuser = await User.create({
      username,
      password,
      email
    })
    // 检查是否成功写入
    if (nuser) {
      // 登录
      let res = await axios.post('/users/signin', {
        username,
        password
      })
      // 检测是否成功登录
      if (res.data && res.data.code === 0) {
        return resdata('0', '注册成功', '');
      } else {
        return resdata('-1');
      }
    } else { // 写库失败
      return resdata('-1', '注册失败', '');
    }
  } catch (err) {
    throw new Error(err);
    return errdata(err);
  }
}

// 发送验证码
exports.verify = async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    return resdata('-1', '验证请求过于频繁，1分钟内1次');
  }
  // 邮件相关
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false, // true 就是监听405端口，false为其他端口
    auth: { // 账户
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  // 明确要发送的信息和接受方
  let ko = {
    code: Email.smtp.code(), // 要发送的验证码
    expire: Email.smtp.expire, // 过期时间
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // 定义邮件中要显示的内容
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '美团网验证码',
    html: `您正在注册美团网账户，您的邀请码是${ko.code}`
  }
  // 发送
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error')
    } else {
      // 存储，以供验证
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  return resdata('0', '验证码已发送，可能会有延迟，有效期一分钟');
}
