import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import AgendamentoList from './pages/agendamentos/AgendamentoList'
import AgendamentoForm from './pages/agendamentos/AgendamentoForm'
import FuncionarioList from './pages/funcionarios/FuncionarioList'
import FuncionarioForm from './pages/funcionarios/FuncionarioForm'
import ServicoList from './pages/servicos/ServicoList'
import ServicoForm from './pages/servicos/ServicoForm'
import ClienteList from './pages/clientes/ClienteList'
import ClienteForm from './pages/clientes/ClienteForm'

function AuthGuard({children}) {
  // Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App(){
return(
	<div className= "App">
		<BrowserRouter>
      <HeaderBar/>
        <Box sx={{ m: '25px auto' , p: '16px'}}>
          <Routes>
            <Route path="/" element={ <AuthGuard> <Home/> </AuthGuard>} />
            <Route path="/login" element={<Login />}/>
            <Route path="/agendamento" element={<AuthGuard> <AgendamentoList/> </AuthGuard>} />
            <Route path="/agendamento/new" element={ <AuthGuard> <AgendamentoForm /> </AuthGuard>} />
            <Route path="/agendamento/:id" element={ <AuthGuard> <AgendamentoForm /> </AuthGuard>} />
            <Route path="/funcionario" element={<AuthGuard> <FuncionarioList/> </AuthGuard>} />
            <Route path="/funcionario/new" element={ <AuthGuard> <FuncionarioForm /> </AuthGuard>} />
            <Route path="/funcionario/:id" element={ <AuthGuard> <FuncionarioForm /> </AuthGuard>} />
            <Route path="/servico" element={<AuthGuard> <ServicoList/> </AuthGuard>} />
            <Route path="/servico/new" element={ <AuthGuard> <ServicoForm /> </AuthGuard>} />
            <Route path="/servico/:id" element={ <AuthGuard> <ServicoForm /> </AuthGuard>} />
            <Route path="/cliente" element={<AuthGuard> <ClienteList/> </AuthGuard>} />
            <Route path="/cliente/new" element={ <AuthGuard> <ClienteForm /> </AuthGuard>} />
            <Route path="/cliente/:id" element={ <AuthGuard> <ClienteForm /> </AuthGuard>} />
          </Routes>
        </Box>

		</BrowserRouter>
	</div>
)
}

export default App