import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Person = new Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
  },
  age: {
    type: Number
  }
})

export default mongoose.model('Person', Person)
