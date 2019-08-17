import Router from 'koa-router'
import { user, verify } from '../controller/tokenCtrl.js'

let router = new Router()
router.post('/user', async (ctx) => {
  ctx.body = await user(ctx);
})
router.post('/verify', async (ctx) => {
  ctx.body = await verify(ctx);
})
export default router