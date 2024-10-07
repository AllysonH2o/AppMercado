import React, { useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom"
import Logar from '../../services/apiLogin';
import logo from '../../assets/logo.png'

function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui adicionar a lógica para validar o login
    //console.log('Nome de usuário:', login);
    //console.log('Senha:', senha);
    Logar(login, senha)
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nome de Usuário:</label>
            <input
              type="text"
              id="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit">Confirmar</button>
        </form>
      </div>
      <div className="logo-image">
        {/* Adicione a imagem da logo aqui */}
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Login;
