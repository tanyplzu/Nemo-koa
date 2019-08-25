import { resdata, errdata } from '../../utils/serve'
import { Banner } from '../../models/banner'

exports.addBanner = async (ctx) => {
  const { name, description } = ctx.request.body
  const banner = await Banner.create({
    name: name,
    description: description,
  })
  console.log(banner);
  
  try {
    return resdata();
  } catch (error) {
    return errdata(error);
  }
}
exports.getBanner = async (ctx) => {
  const host = ctx.request.header.host;
  try {
    const banner = await Banner.findOne({
      where: {
        id: ctx.params.id,
      }
    })
    console.log(ctx.params.id,banner);

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
exports.test = async (ctx) => {
  const banner = await Banner.findOne({
    id: ctx.params.id,
  })
}