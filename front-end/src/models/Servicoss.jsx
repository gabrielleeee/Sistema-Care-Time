import Joi from 'joi'

const Servico = Joi.object({
    servico: Joi.string()
    .min(10)
    .max(30)
    .required()
    .error(new Error('O serviço deve ser informado')),

    preco: Joi.number()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O preço deve ser informado')),
   
})

export default Servico