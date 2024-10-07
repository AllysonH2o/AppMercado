import blogfetch from "./config"

async function Logar (login, senha) {
    try {
       const response = await blogfetch.get(`/usuario/login/${login}/${senha}`)
       const data = response.data
       //console.log(data.cargo)
       if(data.cargo == "caixa") {
        window.location.href = '/caixa'
       }if(data.cargo == "estoque"){
        window.location.href = '/produto'
       }if(data.cargo == "gerente"){
        window.location.href = '/gerente'
       }
    } catch (error) {
        console.log(error);
    }
}

export default Logar