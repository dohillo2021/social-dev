import { hashPassword, comparePassword } from "../../utils/bcrypt"

import User from './user.model'

export const signupUser = async (body) => {

  //criando um objeto para enviar ao BD, copiando todos os dados da requisição e modificando o atributo senha 
  try {
    const user = {
      ...body,
      password: hashPassword(body.password)
    }
    const dbUser  = await User.create(user)
    return dbUser
  } catch (err) {
    console.error(err)
    throw err
  }


  console.log(user)
  
}

export const login = async (body) => {
  try {
    console.log(body)
    const user = await User.findOne({
      //verifica se existe um ou outro caso não exista nenhum dos dois retorna undefined
      $or: [
        { email: body.userOrEmail },
        { user: body.userOrEmail }
      ]
    });

    if(!user) throw new Error("not found");
    
    const passwordIsCorrect = comparePassword(body.password, user.password);

    if(!passwordIsCorrect) throw new Error("Password Incorrect");

    return user;
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}