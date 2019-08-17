import Router from 'koa-router'
import { addProduct, recent } from '../controller/productCtrl'

let router = new Router()
router.post('/addProduct', async (ctx) => {
  ctx.body = await addProduct(ctx);
})
router.get('/recent', async (ctx) => {
  ctx.body = await recent(ctx);
})
router.get('/by_category', async (ctx) => {
  ctx.body = await recent(ctx);
})
export default router