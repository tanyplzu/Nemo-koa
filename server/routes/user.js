import Router from 'koa-router'
import { signUp, verify } from '../controller/user/signup'
import { signin } from '../controller/user/signin'
import { getUser } from '../controller/user/getUser'
import { exit } from '../controller/user/exit'

let router = new Router()
// 注册接口
router.post('/signup', async (ctx) => {
  ctx.body = await signUp(ctx);
})
// 发送验证码
router.post('/verify', async (ctx, next) => {
  ctx.body = await verify(ctx, next);
})
// 登录接口
router.post('/signin', async (ctx, next) => {
  ctx.body = await signin(ctx);
})
// 获取用户信息
router.get('/getUser', async (ctx) => {
  ctx.body = await getUser(ctx);
})
// 退出接口
router.get('/exit', async (ctx, next) => {
  ctx.body = await exit(ctx);
})
export default router
