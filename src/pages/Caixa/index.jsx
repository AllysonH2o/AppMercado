import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  // Declaração dos estados do componente
  const [produtos, setProdutos] = useState([]); // Armazena os produtos no carrinho
  const [formasPagamento, setFormasPagamento] = useState([]);  // Armazena as formas de pagamento selecionadas
  const [codigoProduto, setCodigoProduto] = useState(''); // Armazena o código do produto a ser adicionado
  const [quantidadeProduto, setQuantidadeProduto] = useState(1);  // Armazena a quantidade do produto
  const [valoresPagos, setValoresPagos] = useState({}); // Armazena o valor pago pelo cliente
  const [troco, setTroco] = useState(0); // Armazena o troco a ser devolvido
  const [valorTotal, setValorTotal] = useState(0); // Armazena o valor total do carrinho
  const [valorPagoTotal, setValorPagoTotal] = useState(0); // Armazena o valor total pago
  const [isValorTotalPago, setIsValorTotalPago] = useState(false); // Armazena o valor total que foi pago
  const [showModalCancelar, setShowModalCancelar] = useState(false); // Estado para o modal de cancelamento
  const [showModal, setShowModal] = useState(false); // Estado para o modal de finalizar


  useEffect(() => {
    setValorTotal(calcularValorTotal());
  }, [produtos]);
  useEffect(() => {
    if (produtos.length === 0) {
      // Limpa as formas de pagamento e os valores pagos se a lista de produtos estiver vazia
      setFormasPagamento([]);
      setValoresPagos({});
    }
  }, [produtos]);

  useEffect(() => {
    // Atualiza o valor pago total sempre que os valores pagos forem alterados
    const totalPago = Object.values(valoresPagos).reduce(
      (acc, valor) => acc + parseFloat(valor || 0),
      0
    );
    setValorPagoTotal(totalPago);
  }, [valoresPagos]);
   // Função para calcular o valor total do carrinho
  const calcularValorTotal = () => {
    return produtos.reduce((total, produto) => total + (produto.quantidade * produto.valorUnitario), 0);
  };
  //formatação do campos de formas de pagamento
  const handleValorPagoChange = (formaPagamento, event) => {
    const valor = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const valorEmCentavos = (Number(valor) / 100).toFixed(2); // Converte para valor com 2 casas decimais
    setValoresPagos((prevState) => ({
      ...prevState,
      [formaPagamento]: valorEmCentavos, // Atualiza o valor pago por cada forma de pagamento
    }));
  };
  // Função que lida com a mudança na forma de pagamento 
  const handleFormaPagamentoChange = (event) => {
    const formaPagamento = event.target.value;
    if (event.target.checked) {
      // Se o checkbox estiver marcado, adiciona a forma de pagamento à lista
      setFormasPagamento([...formasPagamento, formaPagamento]);
    } else {
      // Se o checkbox estiver desmarcado, remove a forma de pagamento da lista
      setFormasPagamento(formasPagamento.filter((item) => item !== formaPagamento));
      
      // Atualiza os valores pagos, removendo a forma de pagamento correspondente
      setValoresPagos((prevState) => {
        const updated = { ...prevState };
        delete updated[formaPagamento]; // Remove o valor pago relacionado à forma de pagamento desmarcada
        return updated;
      });
    }
  };

  // Função que lida com a mudança no código do produto 
  const handleCodigoProdutoChange = (event) => {
    setCodigoProduto(event.target.value); // Atualiza o estado com o valor digitado no campo de código do produto
  };

  // Função para lidar com a mudança na quantidade, permitindo apenas números
  const handleQuantidadeProdutoChange = (event) => {
    const valor = event.target.value;
    
    // Verifica se o valor contém apenas números e é maior ou igual a 1
    if (/^\d*$/.test(valor)) {  // Apenas números
      setQuantidadeProduto(valor === '' ? '' : Math.max(1, parseInt(valor, 10))); // Garante que o valor seja >= 1
    }
  };
  // Função para adicionar um produto quando a tecla Enter é pressionada
  const handleCodigoProdutoKeyDown = (event) => {
    if (event.key === 'Enter') {
      adicionarProduto(codigoProduto, quantidadeProduto);
      setCodigoProduto('');
      setQuantidadeProduto(1);
    }
  };
  // Função para adicionar um produto ao carrinho
  const adicionarProduto = (codigo, quantidade) => {
    const produtoExistente = produtos.find(p => p.codigo === codigo);
    if (quantidade < 1) {
      alert("A quantidade deve ser pelo menos 1.");
      return; // Não será adiconado item no carrinho
    }
    if (produtoExistente) {
      setProdutos(produtos.map(p =>
        p.codigo === codigo ? { ...p, quantidade: p.quantidade + quantidade } : p
      ));
    } else {
      const novoProduto = {
        codigo: codigo,
        descricao: `Produto ${codigo}`,
        quantidade: quantidade,
        valorUnitario: 10.00 // Valor fixo para o produto
      };
      setProdutos([...produtos, novoProduto]); // Adiciona o novo produto ao carrinho
    }
  };
  // Função para remover um produto do carrinho
  const removerProduto = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };
  // Função para aumentar a quantidade de um produto
  const aumentarQuantidade = (index) => {
    setProdutos(produtos.map((produto, i) => {
      if (i === index) {
        return { ...produto, quantidade: produto.quantidade + 1 }; // Incrementa a quantidade
      }
      return produto;
    }));
  };
  // Função para diminuir a quantidade de um produto
  const diminuirQuantidade = (index) => {
    setProdutos(produtos.map((produto, i) => {
      if (i === index) {
        return { ...produto, quantidade: Math.max(produto.quantidade - 1, 1) };// Decrementa a quantidade, garantindo que seja pelo menos 1
      }
      return produto;
    }));
  };
  // Função para confirmar o pagamento
  const confirmarPagamento = () => {
    if (valorPagoTotal >= valorTotal)  {
      // Se o valor pago é suficiente
      const novoTroco = (valorPagoTotal - valorTotal).toFixed(2); // Calcula o troco
      setTroco(novoTroco); // Atualiza o estado do troco
      alert(`Pagamento confirmado! Troco: R$ ${novoTroco}`); // Notifica o usuário
      
      // Zera a exibição do valor total (sem alterar os produtos)
      setIsValorTotalPago(true);
  
      setValoresPagos({}); // Reseta o valor pago
      setFormasPagamento([]); // Reseta o valor total
    } else {
      // Se o valor não é suficiente
      alert(`O valor pago não é suficiente. Total: R$ ${valorTotal.toFixed(2)}`);  // Notifica o usuário
    }
    //(valorTotal === 0 && produtos.length === 0)
  };
  //Função do modal cancelar
  const handleCancelarClick = () => {
    setShowModalCancelar(true); // Abre o modal ao clicar em "Cancelar"
  };
  const confirmarCancelar = () => {
    setProdutos([]); // Limpa todos os itens da lista
    setShowModalCancelar(false); 
  };
  const cancelarModalCancelar = () => {
    setShowModalCancelar(false); // Fecha o modal sem fazer nada
  };
  //Fução do modal finalizar
  const handleFinalizarClick = () => {
    // Se o valor total for zero e não houver produtos, exibe alerta
    if (produtos.length === 0 && valorTotal === 0) {
      alert("Ainda não foram adicionados itens no carrinho."); // Se não houver produtos e o valor total for zero
    } else if ( valorTotal === 0) {
      alert("Ainda não foi feita a compra."); // Se o valor total for maior que zero
    } else {
      setShowModal(true); // Abre o modal de confirmação se o valor total for igual a zero
    }
};
  
  
  const confirmarCompra = () => {
    setProdutos([]); // Limpa todos os itens da lista
    setTroco(0); // Zera o troco
    setValorPagoTotal(0); // Zera o valor total pago
    setValoresPagos({}); // Limpa os valores pagos por cada forma de pagamento
    setFormasPagamento([]); // Limpa as formas de pagamento
    setIsValorTotalPago(false); // Reseta o estado que controla a exibição do valor total
    setShowModal(false); // Fecha o modal
  };
  
  const cancelarCompraModal = () => {
    setShowModal(false); // Fecha o modal sem fazer nada
  };
  

  return (
    <div className="container">
      <div className="carrinho"> 
        <div className="add-produto" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flex: '1 1 25%', display: 'flex', alignItems: 'center',marginLeft: '20px' }}>
            <p className="s-quantidade" style={{ margin: '10px' }}>Selecione a quantidade:</p>
            <button className="a-diminuir" onClick={() => setQuantidadeProduto(Math.max(1, quantidadeProduto - 1))} disabled={isValorTotalPago || valorTotal === 0 && produtos.length > 0}>-</button>
            <input 
              type="text"
              placeholder="Quantidade"
              className="a-quant"
              value={quantidadeProduto}
              onChange={handleQuantidadeProdutoChange}
              style={{ width: '60px', textAlign: 'center', margin: '0' }}
              disabled={isValorTotalPago || valorTotal === 0 && produtos.length > 0}
            />
            <button className="a-aumentar" onClick={() => setQuantidadeProduto(prev => Number(prev) + 1)} disabled={isValorTotalPago || valorTotal === 0 && produtos.length > 0}>+</button>
          </div>

          <div style={{ flex: '1 1 75%', display: 'flex', alignItems: 'center', marginLeft: '200px' }}>
            <p className="s-quantidade" style={{ margin: '0' }}>Codigo de Barra:</p>
            <input
              placeholder="Código"
              type="text"
              value={codigoProduto}
              onChange={handleCodigoProdutoChange}
              onKeyDown={handleCodigoProdutoKeyDown}
              disabled={isValorTotalPago || valorTotal === 0 && produtos.length > 0}
            />
          </div>
        </div>
        <div className="carrinho-table">
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="o-quant">Quantidade</span>
            <span className="o-descr">Item/Descrição</span>
            <span className="o-unit">Valor Unitário</span>
            <span className="o-total">Valor Total</span>
            <span></span>
          </li>
          <div className="carrinho-table">
            <ul className="scroll-container">
              {produtos.map((produto, index) => (
                <React.Fragment key={index}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="diminuir" onClick={() => diminuirQuantidade(index)}>-</button>
                    <input
                      type="number"
                      className="quant"
                      value={produto.quantidade}
                      onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                      style={{ width: '50px', textAlign: 'center' }}
                    />
                    <button className="aumentar" onClick={() => aumentarQuantidade(index)}>+</button>
                    <span className="descr">{produto.descricao}</span>
                    <span className="unit">R$ {produto.valorUnitario.toFixed(2)}</span>
                    <span className="total">R$ {(produto.quantidade * produto.valorUnitario).toFixed(2)}</span>
                    <button className="remover" onClick={() => removerProduto(index)} disabled={isValorTotalPago || valorTotal === 0}>X</button>
                  </li>
                  <hr />
                </React.Fragment>
              ))}
            </ul>
            <span className="valort">Valor Total: R$ <span id="valorTotal">{isValorTotalPago ? "0.00" : valorTotal.toFixed(2)}</span></span>
            <span className="valort">Troco: R$ <span id="troco">{troco}</span></span>
          </div>
        </div>
      </div>
      <div className="o-pagamento">
        <p>Selecione a forma de pagamento</p>

        {["Cartão", "Dinheiro", "Pix"].map((forma) => (
          <div key={forma} className="forma-pagamento" >
            <input
              type="checkbox"
              id={forma}
              name="pagamento"
              value={forma}
              checked={formasPagamento.includes(forma)}
              onChange={handleFormaPagamentoChange}
              disabled={produtos.length === 0 || isValorTotalPago || valorTotal === 0}
            />
            <label htmlFor={forma}>{forma}</label>
          </div>
        ))}
        <hr />
        {formasPagamento.map((forma) => (
          <div key={forma} className="forma-valor" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <label className="forma-v" htmlFor={`valorPago-${forma}`}>{forma}:</label>
            <input
              type="text"
              id={`valorPago-${forma}`}
              placeholder={`Valor pago em ${forma}`}
              value={valoresPagos[forma] || ''}
              onChange={(e) => handleValorPagoChange(forma, e)}
            />
          </div>
        ))}
        <hr />
        <button className="pagamento-button" onClick={confirmarPagamento} disabled={isValorTotalPago || valorTotal === 0}>
          Confirmar Pagamento
        </button>

        <div >
    <button className="c-compra" onClick={handleCancelarClick} disabled={isValorTotalPago || valorTotal === 0}>Cancelar</button>
    <button className="f-compra" onClick={handleFinalizarClick}>Finalizar</button>
  </div>
  {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2 className='c-c'>Confirmação</h2>
      <p className='c-c'>Tem certeza que deseja finalizar a compra?</p>
      <div className="modal-buttons">
        <button onClick={cancelarCompraModal} className="modal-cancelar">Cancelar</button>
        <button onClick={confirmarCompra}  disabled={!isValorTotalPago}
         className="modal-confirmar">Confirmar</button>
      </div>
    </div>
  </div>
)}
{showModalCancelar && (
  <div className="modal-overlay">
    <div className="modal">
      <h2 className='c-c'>Atenção</h2>
      <p className='c-c'>Tem certeza que deseja limpar a lista?</p>
      <div className="modal-buttons">
        <button onClick={cancelarModalCancelar} className="modal-cancelar">Cancelar</button>
        <button onClick={confirmarCancelar} className="modal-confirmar">Confirmar</button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default App;
