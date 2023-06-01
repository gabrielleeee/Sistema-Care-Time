//importar o model ncorrespondente ao controller
const {Funcionario, Agendamento} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {}  //objeto vazio

/*
 Métodos CRUD do controller
 create: cria novo registro
 retrieve: lista(recupera) todos os registros
 retrieveOne: lista(recupera) apenas um registro
 update: atualiza um registro
 delete: exclui um registro
*/

controller.create = async (req, res) => {
    try {

        //Criptografa a senha
        req.body.senha = await bcrypt.hash(req.body.senha, 12)
        await Funcionario.create(req.body)
        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
    }
}

controller.retrieve = async(req, res) => {
    try{
        const data = await Funcionario.findAll({
            include: {model: Agendamento, as: 'agendamento'}
        }) //findAll dá um select*
        //HTTP 200: OK (implícito)
        res.send(data)
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieveOne = async(req, res) => {
    try{
        const data = await Funcionario.findByPk(req.params.id) //findAll dá um select*
        //HTTP 200: OK (implícito)
        if(data) res.send(data)

        //HTTP 404: Not Found
        else res.status(404).end()
        
    }
    catch(error){
        console.error(error)
    }
}

controller.update = async (req, res) => {
    try{

        //Se houver sido passado o compo "senha",
        //criptografa a senha
        if(req.body.senha){
            req.body.senha = await bcrypt.hash(req.body.senha, 12)
        }
        const response = await Funcionario.update(
            req.body,
            { where: {id: req.params.id }}
        )

        //response retorna um vetor. O primeiro elemento
        //dp vetor indica quantos registros foram afetados
        //pelo update
        if(response[0] > 0) {
            //HTTP 204 : No content
            res.status(204).end()
        }
        else {
            //Não encontrou o registro para atualizar
            //HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
    }
}

controller.delete = async (req, res) => {
    try{
        const response = await Funcionario.destroy(
            { where: {id: req.params.id }}
        )
        if(response) {
            //Encontrou e excluiu
            //HTTP 204: No content
            res.status(204).end()
        }
        else {
            //Não encontrou e não excluiu
            //HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
    }
}

controller.login = async(req,res) => {
    try{
        const funcionario = await Funcionario.scope('withSenha').findOne({where: {usuario: req.body.usuario}})
        //Funcionário não encontado => HTTP 401: Unauthorized
        if(!funcionario) return res.status(401).end()

        const pwMatches = await bcrypt.compare(req.body.senha, funcionario.senha)

        if(pwMatches){

            //A senha confere
            const token = jwt.sign({
                id: funcionario.id,
                nome: funcionario.nome,
                telefone: funcionario.telefone,
                dataNascimento: funcionario.dataNascimento,
                endereco: funcionario.endereco,
                cpf: funcionario.cpf,
                salario: funcionario.salario,
                cargo: funcionario.cargo,
                administrador: funcionario.administrador,
                usuario: funcionario.usuario

            },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
            )

            //Retorna o token => HTTP 200: OK 
            //res.json({ auth: true, token})

            res.cookie('AUTH', token, { 
                httpOnly: true, 
                secure: true,
                sameSite: 'None',
                path: '/',
                maxAge: 24 * 60 * 60  // 24 horas, em segundos
              })
              res.json({auth: true})
        }
        else{
            //Senha errada -> HTTP 401: Unauthorized
            res.status(401).end()
        }
    }

    catch(error){
        console.error(error)
    }
}

controller.logout = (req, res) => {
    res.clearCookie('AUTH') //Apaga o cookie
    res.json({ auth: false })
}

module.exports = controller