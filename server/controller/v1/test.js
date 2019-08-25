import { User } from '../../models/test'
console.log(22,User);

exports.test = async (ctx) => {
  const user = await User.findOne({
    username: 'janedoe',
  })
  console.log(user);
  
}