import { resdata, errdata } from '../utils/serve'
import Product from '../models/product'

exports.addProduct = async (ctx) => {
  const { name, price, stock, main_img_url } = ctx.request.body
  if (!name || !price || !stock || !main_img_url) {
    return errdata('参数错误！');
  }
  const product = new Product({
    name: name,
    price: price,
    stock: stock,
    main_img_url: main_img_url,
  })
  try {
    await product.save();
    return resdata();
  } catch (error) {
    return errdata(error);
  }
}
exports.recent = async (ctx) => {
  const host = ctx.request.header.host;
  try {
    const product = await Product.find();
    let products = []
    if (product) {
      products = product.map(item => {
        return {
          name: item.name,
          price: item.price,
          stock: item.stock,
          main_img_url: 'http://' + host + '/images/' + item.main_img_url
        }
      });
    }
    return products;
  } catch (error) {
    return errdata(error);
  }
}
exports.by_category = async (ctx) => {
  const host = ctx.request.header.host;
  try {
    const product = await Product.find();
    let products = []
    if (product) {
      products = product.map(item => {
        return {
          name: item.name,
          price: item.price,
          stock: item.stock,
          main_img_url: 'http://' + host + '/images/' + item.main_img_url
        }
      });
    }
    return products;
  } catch (error) {
    return errdata(error);
  }
}