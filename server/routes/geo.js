import Router from 'koa-router'
import axios from '../utils/axios'
import Province from '../models/province' // 引入模型
import Menu from '../models/menu'
import Redis from 'koa-redis'
let router = new Router({
  prefix: '/geo'
})

const sign = "a3c9fe0782107295ee9f1709edd15218";
// 获取redis客户端

let Store = new Redis().client
router.get('/getPosition', async (ctx)=>{
  let {status, data: {province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
if(status === 200) {
  ctx.body = {
    province,
    city
  }
}
else
{
  ctx.body = {
    province: '',
    city: ''
  }
}
})

// 菜单接口
router.get('/menu', async (ctx) => {
/*   const result = await Menu.findOne()
   ctx.body = {
     menu: result.menu
   }*/
  let {status, data:{menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    }
    }else {
    ctx.body = {
      menu: []
    }
  }
})

// Province 接口
router.get('/province', async (ctx) => {
  /*let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
}*/
 let {status, data:{province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
   province: status === 200 ? province : []
  }
})
// 指定省份取城市的接口
router.get('/province/:id', async (ctx) => {
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
if (status === 200) {
  ctx.body = {
    city
  }
} else {
  ctx.body = {
    city: []
  }
}
})
// city 接口
router.get('/city', async (ctx) => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
if (status === 200) {
  ctx.body = {
    city
  }
} else {
  ctx.body = {
    city: []
  }
}
})

// 热门城市接口
router.get('/hotCity',async (ctx) => {
  let {status, data:{hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  if (status === 200){
    ctx.body = {
      hots: hots
    }
    }else {
    ctx.body = {
      hots: []
    }
  }
})

// 传入城市
router.get('/setCity', async (ctx) => {
  const city_now = ctx.query.city
  Store.set('city_now',city_now)
  Store.set('change_index',true)
  let index = await Store.get('change_index')
  ctx.body = {
    code: index
  }
})
// 获取城市
router.get('/getCity', async (ctx)=>{
  let city_now = await Store.get('city_now')
  if(!city_now){
    let {status, data: {province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if(status === 200) {
      ctx.body = {
        province,
        city
      }
    }
    else
    {
      ctx.body = {
        province: '',
        city: ''
      }
    }
  }else {
    ctx.body = {
      province: '',
      city: city_now
    }
  }
})


export default router;
