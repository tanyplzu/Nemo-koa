import Router from 'koa-router'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'
import order from './interface/order'
// routes

let router = new Router()
router.use('/users', users.routes(), users.allowedMethods())
// Router.use(geo.routes()).use(geo.allowedMethods())
// Router.use(search.routes()).use(search.allowedMethods())
// Router.use(categroy.routes()).use(categroy.allowedMethods())
// Router.use(cart.routes()).use(cart.allowedMethods())
// Router.use(order.routes()).use(order.allowedMethods())
export default router
