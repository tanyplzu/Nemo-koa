import Router from 'koa-router'
import Order from '../models/order'
import Cart from '../models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({prefix: '/order'})
// 创建订单接口
router.post('/createOrder', async ctx=> {
  let {id,price,count} = ctx.request.body
  let time = Date()
  let orderID = md5(Math.random() * 1000 + time).toString() // 创建订单ID
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let findCart = await Cart.findOne({ // 从购物车数据库查找购物车
      cartNo: id
    })
    let order = new Order({ // 创建购物车实例
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0
    })
    try {
      let result = await order.save(); // 入库
      if(result) {
        await findCart.remove() // 如果下单成功，删除对应购物车数据
        ctx.body = {
          code: 0,
          id: orderID //回传订单ID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1
      }
    }
  }
})
// 获取所有订单接口
router.post('/getOrders',async ctx => {
  if(!ctx.isAuthenticated()){ // 登陆拦截
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    try {
      let result = await Order.find()// 如果做分页，.limit(15)
      if(result) {
        ctx.body = {
          code: 0,
          list: result
        }
      }else {
        ctx.body ={
          code: -1,
          list: []
        }
      }
    }catch(e) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})
export default router
