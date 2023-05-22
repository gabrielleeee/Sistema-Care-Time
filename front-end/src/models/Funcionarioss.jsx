import Joi from 'joi'

const Funcionario = Joi.object({
    nome: Joi.string()
    .min(10)
    .max(30)
    .required()
    .error(new Error('O nome é obrigatório ')),

    telefone: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O serviço deve ser informado')),

     dataNascimento: Joi.date()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O cliente deve ser informado')),

     endereco: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado')),

     cpf: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado')),

     salario: Joi.number()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado')),

     cargo: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado')),

     administrador: Joi.boolean()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado')),

     usuario: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado')),

     senha: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado'))
})

export default Funcionario