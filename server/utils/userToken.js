import axios from 'axios'
import jwt from 'jsonwebtoken'
import wx from '../../config/wxConfig'

exports.getToken = async (code) => {
  const session = await axios.get(wx.wx_login_url, {
    params: {
      appid: wx.app_id,
      secret: wx.app_secret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  })
  let token = jwt.sign({
    open_id: session.data.openid,
    time: new Date().getTime(),
    timeout: 1000 * 60 * 60 * 2
  }, '123456')
  console.log(token);
};