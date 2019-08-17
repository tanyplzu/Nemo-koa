import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Product = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String
  },
  stock: {
    type: String
  },
  delete_time: {
    type: String
  },
  category_id: {
    type: String
  },
  main_img_url: {
    type: String
  },
  from: {
    type: String
  },
  create_time: {
    type: String
  },
  update_time: {
    type: String
  },
  summary: {
    type: String
  },
  img_id: {
    type: String
  }
})

export default mongoose.model('Product', Product)
