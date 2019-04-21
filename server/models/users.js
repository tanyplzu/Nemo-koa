import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true, // 唯一
    require: true // 必须
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

export default mongoose.model('User', UserSchema)
