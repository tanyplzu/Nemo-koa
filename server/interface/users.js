import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../../config/emailConfig'
import axios from './utils/axios'

let router = new Router()

// 获取redis客户端
let Store = new Redis().client
// 测试
router.get('/test',async (ctx) => {
    ctx.body = {
        data: '成功！'
    }
})
// 注册接口
// post方法，用ctx.request.body获取数据
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;

  // 校验，从redis获取发送的验证码和过期时间
  if(code){
    const saveCode = await Store.hget(`nodemail:${username}`,'code')
    const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
    // 验证码校验
    if(code === saveCode) {
      if(new Date().getTime() - saveExpire > 0){
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
// 用户名是否已被注册校验
  let user = await User.find({
    username
  })
  if(user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  // 写入数据库
  let nuser = await User.create({
    username,
    password,
    email
  })
  // 检查是否成功写入
  if(nuser) {
    // 登录
    let res = await axios.post('/users/signin',{
      username,
      password
    })
    // 检测是否成功登录
    if(res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else { // 写库失败
    ctx.body = {
      code: -1,
      msg:'注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  // 调用passport-local策略，会返回信息
  return Passport.authenticate('local',function(err,user,info,status) {
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if(user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          user // 返回user
        }
        return ctx.login(user) // 登录动作
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 发送验证码
router.post('/verify', async (ctx,next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
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
  await transporter.sendMail(mailOptions,(error,info) =>{
    if(error) {
      return console.log('error')
    } else {
      // 存储，以供验证
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延迟，有效期一分钟'
  }
})

// 退出接口
router.get('/exit', async (ctx,next) => {
  await ctx.logout()
  if(!ctx.isAuthenticated()){ //没登陆,passport 文档中定义
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息
router.get('/getUser', async (ctx) => {
  if(ctx.isAuthenticated()) { // 如果已登录
    const {username,email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email: email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})
// 导出路由，上述接口才会生效
export default router
