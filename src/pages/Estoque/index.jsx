// src/index.jsx
import React, { useState } from 'react';
import './index.css';

const ProdutoForm = () => {
  const [produto, setProduto] = useState({
    descricao: '',
    tipoItem: '',
    unidade: 'Peça (PC)',
    categoria: '',
    subcategoria: '',
    marca: '',
    modelo: '',
    custo: 0.00,
    vendaVarejo: 0.00,
    vendaAtacado: 0.00,
    codigoBarras: '',
    gramagem: 0,
    lucro: 0.00
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  // Função para calcular o preço de venda com base no custo e no lucro
  const calcularPrecoVenda = () => {
    const custo = parseFloat(produto.custo);
    const lucro = parseFloat(produto.lucro) / 100; // Converter porcentagem para decimal
    if (lucro >= 1) return 0; // Garantir que o lucro seja menor que 100%
    const precoVenda = custo / (1 - lucro);
    return precoVenda.toFixed(2); // Retorna o preço com duas casas decimais
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(produto);
  };

  return (
    <div className="produto-form-container">
      <div className="left-section">
        <div className="barcode-section">
          <label htmlFor="codigoBarras">Inserir código de barra</label>
          <input
            type="text"
            name="codigoBarras"
            value={produto.codigoBarras}
            onChange={handleChange}
            className="barcode-input"
          />
        </div>
        <div className="image-placeholder">
          <div className="sem-foto">SEM FOTO</div>
        </div>
      </div>

      <form className="produto-form" onSubmit={handleSubmit}>
        <div className="input-group full-width">
          <label>DESCRIÇÃO</label>
          <input
            type="text"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            className="full-width-input"
          />
        </div>

        <div className="input-group half-width">
          <label>TIPO DE ITEM</label>
          <input
            type="text"
            name="tipoItem"
            value={produto.tipoItem}
            onChange={handleChange}
            className="full-width-input"
          />
        </div>

        <div className="input-group half-width">
          <label>UNIDADE</label>
          <select
            name="unidade"
            value={produto.unidade}
            onChange={handleChange}
            className="full-width-input"
          >
            <option value="Peça (PC)">Peça (PC)</option>
            <option value="Unidade (UND)">Unidade (UND)</option>
            <option value="Pacote">Pacote</option>
            <option value="Caixa">Caixa</option>
            <option value="Conjunto">Conjunto</option>
            <option value="Quilograma (kg)">Quilograma (kg)</option>
            <option value="Grama (g)">Grama (g)</option>
            <option value="Litro (L)">Litro (L)</option>
            <option value="Mililitro (mL)">Mililitro (mL)</option>
          </select>
        </div>

        <div className="input-group half-width">
          <label>CATEGORIA</label>
          <select
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            className="full-width-input"
          >
            <option value="">Selecione</option>
          </select>
        </div>

        <div className="input-group half-width">
          <label>PESO (g ou mL)</label>
          <input
            type="number"
            name="gramagem"
            value={produto.gramagem}
            onChange={handleChange}
            className="full-width-input"
          />
        </div>

        <div className="input-group half-width">
          <label>MARCA</label>
          <select
            name="marca"
            value={produto.marca}
            onChange={handleChange}
            className="full-width-input"
          >
            <option value="">Selecione</option>
          </select>
        </div>

        <div className="input-group half-width">
          <label>NCM</label>
          <input
            type="text"
            name="ncm"
            value={produto.modelo}
            onChange={handleChange}
            className="full-width-input"
          />
        </div>

        <div className="pricing-section">
          <div className="input-group pricing">
            <label>CUSTO <span>(Última compra)</span></label>
            <input
              type="number"
              name="custo"
              value={produto.custo}
              onChange={handleChange}
              step="0.01"
              className="full-width-input"
            />
          </div>

          <div className="input-group pricing">
            <label>LUCRO (%)</label>
            <input
              type="number"
              name="lucro"
              value={produto.lucro}
              onChange={handleChange}
              step="0.01"
              className="full-width-input"
            />
          </div>

          <div className="input-group pricing">
            <label>PREÇO DE VENDA</label>
            <input
              type="text"
              name="precoVenda"
              value={`R$ ${calcularPrecoVenda()}`}
              readOnly
              className="full-width-input"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default ProdutoForm;
