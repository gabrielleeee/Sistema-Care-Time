import React from 'react'
import myfetch from '../../utils/myfetch'
import PageTitle from '../../components/ui/PageTitle'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Notification from '../../components/ui/Notification';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export default function AgendamentoList() {
  const API_PATH = '/agendamentos'

  const [state, setState] = React.useState({
    Agendamentos: [],
    showWaiting: false,
    showDialog: false,
    deleteId: null,
    notif: {
      show: false,
      message: '',
      severity: 'success' // ou 'error'
    }
  })
  const {
    Agendamentos,
    showWaiting,
    showDialog,
    deleteId,
    notif
  } = state

  async function fetchData() {
    setState({ ...state, showWaiting: true })
    try {
      const result = await myfetch.get(API_PATH)
      setState({ 
        ...state, 
        Agendamentos: result, 
        showWaiting: false,
        showDialog: false
      })
    }
    catch(error) {
      console.log(error)
      setState({ 
        ...state, 
        showWaiting: false,
        showDialog: false
      })
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Cód.', width: 90 },
    {
      field: 'dataHora',
      headerName: 'Data e Hora',
      width: 150
    },
    {
      field: 'servico_id',
      headerName: 'Serviços',
      width: 150
    },
    {
      field: 'cliente_id',
      headerName: 'Clientes',
      width: 150
    },
    {
      field: 'funcionario_id',
      headerName: 'Funcionários',
      width: 150
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params => (
        <IconButton aria-label="Editar">
          <EditIcon />
        </IconButton>
      )
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params => (
        <IconButton 
          aria-label="excluir"
          onClick={() => setState({
            ...state,
            deleteId: params.id,  // guarda o id do item a ser excluído
            showDialog: true      // mostra o diálogo de confirmação
          })}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }
  ];

  async function handleDialogClose(answer) {
    if(answer) {
      // Fecha o diálogo de confirmação e exibe o backdrop
      setState({ ...state, showWaiting: true, showDialog: false })
      try {
        await myfetch.delete(`${API_PATH}/${deleteId}`)
        setState({
          ...state,
          showWaiting: false,   // esconde o backdrop
          showDialog: false,    // esconde o diálogo de confirmação
          snack: {              // exibe a snackbar
            show: true,
            message: 'Item excluído com sucesso',
            severity: 'success'
          }
        })
        // Recarrega os dados da listagem
        fetchData()
      }
      catch(error) {
        console.error(error)
        setState({
          ...state,
          showWaiting: false,   // esconde o backdrop
          showDialog: false,    // esconde o diálogo de confirmação
          snack: {              // exibe a snackbar
            show: true,
            message: 'ERRO: ' + error.message,
            severity: 'error'
          }
        })
      }
    }
    else {
      // Fecha o diálogo de confirmação
      setState({ ...state, showDialog: false })
    }
  }
  
  function handleNotifClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setState({ ...state, notif: { show: false } })
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ConfirmDialog 
        title="Confirmar operação"
        open={showDialog}
        onClose={handleDialogClose}
      >
        Deseja realmente excluir este item?
      </ConfirmDialog>

      <Notification 
      show={notif.show} 
      severity={notif.severity}
      onClose={handleNotifClose}
      >
        {notif.message}
      </Notification>

      <PageTitle title="Agendamentos"  />

      <Box sx={{
        display: "flex",
        justifyContent: "right",
        marginBottom: "25px"
      }}>
        <Link to="new">
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Cadastrar novo
          </Button>
        </Link>
      </Box>

      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={Agendamentos}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}