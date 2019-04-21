import Router from 'koa-router'
import axios from '../../utils/axios'

let router = new Router({
  prefix: '/search'
})

const sign = "a3c9fe0782107295ee9f1709edd15218";

router.get('/top', async (ctx) =>{
  let {status, data: {
      top
    }} = await axios.get(`http://cp-tools.cn/search/top`, {
  params: {
    input: ctx.query.input, //输入
    city: ctx.query.city,
    sign
  }
})
ctx.body = {
  top: status === 200
    ? top
    : []
}
})
// 热门搜索接口
router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.state.geo.position.city : ctx.query.city // vuex是客户端与服务端共享
  let {status, data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      sign,
      city
    }
})
  ctx.body = {
    result: status === 200 ? result : []
  }
})

// 首页底部数据接口
router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query;
  let {status, data:{count,pois}} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
    params: {
      city,
      keyword,
      sign
    }
})
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})
router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
  params: {
    keyword,
    city,
    sign
  }
})
if (status === 200) {
  ctx.body = {
    product,
    more: ctx.isAuthenticated() ? more: [], // 判断当前是否是登录状态
    login: ctx.isAuthenticated()
  }
}else{
  ctx.body = {
    product: {},
    more: ctx.isAuthenticated() ? more: [],
    login: ctx.isAuthenticated()
  }
}
})
export default router
