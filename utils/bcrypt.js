import bcryptjs from "bcryptjs";

//biblioteca que criptografa uma infirmação e não retorna mais ao valor original, apenas compara como o valor digitado pelo user

export const hashPassword = (password) =>
  bcryptjs.hashSync(password) //retorna o hash

export const comparePassword = (password, hash) => 
  bcryptjs.compareSync(password,hash) //retorna true ou false de acordo com a comparação