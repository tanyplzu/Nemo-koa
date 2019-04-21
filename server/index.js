import Router from 'koa-router'
import user from './routes/user'
import geo from './routes/geo'
import search from './routes/search'
import categroy from './routes/categroy'
import cart from './routes/cart'
import order from './routes/order'

let router = new Router()
router.use('/users', user.routes(), user.allowedMethods())
// Router.use(geo.routes()).use(geo.allowedMethods())
// Router.use(search.routes()).use(search.allowedMethods())
// Router.use(categroy.routes()).use(categroy.allowedMethods())
// Router.use(cart.routes()).use(cart.allowedMethods())
// Router.use(order.routes()).use(order.allowedMethods())
export default router
