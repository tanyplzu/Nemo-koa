import Router from 'koa-router'
import { getBanner, addBanner } from '../controller/v1/banner'

let router = new Router()
router.post('/addBanner', async (ctx) => {
  ctx.body = await addBanner(ctx);
})
router.get('/banner/:id', async (ctx) => {
  ctx.body = await getBanner(ctx);
})
export default router