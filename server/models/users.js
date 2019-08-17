import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  id: {
    type: String,
    unique: true, // 唯一
    require: true // 必须
  },
  openid: {
    type: String,
    require: true
  },
  nickname: {
    type: String,
    require: true
  },
  extend: {
    type: String,
    require: true
  },
  delete_time: {
    type: String,
    require: true
  },
  create_time: {
    type: String,
    require: true
  },
  update_time: {
    type: String,
    require: true
  }
})

export default mongoose.model('User', UserSchema)
