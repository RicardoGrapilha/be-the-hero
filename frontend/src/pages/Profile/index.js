import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  
  useEffect( ()=>{
    api.get('profile',{
      headers:{
        Authorization: ongId
      }
    }).then(response=>{
      setIncidents(response.data)
    })
  },[ongId]);
  /** /\
   *  
   * Se conter alguma variavel dentro do Array do useEffect,
   * toda vez que trocar o valor desta variavel, a funcao do useEffect roda novamente.
   * 
   */

  async function handlerDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incidents => incidents.id !== id));
      
    } catch (error) {
      alert('Erro ao deletar o caso.')
    }
  }
  function handlerLogout(){
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="profile-container">
        <header>
          <img src={logoImg} alt="Be the Hero" />
          <span>Bem vinda, { ongName }</span>
          <Link className='button' to="/incidents/new">
            Cadastrar novo caso
          </Link>
          <button onClick={handlerLogout} type="button">
            <FiPower size={18} color="#E02041" />
          </button>
        </header>
        <h1>Casos cadastrados</h1>
        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>

              <strong>CASO:</strong>
              <p>
                {incident.title}
              </p>

              <strong>DESCRIÇÃO:</strong>
              <p>
                {incident.description}
              </p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}
              </p>

              <button onClick={ ()=> handlerDeleteIncident(incident.id) } type='button'>
                <FiTrash2 size={20} color='#A8A8B3' />
              </button>
            </li>
          ))}
        </ul>
       
    </div>
  );
}
