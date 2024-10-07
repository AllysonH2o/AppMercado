import blogfetch from "./config";

async function novoFuncionario(dados) {
    try {
        const response = await blogfetch.post(`/usuario/cadastrar`, dados,);
        console.log(response.data)
    } catch (error) {
        console.log(error);
    }
}

async function listarFuncionarios() {
    try {
        const response = await blogfetch.get(`/usuario/listar`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function listarProduto() {
    try {
        const response = await blogfetch.get(`/produto/listar`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
    
}

export default { novoFuncionario, listarFuncionarios, listarProduto }