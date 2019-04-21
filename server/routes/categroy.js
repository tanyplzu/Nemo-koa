import Router from 'koa-router'
import axios from '../../utils/axios'

let router = new Router({
  prefix: '/categroy'
})
const sign = "a3c9fe0782107295ee9f1709edd15218";
router.get('/crumbs', async(ctx) => {
  let {status,data:{areas, types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params: {
      city: ctx.query.city.replace('市','') || "北京",
      sign
    }
})
if(status === 200) {
    ctx.body = {
      areas,
      types
    }
}
})
export default router
