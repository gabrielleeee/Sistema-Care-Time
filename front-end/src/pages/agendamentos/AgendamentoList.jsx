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

export default function AgendamentoList() {

  const [agendamentos, setAgendamentos] = React.useState([])
  const [showWaiting, setShowWaiting] = React.useState(false)

  async function fetchData() {
    setShowWaiting(true)
    try {
      const result = await myfetch.get('/agendamentos')
      setAgendamentos(result)
    
    }
    catch(error) {
      console.log(error)
    }
    finally {
        setShowWaiting(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },

    {
      field: 'dataHora',
      headerName: 'Data e Hora',
      width: 150

    },
    {
      field: 'servico_id',
      headerName: 'Serviço',
      width: 150
    },
    {
        field: 'cliente_id',
        headerName: 'Cliente',
        width: 150
    },
    {
        field: 'funcionario_id',
        headerName: 'Funcionário',
        width: 150
    },
    {
        field: 'edit',
        headerName: 'Editar',
        headerAlign: 'center',
        align: 'center',
        width: 90,
        renderCell: params => (
            <IconButton aria-lable="Editar">
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
            <IconButton aria-lable="Excluir">
                <DeleteForeverIcon color="error" />
            </IconButton>
        )
    }
    
  ];
  

  return (
    <>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PageTitle title="Agendamentos" />

      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={agendamentos}
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