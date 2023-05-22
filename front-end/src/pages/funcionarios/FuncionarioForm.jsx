import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import Funcionarioss from '../../models/Funcionarioss'

export default function FuncionarioForm() {
    const API_PATH = '/funcionarios'

    const navigate = useNavigate()
  
    const [state, setState] = React.useState({
      Funcionario: {}, // Objeto vazio
      showWaiting: false,
      notif: {
        show: false,
        severity: 'success',
        message: ''
      }
    })
    const {
      Funcionario,
      showWaiting,
      notif
    } = state
  
    function handleFormFieldChange(event) {
      const FuncionarioCopy = {...Funcionario}
      FuncionarioCopy[event.target.name] = event.target.value
      setState({...state, Funcionario: FuncionarioCopy})
    }
  
    function handleFormSubmit(event) {
      event.preventDefault()    // Evita que a página seja recarregada
  
      // Envia os dados para o back-end
      sendData()
    }
  
    async function sendData() {
      setState({...state, showWaiting: true})
      try {
        //Chama a validação da biblioteca Joi
        await Funcionarioss.validateAsync(Funcionario)

        await myfetch.post(API_PATH, Funcionario)
        // DAR FEEDBACK POSITIVO E VOLTAR PARA A LISTAGEM
        setState({
          ...state,
          showWaiting: false,
          notif: {
            show: true,
            severity: 'success',
            message: 'Novo funcionário salvo com sucesso'
          }
        })
      }
      catch(error) {
        console.error(error)
        // DAR FEEDBACK NEGATIVO
        setState({
          ...state,
          showWaiting: false,
          notif: {
            severity: 'error',
            show: true,
            message: 'ERRO: ' + error.message
          }
        })
      }
    }

    function handleNotifClose(event, reason) {
      if (reason === 'clickaway') {
        return;
      }
      //se o item for salvo com sucesso, retorna à página de listagem
      if(notif.severity === 'success') navigate(-1)


      setState({ ...state, notif: { ...notif, show: false } })
    };
  
    return (
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showWaiting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Notification 
          show={notif.show} 
          severity={notif.severity}
          onClose={handleNotifClose}
        >
          {notif.message}
      </Notification>
        
        <PageTitle title="Cadastrar novo funcionário" />


        <form onSubmit={handleFormSubmit}>
          <TextField 
            label="Nome" 
            variant="filled"
            fullWidth
            required
            name="nome"  // Nome do campo na tabela
            value={Funcionario.nome}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />
  
          <TextField 
            label="Telefone" 
            variant="filled"
            fullWidth
            required
            name="telefone"  // Nome do campo na tabela
            value={Funcionario.telefone}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />

          <TextField 
            label="data de nascimento" 
            variant="filled"
            type="date"
            fullWidth
            required
            name="dataNascimento"  // Nome do campo na tabela
            value={Funcionario.dataNascimento}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />
    
          <TextField 
            label="Endereço" 
            variant="filled"
            fullWidth
            required
            name="endereco"  // Nome do campo na tabela
            value={Funcionario.endereco}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />

            <TextField 
            label="Cpf" 
            variant="filled"
            type="number"
            fullWidth
            required
            name="cpf"  // Nome do campo na tabela
            value={Funcionario.cpf}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />
          
          <TextField 
            label="Salário" 
            variant="filled"
            fullWidth
            required
            name="salario"  // Nome do campo na tabela
            value={Funcionario.salario}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />

            <TextField 
            label="Cargo" 
            variant="filled"
            fullWidth
            required
            name="cargo"  // Nome do campo na tabela
            value={Funcionario.cargo}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />

            <TextField 
            label="Administrador" 
            variant="filled"
            type="boolean"
            fullWidth
            required
            name="administrador"  // Nome do campo na tabela
            value={Funcionario.administrador}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />

            <TextField 
            label="Usuário" 
            variant="filled"
            fullWidth
            required
            name="usuario"  // Nome do campo na tabela
            value={Funcionario.usuario}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />


            <TextField 
            label="Senha" 
            variant="filled"
            fullWidth
            required
            name="senha"  // Nome do campo na tabela
            value={Funcionario.senha}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />


          <Fab 
            variant="extended" 
            color="secondary"
            type="submit"
          >
            <SendIcon sx={{ mr: 1 }} />
            Enviar
          </Fab>
  
        </form>
      </>
    )
  }