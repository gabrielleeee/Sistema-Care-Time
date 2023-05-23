import Joi from 'joi'

const Agendamento = Joi.object({
    dataHora: Joi.string()
    .min(10)
    .max(30)
    .required()
    .error(new Error('A data e a hora são obrigatórias ')),

    servico_id: Joi.number()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O serviço deve ser informado')),

     cliente_id: Joi.number()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O cliente deve ser informado')),

     funcionario_id: Joi.number()
     .min(0)  //não aceita negativo
     .max(100)
     .required()
     .error(new Error('O funcionário deve ser informado'))
   
})
.options({allowUnknown: true})
export default Agendamento