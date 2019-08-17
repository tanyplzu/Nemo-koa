import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Categroy=new Schema({
  id:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  topic_img_id:{
    type:String,
    require:true
  },
  delete_time:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  update_time:{
    type:String,
    require:true
  }
})

export default mongoose.model('Categroy',Categroy)
