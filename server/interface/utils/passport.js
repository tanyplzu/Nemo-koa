import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function (username,password,done) {
    console.log(username,password,done);
  let where = {
    username: username
  };
  let result = await UserModel.findOne(where) // findOne()会返回符合条件的第一个文档，而find()会返回所有符合条件的对象。
  if(result != null) {
    if(result.password === password) {
      return done(null,result)
    } else {
      return done(null,false,'密码错误')
    }
  }else {
    return done(null,false,'用户不存在')
  }
}))

// 每次用户进来都自动通过session进行验证，序列化与反序列化
passport.serializeUser(function(user,down){
  down(null,user)
})

passport.deserializeUser(function(user,down){
  return down(null,user)
})

export default passport
