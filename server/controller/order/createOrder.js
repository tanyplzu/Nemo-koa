import {
  resdata,
  errdata
} from '../../utils/serve'

exports.createOrder = async (ctx, next) => {
  let {
    id,
    price,
    count
  } = ctx.request.body
  let time = Date()
  let orderID = md5(Math.random() * 1000 + time).toString() // 创建订单ID
  if (!ctx.isAuthenticated()) {
    return errdata('please login');
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
      if (result) {
        await findCart.remove() // 如果下单成功，删除对应购物车数据
        ctx.body = {
          code: 0,
          id: orderID //回传订单ID
        }
        return resdata('success', orderID);
      } else {
        return resdata();
      }
    } catch (e) {
      return errdata(e);
    }
  }
}
