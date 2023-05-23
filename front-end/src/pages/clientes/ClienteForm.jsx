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
import Clientess from '../../models/Clientess'

export default function ClienteForm() {
    const API_PATH = '/clientes'

    const navigate = useNavigate()
  
    const [state, setState] = React.useState({
      Cliente: {}, // Objeto vazio
      showWaiting: false,
      notif: {
        show: false,
        severity: 'success',
        message: ''
      }
    })
    const {
      Cliente,
      showWaiting,
      notif
    } = state
  
    function handleFormFieldChange(event) {
      const ClienteCopy = {...Cliente}
      ClienteCopy[event.target.name] = event.target.value
      setState({...state, Cliente: ClienteCopy})
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
        await Clientess.validateAsync(Cliente)

        await myfetch.post(API_PATH, Cliente)
        // DAR FEEDBACK POSITIVO E VOLTAR PARA A LISTAGEM
        setState({
          ...state,
          showWaiting: false,
          notif: {
            show: true,
            severity: 'success',
            message: 'Novo cliente salvo com sucesso'
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
        
        <PageTitle title="Cadastrar novo cliente" />


        <form onSubmit={handleFormSubmit}>
          <TextField 
            label="Nome" 
            variant="filled"
            fullWidth
            required
            name="nome"  // Nome do campo na tabela
            value={Cliente.nome}   // Nome do campo na tabela
            onChange={handleFormFieldChange}
          />
  
          <TextField 
            label="Telefone" 
            variant="filled"
            fullWidth
            required
            name="telefone"  // Nome do campo na tabela
            value={Cliente.telefone}   // Nome do campo na tabela
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