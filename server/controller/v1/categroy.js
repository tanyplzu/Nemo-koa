import { resdata, errdata } from '../utils/serve'
import Categroy from '../models/categroy'

exports.addCategroy = async (ctx) => {
  const { name, topic_img_id, description } = ctx.request.body
  if (!name || !topic_img_id) {
    return errdata('参数错误！');
  }
  const categroy = new Categroy({
    name: name,
    topic_img_id: topic_img_id,
    description: description || '',
  })
  try {
    await categroy.save();
    return resdata();
  } catch (error) {
    return errdata(error);
  }
}
exports.all = async (ctx) => {
  const host = ctx.request.header.host;
  try {
    const categroys = await Categroy.find();
    let products = []
    if (products) {
      products = categroys.map(item => {
        return {
          name: item.name,
          description: item.description,
          img: {
            url: 'http://' + host + '/images/' + item.topic_img_id
          }
        }
      });
    }
    return products;
  } catch (error) {
    return errdata(error);
  }
}