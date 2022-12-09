import createHandler from '../../../lib/middleware/nextConnect'
import Joi from  'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import validate from '../../../lib/middleware/validation'

import { signupUser } from '../../../modules/user/user.service'
import { signupSchema } from '../../../modules/user/user.schema'

import { ironConfig } from '../../../lib/middleware/ironSession'

const signup = createHandler()
//função validate => estamos dizendo que vamos validar o body com as validações do postSchema
//só entra na função da requisição se todos os dados estiverem válidos
signup.post(validate({body: signupSchema}), async (req,res) => {
  try{
    console.log("Entrou requisição")
    const user = await signupUser(req.body)
    req.session.user = {
      id: user._id,
      user: user.user
    }
    await req.session.save()
    res.status(201).json({ ok: true})
  }
  catch (err){
    if(err.code === 11000) {
      return res.status(400).send({
        code: err.code,
        duplicatedKey: Object.keys(err.keyPattern)[0]
      })
    }
    console.error(err)
    throw err
  }
})

export default withIronSessionApiRoute(signup, ironConfig);