import Joi, { allow } from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().required().max(50).message('Máximo de {{#limit}} caracteres'),
  lastName: Joi.string().required().max(50).message('Máximo de {{#limit}} caracteres'),
  user: Joi.string().required().max(30).message('Máximo de {{#limit}} caracteres'),
  email: Joi.string().email({tlds: { allow: false }}).required().max(100).message('Máximo de {{#limit}} caracteres'),
  password: Joi.string().required().max(50).min(6).message('Máximo de {{#limit}} caracteres'),
})

export const loginSchema = Joi.object({
  userOrEmail: Joi.string().required(),
  password: Joi.string().required().max(50).min(6).message('Máximo de {{#limit}} caracteres')
})