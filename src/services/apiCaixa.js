import blogfetch from "./config";

async function ean(codigoProduto) {
    const response = await blogfetch.get(`/produto/listaProdutoPorEAN/${codigoProduto}`)
    const data = response.data;
    return data;
}

async function removerEstoque(produto) {
    const response = await blogfetch.put('/produto/removerEstoque', produto)
    console.log(response.data);
}

export default { ean, removerEstoque };