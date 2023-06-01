import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import MainMenu from './MainMenu'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import ConfirmDialog from './ConfirmDialog'
import myfetch from '../../utils/myfetch'

export default function HeaderBar({ isLoggedIn, onLoginLogout }) {
  const [state, setState] = React.useState({
    showDialog: false,
    showWaiting: false
  })
  const {
    showDialog,
    showWaiting
  } = state

  const navigate = useNavigate()

  async function handleDialogClose(answer) {
    if(answer) {
      setState({ ...state, showWaiting: true, showDialog: false })
      try {
        await myfetch.post('/funcionarios/logout')
        onLoginLogout(false)
        navigate('/login')
      }
      catch(error) {
        console.error(error)
      }
      finally {
        setState({ ...state, showWaiting: false, showDialog: false })
      }
    }
    else setState({ ...state, showDialog: false })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <ConfirmDialog 
        title="Confirmar operação"
        open={showDialog}
        onClose={handleDialogClose}
      >
        Deseja realmente encerrar a sessão?
      </ConfirmDialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <AppBar position="static" style={{ backgroundColor: "#8e44ad" }}>
        <Toolbar>

          <MainMenu />
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Care Time
          </Typography>
          {
            !isLoggedIn && 
            <Button color="inherit" component={Link} to="/login">Entrar</Button>
          }
          {
            isLoggedIn && 
            <Button 
              color="inherit"
              onClick={() => setState({...state, showDialog: true})}
            >
              Sair
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}