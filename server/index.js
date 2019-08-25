import Router from 'koa-router'
// import user from './routes/user'
// import token from './routes/token'
// import person from './routes/person'
import banner from './routes/banner'
// import product from './routes/product'
// import categroy from './routes/categroy'
// import order from './routes/order'

let router = new Router()

// router.use('/token', token.routes(), user.allowedMethods());
// router.use('/user', user.routes(), user.allowedMethods());
// router.use(person.routes()).use(person.allowedMethods());
router.use(banner.routes()).use(banner.allowedMethods());
// router.use('/product', product.routes()).use(product.allowedMethods())
// router.use('/category', categroy.routes()).use(categroy.allowedMethods())
// Router.use(categroy.routes()).use(categroy.allowedMethods())
// Router.use(cart.routes()).use(cart.allowedMethods())
// Router.use(order.routes()).use(order.allowedMethods())
export default router