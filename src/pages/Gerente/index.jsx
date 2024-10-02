import React, { useState } from 'react';
import './Gerete.css';

function App() {
  const [activeSection, setActiveSection] = useState('estoque'); // Estado para alternar entre as seções

  const renderSection = () => {
    switch (activeSection) {
      case 'estoque':
        return <Estoque />;
      case 'funcionarios':
        return <CadastroFuncionarios />;
      case 'vendas':
        return <Vendas />;
      default:
        return <Estoque />;
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <button onClick={() => setActiveSection('estoque')} className="nome">Gerenciar Estoque</button>
        <button onClick={() => setActiveSection('funcionarios')} className="nome">Cadastrar Funcionários</button>
        <button onClick={() => setActiveSection('vendas')} className="nome">Verificação de Vendas</button>
      </div>
      <div className="main-content">
        {renderSection()}
      </div>
    </div>
  );
}

// Componente para gerenciar o estoque
function Estoque() {
  const [estoque, setEstoque] = useState([
    { id: 1, produto: 'Arroz', quantidade: 100 },
    { id: 2, produto: 'Feijão', quantidade: 50 },
    { id: 3, produto: 'Açúcar', quantidade: 30 },
  ]);

  return (
    <div>
      <h2>Gerenciamento de Estoque</h2>
      <table>
        <thead>
          <tr>
            <th className="nome">ID </th>
            <th className="nome">Produto</th>
            <th className="nome"> Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.produto}</td>
              <td>{item.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Componente para cadastrar novos funcionários
function CadastroFuncionarios() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoFuncionario = { nome, cargo };
    setFuncionarios([...funcionarios, novoFuncionario]);
    setNome('');
    setCargo('');
  };

  return (
    <div>
      <h2>Cadastrar Funcionários</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cargo:
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Funcionários Cadastrados</h3>
      <ul>
        {funcionarios.map((func, index) => (
          <li key={index}>
            {func.nome} - {func.cargo}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente para verificar vendas
function Vendas() {
  const [vendas, setVendas] = useState([
    { id: 1, produto: 'Arroz', quantidade: 10, total: 50 },
    { id: 2, produto: 'Feijão', quantidade: 5, total: 25 },
    { id: 3, produto: 'Açúcar', quantidade: 2, total: 10 },
  ]);

  return (
    <div>
      <h2>Verificação de Vendas</h2>
      <table>
        <thead>
          <tr>
            <th className="nome">ID</th>
            <th className="nome">Produto</th>
            <th className="nome">Quantidade Vendida</th>
            <th className="nome">Total</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.produto}</td>
              <td>{item.quantidade}</td>
              <td>R$ {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
