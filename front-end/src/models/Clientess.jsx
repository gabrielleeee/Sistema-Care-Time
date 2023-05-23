import Joi from 'joi'

const Cliente = Joi.object({
    nome: Joi.string()
    .min(10)
    .max(30)
    .required()
    .error(new Error('O nome deve ser informado')),

    telefone: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O telefone deve ser informado')),
   
})

export default Cliente