import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App(){
return(
	<div className= "App">
		<BrowserRouter>
			<Routes>
        <Route path="/" element={ <AuthGuard> <Home/> </AuthGuard>} />
        <Route path="/login" element={<Login />}/>
			</Routes>
		</BrowserRouter>
	</div>
)
}

export default App