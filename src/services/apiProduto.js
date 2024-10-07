import blogfetch from "./config"

async function cadProduto (produto){
    const response = await blogfetch.post('/produto/cadastrar', produto)
    console.log('Resposta:', response.data);
}

export default { cadProduto }