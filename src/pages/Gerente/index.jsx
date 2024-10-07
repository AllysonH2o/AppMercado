import React, { useState, useEffect } from 'react';
import apiGerente from '../../services/apiGerente';
import components from '../../components/components';
import './Gerente.css';

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
        <button onClick={() => setActiveSection('estoque')} className="nome button-sidebar">Gerenciar Estoque</button>
        <button onClick={() => setActiveSection('funcionarios')} className="nome button-sidebar">Cadastrar Funcionários</button>
        <button onClick={() => setActiveSection('vendas')} className="nome button-sidebar">Verificação de Vendas</button>
        <button onClick={components.logout} className='logout'>Logout</button>
      </div>
      <div className="main-content">
        {renderSection()}
      </div>
    </div>
  );
}

// Componente para gerenciar o estoque
function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEstoque = async () => {
      try {
        // Aguarda a resolução da Promise retornada por apiGerente.listarProduto()
        const response = await apiGerente.listarProduto();
        setEstoque(response);  // Define o estado com os dados obtidos
        console.log(response);
      } catch (error) {
        console.error(error);  // Exibe o erro no console
        setError(true);  // Define o erro no estado
      } finally {
        setLoading(false);  // Termina o carregamento
      }
    };
    fetchEstoque();  // Chama a função para buscar os dados do estoque
  }, []);

  return (
    <div>
      <h2>Gerenciamento de Estoque</h2>
      <table>
        <thead>
          <tr>
            <th className="nome">EAN</th>
            <th className="nome">Produto</th>
            <th className="nome">Custo</th>
            <th className="nome">Lucro</th>
            <th className="nome">Preço</th>
            <th className="nome">Estoque</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td >
                <h1>Procurando informações de produtos...</h1>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td >
                <h1>Sem produtos cadastrados</h1>
              </td>
            </tr>
          ) : (
            estoque.map((item) => (
              <tr key={item.ean}>
                <td>{item.ean}</td>
                <td>{item.descricao}</td>
                <td>{item.custo}</td>
                <td>{item.lucro}</td>
                <td>{item.preco}</td>
                <td>{item.estoque}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Componente para cadastrar novos funcionários
function CadastroFuncionarios() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [acesso, setAcesso] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchFuncionario();  // Chama a função para buscar os dados do estoque
  }, []);

  const fetchFuncionario = async () => {
    try {
      // Aguarda a resolução da Promise retornada por apiGerente.listarProduto()
      const response = await apiGerente.listarFuncionarios();
      setFuncionarios(response);  // Define o estado com os dados obtidos
      console.log(response);
    } catch (error) {
      console.error(error);  // Exibe o erro no console
      setError(true);  // Define o erro no estado
    } finally {
      setLoading(false);  // Termina o carregamento
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoFuncionario = { login, senha, cargo, acesso };
    apiGerente.novoFuncionario(novoFuncionario);
    //setFuncionarios([...funcionarios, novoFuncionario]);
    limparCampos();
    setLoading(true); 
    fetchFuncionario(); //tenho que ver como fazer para iniciar somente apos fazer o cadastro
  };

  const limparCampos = () =>{
    setLogin('');
    setCargo('');
    setSenha('');
  }

  return (
    <div>
      <h2>Cadastrar Funcionários</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <br /><br />
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <br /><br />
        <label>
          Cargo:
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </label>
        <br /><br />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Funcionários Cadastrados</h3>
      <table>
        <thead>
          <tr>
            <th className="nome">Nome</th>
            <th className="nome">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td >
                <h1>Procurando informações de funcionarios...</h1>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td >
                <h1>Sem funcionarios cadastrados</h1>
              </td>
            </tr>
          ) : (
            funcionarios.map((item) => (
              <tr key={item.idUsuario}>
                <td>{item.login}</td>
                <td>{item.cargo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
