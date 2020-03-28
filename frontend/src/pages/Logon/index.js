import React, {useState} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function Logon() {
  const [id, setID] = useState('');
  const history = useHistory();

  async function handlerRegister(e){
    //Ora, vamos prevenir o evento padrao do formulario, para nao recarregar a pagina
    e.preventDefault();
    
    try {
      const response = await api.post('sessions', { id });
      //e182f32e
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      
      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente.')
    }
    

  }
  return (
    <div className="logon-container">
        <section className="form">
           
            <img src={logoImg} alt="Be the Hero" />
            <form onSubmit={handlerRegister}>
                <h1>Faça seu Logon</h1>
                <input 
                value={id} onChange={e => setID(e.target.value)}
                placeholder="Sua ID" />
                <button type="submit" className="button">Entrar</button>
                <Link className='back-link' to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
