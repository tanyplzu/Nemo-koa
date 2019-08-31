import Router from 'koa-router'
import { getBanner, addBanner } from '../controller/v1/banner'
import { addBannerItem } from '../controller/v1/bannerItem'

let router = new Router()
router.post('/addBanner', async (ctx) => {
  ctx.body = await addBanner(ctx);
})
router.get('/banner/:id', async (ctx) => {
  ctx.body = await getBanner(ctx);
})
router.post('/addBannerItem', async (ctx) => {
  ctx.body = await addBannerItem(ctx);
})
export default router