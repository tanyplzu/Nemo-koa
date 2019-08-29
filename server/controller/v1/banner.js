import { resdata, errdata } from '../../utils/serve'
import { Banner } from '../../models/banner'

exports.addBanner = async (ctx) => {
  const { name, description } = ctx.request.body
  try {
    const banner = await Banner.create({
      name: name,
      description: description,
    })
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
    return resdata(banner);
  } catch (error) {
    return errdata(error);
  }
}
exports.test = async (ctx) => {
  const banner = await Banner.findOne({
    id: ctx.params.id,
  })
}