import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
return(
	<>
		<h1>Página de login</h1>
		<p>Ir para a <Link to="/login">página de login</Link>.</p>
	</>
    )
}