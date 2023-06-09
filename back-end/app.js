// Carrega as variáveis de ambiente do arquivo
// .env para a aplicação
require('dotenv').config()


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const cors = require('cors')
app.use(cors({
    origin: process.env.FRONT_ORIGIN,
    credentials: true
}))

//Conexão com Banco de Dados-------------------------------------------------

const db = require('./models')

try {
    db.sequelize.authenticate()
    console.log('SEQUELIZE: connection has been estabilished succesfully.')
}
catch(error) {
    console.error('*SEQUELIZE: unable to connect to the database: ', error)
    process.exit(1) //encerra o servidor com erro
}
//-----------------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Chama a verificação de autenticação para qualquer rota
const auth = require('./lib/auth')
app.use(auth)

/*********ROTAS**************/

const clientes = require('./routes/clientes')
app.use('/clientes', clientes)


const servicos = require('./routes/servicos')
app.use('/servicos', servicos)


const agendamentos = require('./routes/agendamentos')
app.use('/agendamentos', agendamentos)

const funcionarios = require('./routes/funcionarios')
app.use('/funcionarios', funcionarios)

module.exports = app;
