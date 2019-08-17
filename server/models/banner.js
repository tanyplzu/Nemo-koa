import mongoose from 'mongoose'
const Schema = mongoose.Schema
const BannerItem = new Schema({
  _id: false,
  key_word: {
    type: String,
    require: true
  },
  img_id: {
    type: String,
    require: true
  },
}, {
  timestamps: {
    createdAt: 'created_time',
    updatedAt: 'update_time'
  }
})

const Banner = new Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  items: [BannerItem],
}, {
  timestamps: {
    createdAt: 'created_time',
    updatedAt: 'update_time',
  }
})

export default mongoose.model('Banner', Banner)