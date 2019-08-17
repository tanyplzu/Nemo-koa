import Router from 'koa-router'
import { addBanner, getBanner } from '../controller/bannerCtrl'

let router = new Router()
router.post('/addBanner', async (ctx) => {
  ctx.body = await addBanner(ctx);
})
router.get('/banner/:id', async (ctx) => {
  ctx.body = await getBanner(ctx);
})
export default router