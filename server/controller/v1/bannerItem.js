import { resdata, errdata } from '../../utils/serve'
import { BannerItem } from '../../models/banner'

exports.addBannerItem = async (ctx) => {
  const { type, img_id, key_word, banner_id } = ctx.request.body
  try {
    const banner = await BannerItem.create({
      type,
      key_word,
      img_id,
      banner_id
    })
    return resdata();
  } catch (error) {
    return errdata(error);
  }
}