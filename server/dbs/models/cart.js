import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  user: { // 购物车和用户是强关联的
    type: String,
    requeir: true
  },
  time: { // 跟踪购物车创建时间
    type: String, // Date有时区概念，为了保持一致可以用String
    require: true
  }
})

export default mongoose.model('Cart', Cart)
