import { resdata, errdata } from '../utils/serve'
import Banner from '../models/banner'

exports.addBanner = async (ctx) => {
  const { name, description, items } = ctx.request.body
  if (!name || !description) {
    return errdata('参数错误！', ctx);
  }
  const banner = new Banner({
    name: name,
    description: description,
    items: items,
  })
  try {
    await banner.save();
    return resdata();
  } catch (error) {
    return errdata(error);
  }
}
exports.getBanner = async (ctx) => {
  const host = ctx.request.header.host;
  try {
    const banner = await Banner.findOne({
      _id: ctx.params.id
    })
    let items = []
    if (banner) {
      items = banner.items.map(item => {
        return {
          key_word: item.key_word,
          img: {
            url: 'http://' + host + '/images/' + item.img_id
          }
        }
      });
    }
    let banner1 = JSON.parse(JSON.stringify(banner));
    banner1.items = items
    return banner1;
  } catch (error) {
    return errdata(error);
  }
}