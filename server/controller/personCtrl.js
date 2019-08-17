import { resdata, errdata } from '../utils/serve'
import Person from '../models/person'
exports.addPerson = async (ctx) => {
  const { name, age } = ctx.request.body
  if (!name || !age) {
    return errdata('请输入正确的值！', ctx);
  }
  const person = new Person({
    name: name,
    age: age,
  })
  try {
    await person.save();
    return resdata();
  } catch (error) {
    return errdata(error, ctx);
  }
}
exports.getPerson = async (ctx) => {
  try {
    const person = await Person.findOne({
      name: ctx.params.name
    })
    return resdata('', person);
  } catch (error) {
    return errdata(error);
  }
}