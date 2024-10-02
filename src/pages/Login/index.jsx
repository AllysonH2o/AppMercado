import React, { useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui adicionar a lógica para validar o login
    console.log('Nome de usuário:', username);
    console.log('Senha:', password);
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Confirmar</button>
        </form>
      </div>
      <div className="logo-image">
        {/* Adicione a imagem da logo aqui */}
        <img src="logo.jpg" alt="logo" />
      </div>
      <div>
            <Link to="/estoque">Estoque</Link><br/>
            <Link to="/caixa">Caixa</Link>
        </div>
    </div>
  );
}

export default Login;
