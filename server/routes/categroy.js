import Router from 'koa-router'
import { addCategroy, all } from '../controller/categroyCtrl'

let router = new Router()
router.post('/addCategroy', async (ctx) => {
  ctx.body = await addCategroy(ctx);
})
router.get('/all', async (ctx) => {
  ctx.body = await all(ctx);
})
export default router