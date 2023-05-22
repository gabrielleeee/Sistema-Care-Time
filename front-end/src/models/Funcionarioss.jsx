import Joi from 'joi'

const Funcionario = Joi.object({
    nome: Joi.string()
    .min(10)
    .max(30)
    .required()
    .error(new Error('O nome é obrigatório')),

    telefone: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O telefone é obrigatório')),

     dataNascimento: Joi.string()
     .max(100)
     .required()
     .error(new Error('A data de Nascimento é obrigatória')),

     endereco: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O endereço é obrigatório')),

     cpf: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O cpf é obrigatório')),

     salario: Joi.number()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O salário é obrigatório')),

     cargo: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O cargo é obrigatório')),

     administrador: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O campo Administrador deve ser informado')),

     usuario: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O usuário é obrigatório')),

     senha: Joi.string()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('A senha é obrigatória'))
})

export default Funcionario