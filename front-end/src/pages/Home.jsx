import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#993399'}}>CARE TIME</h1>
    
      <div style={{ textAlign: 'center' }}>
        <Link to="/agendamento">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 190px', margin: '10px', borderRadius: '10px', cursor:  'pointer' }}>Agendamentos</button>
        </Link><br></br>

        <Link to="/cliente">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 211px', margin: '10px', borderRadius: '10px', cursor:  'pointer' }}> Clientes </button>
        </Link><br></br>

        <Link to="/servico">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 209px', margin: '10px', borderRadius: '10px', cursor:  'pointer' }}>Serviços</button>
        </Link><br></br>

        <Link to="/funcionario">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 197px', margin: '10px', borderRadius: '10px', cursor:  'pointer' }}>Funcionários</button>
        </Link><br></br>
      </div>
    </>
  );
}
