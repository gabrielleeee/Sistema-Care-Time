import React from 'react';
import { Link } from 'react-router-dom';
import background from '../pages/imagens/foto.jpg';

export default function Home() {
  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#993399', fontSize: '60px'}}>CARE TIME</h1>
    

     
      <div style={{ textAlign: 'center' }}>
        <Link to="/agendamento">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 190px', margin: '10px', borderRadius: '10px', cursor:  'pointer', fontSize: '40px' }}>Agendamentos</button>
        </Link><br></br>

        <Link to="/cliente">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 253px', margin: '10px', borderRadius: '10px', cursor:  'pointer', fontSize: '40px' }}> Clientes </button>
        </Link><br></br>

        <Link to="/servico">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 250px', margin: '10px', borderRadius: '10px', cursor:  'pointer', fontSize: '40px' }}>Serviços</button>
        </Link><br></br>

        <Link to="/funcionario">
        <button style={{ backgroundColor: '#be7abb', color: 'black', padding: '40px 212px', margin: '10px', borderRadius: '10px', cursor:  'pointer', fontSize: '40px' }}>Funcionários</button>
        </Link><br></br>
      </div>
      
    </>
  );
}
