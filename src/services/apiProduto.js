import blogfetch from "./config"

async function cadProduto (produto){
    const response = await blogfetch.post('/produto/cadastrar', produto)
    console.log('Resposta:', response.data);
}

async function addProduto(dadosApi) {
    const response = await blogfetch.put('/produto/adicionarEstoque', dadosApi)
    console.log(response.data)
}

export default { cadProduto, addProduto }