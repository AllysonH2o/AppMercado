import './index.css';
import { useState } from 'react';

function Estoque() {
    const [nomeProduto, setNomeProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [unidade, setUnidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tipoItem, setTipoItem] = useState('');
    const [marca, setMarca] = useState('');
    const [custo, setCusto] = useState('');
    const [lucro, setLucro] = useState('');
    const [valorFinal, setValorFinal] = useState('');
    const [tipo, setTipo] = useState('');
    const [ncm, setNcm] = useState('');
    const [origem, setOrigem] = useState('');
    const [mensagem, setMensagem] = useState(''); // Para exibir mensagem de sucesso/erro

    const handleSubmit = (event) => {
        event.preventDefault();

        const produtoData = {
            nomeProduto,
            descricao,
            unidade,
            categoria,
            tipoItem,
            marca,
            custo: parseFloat(custo),
            lucro: parseFloat(lucro),
            valorFinal: parseFloat(valorFinal),
            tipo,
            ncm,
            origem,
        };

        fetch('https://api.exemplo.com/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produtoData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Dados enviados com sucesso:', data);
            setMensagem('Produto cadastrado com sucesso!');

            // Limpar o formulário
            setNomeProduto('');
            setDescricao('');
            setUnidade('');
            setCategoria('');
            setTipoItem('');
            setMarca('');
            setCusto('');
            setLucro('');
            setValorFinal('');
            setTipo('');
            setNcm('');
            setOrigem('');
        })
        .catch((error) => {
            console.error('Erro ao enviar os dados:', error);
            setMensagem('Erro ao cadastrar o produto.');
        });
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-form">
                <h2>Cadastro de Produto</h2>
                {mensagem && <p>{mensagem}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <div className="input-group">
                            <label htmlFor="nomeProduto">Nome do Produto:</label>
                            <input
                                type="text"
                                id="nomeProduto"
                                value={nomeProduto}
                                onChange={(e) => setNomeProduto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="descricao">Descrição:</label>
                            <input
                                type="text"
                                id="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="unidade">Unidade:</label>
                            <input
                                type="text"
                                id="unidade"
                                value={unidade}
                                onChange={(e) => setUnidade(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="categoria">Categoria:</label>
                            <input
                                type="text"
                                id="categoria"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tipoItem">Tipo do Item:</label>
                            <input
                                type="text"
                                id="tipoItem"
                                value={tipoItem}
                                onChange={(e) => setTipoItem(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="marca">Marca:</label>
                            <input
                                type="text"
                                id="marca"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="origem">Origem:</label>
                            <input
                                type="text"
                                id="origem"
                                value={origem}
                                onChange={(e) => setOrigem(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="custo">Custo:</label>
                            <input
                                type="number"
                                id="custo"
                                value={custo}
                                onChange={(e) => setCusto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lucro">% de Lucro:</label>
                            <input
                                type="number"
                                id="lucro"
                                value={lucro}
                                onChange={(e) => setLucro(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="valorFinal">Valor Final:</label>
                            <input
                                type="number"
                                id="valorFinal"
                                value={valorFinal}
                                onChange={(e) => setValorFinal(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tipo">Tipo:</label>
                            <input
                                type="text"
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="ncm">NCM:</label>
                            <input
                                type="text"
                                id="ncm"
                                value={ncm}
                                onChange={(e) => setNcm(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Estoque;
