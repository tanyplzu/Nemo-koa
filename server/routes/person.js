import Router from 'koa-router'
import { addPerson, getPerson } from '../controller/personCtrl'

let router = new Router()
router.post('/addPerson', async (ctx) => {
  ctx.body = await addPerson(ctx);
})
router.get('/getPerson/:name', async (ctx) => {
  ctx.body = await getPerson(ctx);
})
export default router
