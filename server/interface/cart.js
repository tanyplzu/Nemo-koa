import Router from 'koa-router'
import Cart from '../dbs/models/cart'
import axios from './utils/axios'
import md5 from 'crypto-js/md5'

let router = new Router({prefix: '/cart'})

//创建购物车
router.post('/create', async ctx => {
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString() // 购物车id生成
    let {
      params: {
        id,
        detail
      }
    } = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user, // user获取
      detail
    })
    let result = await cart.save() // 入库操作
    if (result){
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo // 返回购物车ID
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})
// 获取购物车信息
router.post('/getCart',async ctx => {
  let {id} = ctx.request.body
  try {
    // 读取购物车数据
    let result = await Cart.findOne({cartNo: id})
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {} // 因为逻辑是每买一个就创建一个购物车，不是一个整体的购物车，所以是[0]
    }
  }catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
