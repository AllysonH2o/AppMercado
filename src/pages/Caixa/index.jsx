import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  // Declaração dos estados do componente
  const [produtos, setProdutos] = useState([]); // Armazena os produtos no carrinho
  const [formasPagamento, setFormasPagamento] = useState([]); // Armazena as formas de pagamento selecionadas
  const [codigoProduto, setCodigoProduto] = useState(''); // Armazena o código do produto a ser adicionado
  const [quantidadeProduto, setQuantidadeProduto] = useState(1); // Armazena a quantidade do produto
  const [valorPago, setValorPago] = useState(0); // Armazena o valor pago pelo cliente
  const [troco, setTroco] = useState(0); // Armazena o troco a ser devolvido
  const [valorTotal, setValorTotal] = useState(0); // Armazena o valor total do carrinho

  // Efeito para atualizar o valor total sempre que a lista de produtos mudar
  useEffect(() => {
    setValorTotal(calcularValorTotal());
  }, [produtos]);

  // Função para calcular o valor total do carrinho
  const calcularValorTotal = () => {
    return produtos.reduce((total, produto) => total + (produto.quantidade * produto.valorUnitario), 0);
  };

  // Função para lidar com a mudança nas formas de pagamento
  const handleFormaPagamentoChange = (event) => {
    const formaPagamento = event.target.value;
    if (event.target.checked) {
      // Adiciona a forma de pagamento se estiver marcada
      setFormasPagamento([...formasPagamento, formaPagamento]);
    } else {
      // Remove a forma de pagamento se estiver desmarcada
      setFormasPagamento(formasPagamento.filter((item) => item !== formaPagamento));
    }
  };

  // Função para atualizar o código do produto
  const handleCodigoProdutoChange = (event) => {
    setCodigoProduto(event.target.value);
  };

  // Função para atualizar a quantidade do produto
  const handleQuantidadeProdutoChange = (event) => {
    setQuantidadeProduto(Math.max(1, parseInt(event.target.value, 10) || 1));
  };

  // Função para adicionar um produto quando a tecla Enter é pressionada
  const handleCodigoProdutoKeyDown = (event) => {
    if (event.key === 'Enter') {
      adicionarProduto(codigoProduto, quantidadeProduto);
      // Limpa os campos após adicionar o produto
      setCodigoProduto('');
      setQuantidadeProduto(1);
    }
  };

  // Função para adicionar um produto ao carrinho
  const adicionarProduto = (codigo, quantidade) => {
    const produtoExistente = produtos.find(p => p.codigo === codigo); // Verifica se o produto já existe
    if (produtoExistente) {
      // Se existir, atualiza a quantidade
      setProdutos(produtos.map(p =>
        p.codigo === codigo ? { ...p, quantidade: p.quantidade + quantidade } : p
      ));
    } else {
      // Se não existir, cria um novo produto
      const novoProduto = {
        codigo: codigo,
        descricao: `Produto ${codigo}`,
        quantidade: quantidade,
        valorUnitario: 10.00 // Define um valor fixo para o produto
      };
      setProdutos([...produtos, novoProduto]); // Adiciona o novo produto ao carrinho
    }
  };

  // Função para remover um produto do carrinho
  const removerProduto = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index)); // Filtra o produto a ser removido
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
        return { ...produto, quantidade: Math.max(produto.quantidade - 1, 1) }; // Decrementa a quantidade, garantindo que seja pelo menos 1
      }
      return produto;
    }));
  };

  // Função para confirmar o pagamento
  const confirmarPagamento = () => {
    if (valorPago >= valorTotal) {
      // Se o valor pago é suficiente
      const novoTroco = (valorPago - valorTotal).toFixed(2); // Calcula o troco
      setTroco(novoTroco); // Atualiza o estado do troco
      alert(`Pagamento confirmado! Troco: R$ ${novoTroco}`); // Notifica o usuário
      setProdutos([]); // Limpa o carrinho
      setValorPago(0); // Reseta o valor pago
      setValorTotal(0); // Reseta o valor total
    } else {
      // Se o valor não é suficiente
      alert(`O valor não é suficiente. Total: R$ ${valorTotal.toFixed(2)}`); // Notifica o usuário
    }
  };

  // Função para finalizar a compra e zerar o troco
  const finalizarCompra = () => {
    setTroco(0); // Zera o troco
    setFormasPagamento([]); // Limpa as formas de pagamento
    // Aqui você pode adicionar outras lógicas para finalizar a compra, se necessário
  };

  return (
    <div className="container">
      <div className="carrinho"> 
        <div className="add-produto" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flex: '1 1 25%', display: 'flex', alignItems: 'center',marginLeft: '20px' }}>
            <p className="s-quantidade" style={{ margin: '10px' }}>Selecione a quantidade:</p>
            <button className="a-diminuir" onClick={() => setQuantidadeProduto(Math.max(1, quantidadeProduto - 1))}>-</button>
            <input 
              type="number"
              placeholder="Quantidade"
              className="a-quant"
              value={quantidadeProduto}
              onChange={handleQuantidadeProdutoChange}
              style={{ width: '60px', textAlign: 'center', margin: '0' }}
            />
            <button className="a-aumentar" onClick={() => setQuantidadeProduto(quantidadeProduto + 1)}>+</button>
          </div>

          <div style={{ flex: '1 1 75%', display: 'flex', alignItems: 'center', marginLeft: '200px' }}>
            <p className="s-quantidade" style={{ margin: '0' }}>Adicione um item no carrinho:</p>
            <input
              placeholder="Código do produto"
              type="text"
              value={codigoProduto}
              onChange={handleCodigoProdutoChange}
              onKeyDown={handleCodigoProdutoKeyDown}
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
                    <button className="remover" onClick={() => removerProduto(index)}>X</button>
                  </li>
                  <hr />
                </React.Fragment>
              ))}
            </ul>
            <span className="valort">Valor Total: R$ <span id="valorTotal">{valorTotal.toFixed(2)}</span></span>
            <span className="valort">Troco: R$ <span id="troco">{troco}</span></span>
          </div>
        </div>
      </div>
      <div className="o-pagamento">
        <h2>Pagamento</h2>
        <div className="forma-pagamento">
  <input
    type="checkbox"
    id="cartao"
    name="pagamento"
    value="cartao"
    checked={formasPagamento.includes("cartao")}
    onChange={handleFormaPagamentoChange}
    disabled={produtos.length === 0}
  />
  <label htmlFor="cartao">Cartão de Crédito</label>
</div>
<div className="forma-pagamento">
  <input
    type="checkbox"
    id="boleto"
    name="pagamento"
    value="boleto"
    checked={formasPagamento.includes("boleto")}
    onChange={handleFormaPagamentoChange}
    disabled={produtos.length === 0}
  />
  <label htmlFor="boleto">Boleto Bancário</label>
</div>
<div className="forma-pagamento">
  <input
    type="checkbox"
    id="pix"
    name="pagamento"
    value="pix"
    checked={formasPagamento.includes("pix")}
    onChange={handleFormaPagamentoChange}
    disabled={produtos.length === 0}
  />
  <label htmlFor="pix">Pix</label>
</div>
<div>
  <p>Formas selecionadas: {formasPagamento.join(', ')}</p>
</div>
        <input
        type="number"
        id="valorPago"
        placeholder="Valor a ser pago"
        value={valorPago}
        onChange={(e) => setValorPago(Math.max(0, parseFloat(e.target.value) || 0))}
        disabled={formasPagamento.length === 0} 
        />
        <button className="pagamento-button" onClick={confirmarPagamento}>Confirmar Pagamento</button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <button className="c-pagamento" >Cancelar</button>
    <button className="f-compra" onClick={finalizarCompra}>Finalizar</button>
  </div>
      </div>
    </div>
  );
}

export default App;
