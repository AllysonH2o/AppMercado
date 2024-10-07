// src/index.jsx
import React, { useState, useEffect  } from 'react';
import apiProduto from '../../services/apiProduto';
import './produto.css';

const ProdutoForm = () => {
  const [produto, setProduto] = useState({
    ean: '',
    descricao: '',
    tipoProduto: '',
    unidade: 'Peça (PC)',
    gramagem: 0,
    categoria: '',
    //subcategoria: '',
    marca: '',
    //modelo: '',
    custo: 0.00,
    //vendaVarejo: 0.00,
    //vendaAtacado: 0.00,
    lucro: 0.00,
    preco: 0,
    estoque: 100
  });

  const [custoSugerido, setCustoSugerido] = useState({ custo: 0, precoSugerido: 0 });
  const [percentualLucro, setPercentualLucro] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const valorConvertido =
        name === 'custo' || name === 'lucro' || name === 'preco'
            ? parseFloat(value) || 0
            : value;

    //console.log(`Campo: ${name}, Valor: ${valorConvertido}, Tipo: ${typeof valorConvertido}`); // Verifique o tipo aqui

    setProduto((prevState) => ({
        ...prevState,
        [name]: valorConvertido,
    }));
};

  const validarFormulario = () => {
    let formErrors = {};
    // Validação do código de barras (apenas números e 13 dígitos)
    if (!/^\d{13}$/.test(produto.ean)) {
      formErrors.ean = 'O código de barras deve conter 13 dígitos numéricos.';
    }
    // Validação da descrição (mínimo 3 e máximo 20 caracteres)
    if (!/^.{3,20}$/.test(produto.descricao)) {
      formErrors.descricao = 'A descrição deve conter de 3 a 20 caracteres.';
    }
    // Validação do tipo de item (mínimo 3 e máximo 15 caracteres) tipoItem
    if (produto.tipoProduto.length < 3 || produto.tipoProduto.length > 15) {
      formErrors.tipoProduto = 'O tipo de item deve ter entre 3 e 15 caracteres.';
    }
    // Validação da categoria (mínimo 3 e máximo 20 caracteres)
    if (produto.categoria.length < 3 || produto.categoria.length > 20) {
      formErrors.categoria = 'A categoria deve ter entre 3 e 20 caracteres.';
    }
    // Validação da marca (mínimo 3 e máximo 20 caracteres)
    if (produto.marca.length < 3 || produto.marca.length > 20) {
      formErrors.marca = 'A marca deve ter entre 3 e 20 caracteres.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setProduto({ ...produto, preco: calcularPrecoVenda() })
      console.log(produto);
      setIsSubmitted(true);
    } else {
      console.log('Erro na validação do formulário:', errors);
    }
  };

  //Função usada para garantir que você obtenha o valor atualizado após a chamada de setProduto
  useEffect(() => {
    if (isSubmitted) {
      console.log(produto); // Isso vai logar o valor atualizado de produto
      apiProduto.cadProduto(produto);
      setIsSubmitted(false); // Resetar o estado de enviado
    }
  }, [produto, isSubmitted]);

  // Função para calcular o preço de venda com base no custo e no lucro
  const calcularPrecoVenda = () => {
    const custo = parseFloat(produto.custo);
    const lucro = parseFloat(produto.lucro) / 100; // Converter porcentagem para decimal
    if (lucro >= 1) return 0; // Garantir que o lucro seja menor que 100%
    const precoVenda = custo / (1 - lucro);
    return precoVenda; // Retorna o preço com duas casas decimais
  };

  const formatoPrecoVenda = () => {
    return `R$ ${calcularPrecoVenda().toFixed(2)}`; // Formato para exibição
};

  //const handleSubmit = (e) => {
  // e.preventDefault();
  // console.log(produto);
  // };

  // Função para calcular o % de lucro com base no preço sugerido e no custo
  const calcularLucro = () => {
    const { custo, precoSugerido } = custoSugerido;
    if (precoSugerido > 0 && custo >= 0) {
      const lucro = ((precoSugerido - custo) / precoSugerido) * 100;
      setPercentualLucro(lucro.toFixed(2)); // Definir lucro com duas casas decimais
    } else {
      setPercentualLucro(0);
    }
  };

  const handleCustoSugeridoChange = (e) => {
    const { name, value } = e.target;
    setCustoSugerido({ ...custoSugerido, [name]: parseFloat(value) || 0 });
  };

  return (
    <div className="produto-form-container">
      <div className="left-section" >
        <div className="barcode-section">
          <label>Inserir código de barra</label>
          <input
            type="text"
            name="ean"
            value={produto.ean}
            onChange={handleChange}
            className="barcode-input input-select"
            pattern="\d{13}" // Aceitar apenas números e garantir que tenha 13 dígitos
            title="O código de barras deve conter exatamente 13 dígitos numéricos."
            required
            onKeyDown={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                return; // Permitir que as teclas Backspace e Delete funcionem normalmente
              }
              if (!/\d/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {errors.codigoBarras && <span className="error">{errors.codigoBarras}</span>}
        </div>

        <div className="image-placeholder">
          <div className="sem-foto">SEM FOTO</div>
        </div>

        {/* Nova divisão com os campos de Custo, Preço Sugerido e cálculo do %Lucro */}
        <div className="lucro-calculator">
          <div className="input-row">
            {/* Custo e Preço Sugerido lado a lado */}
            <div className="input-group half-width">
              <label htmlFor="custo">Custo</label>
              <input
                type="number"
                name="custo"
                className="input-select"
                value={custoSugerido.custo}
                onChange={handleCustoSugeridoChange}
                step="0.01"
              />
            </div>

            <div className="input-group half-width">
              <label htmlFor="precoSugerido">Preço Sugerido</label>
              <input
                type="number"
                name="precoSugerido"
                className="input-select"
                value={custoSugerido.precoSugerido}
                onChange={handleCustoSugeridoChange}
                step="0.01"
              />
            </div>
          </div>

          <div className="input-row">
            {/* Botão Calcular %Lucro e campo %Lucro lado a lado */}
            <div className="input-group half-width">
              <button type="button" onClick={calcularLucro}>
                Calcular %Lucro
              </button>
            </div>

            <div className="input-group half-width">
              <label htmlFor="percentualLucro">%Lucro</label>
              <input
                type="text"
                name="percentualLucro"
                className="input-select"
                value={`${percentualLucro}%`}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Nova divisão com o botão para adicoonar estoque */}
        <div>
          <br />
          <button className='estoque-button'>Adicionar Estoque</button>
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
            className="full-width-input input-select"
            pattern=".{3,20}" // Aceitar apenas de 3 a 20 caracteres 
            title="A descrição deve conter de 3 a 20 caracteres."
            required
          />
          {errors.descricao && <span className="error">{errors.descricao}</span>}
        </div>

        <div className="input-group half-width">
          <label>TIPO DE PRODUTO</label>
          <input
            type="text"
            name="tipoProduto"
            className="input-select"
            value={produto.tipoProduto}
            onChange={handleChange}
          />
        </div>

        <div className="input-group half-width">
          <label>UNIDADE</label>
          <select
            name="unidade"
            className='input-select'
            value={produto.unidade}
            onChange={handleChange}
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
          <input
            type="text"
            name="categoria"
            className="input-select"
            value={produto.categoria}
            onChange={handleChange}
          />
            
          
        </div>

        <div className="input-group half-width">
          <label>PESO (g ou mL)</label>
          <input
            type="number"
            name="gramagem"
            className="input-select"
            value={produto.gramagem}
            onChange={handleChange}
          />
        </div>

        <div className="input-group half-width">
          <label>MARCA</label>
          <input
            type="text"
            name="marca"
            className="input-select"
            value={produto.marca}
            onChange={handleChange}
          />
           
          
        </div>

        <div className="input-group half-width">
          <label>NCM</label>
          <input
            type="text"
            name="ncm"
            //value={produto.ncm}
            //onChange={handleChange}
            className="barcode-input input-select"
            pattern="\d{3,8}" // Aceitar apenas números e garantir que tenha de 3 a 8 dígitos
            title="O NCM deve conter de 3 a 8 dígitos numéricos."
            required
            onKeyDown={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                return; // Allow Backspace and Delete keys to work normally
              }
              if (!/\d/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {errors.ncm && <span className="error">{errors.ncm}</span>}
        </div>

        <div className="pricing-section">
          <div className="input-group pricing">
            <label>CUSTO <span>(Última compra)</span></label>
            <input
              type="number"
              name="custo"
              className="input-select"
              value={produto.custo}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="input-group pricing">
            <label>LUCRO (%)</label>
            <input
              type="number"
              name="lucro"
              className="input-select"
              value={produto.lucro}
              onChange={handleChange}
              step="0.01"
              min="0.01" // Valor mínimo permitido
              max="99.99" // Valor máximo permitido
            />
            {errors.lucro && <span className="error">{errors.lucro}</span>}
          </div>

          <div className="input-group pricing">
            <label>PREÇO DE VENDA</label>
            <input
              type="text"
              name="precoVenda"
              className="input-select"
              value={formatoPrecoVenda()}
              readOnly
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default ProdutoForm;