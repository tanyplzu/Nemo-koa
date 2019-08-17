import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  order_no: {
    type: String,
    require: true
  },
  user_id: {
    type: String,
    require: true
  },
  delete_time: {
    type: Number,
    require: true
  },
  create_time: {
    type: Array,
    require: true
  },
  total_price: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  snap_img: {
    type: String,
    require: true
  },
  snap_name: {
    type: String,
    require: true
  },
  total_count: {
    type: String,
    require: true
  },
  update_time: {
    type: String,
    require: true
  },
  snap_items: {
    type: String,
    require: true
  },
  snap_address: {
    type: String,
    require: true
  },
  prepay_id: {
    type: String,
    require: true
  }
})

export default mongoose.model('Order', Order)
