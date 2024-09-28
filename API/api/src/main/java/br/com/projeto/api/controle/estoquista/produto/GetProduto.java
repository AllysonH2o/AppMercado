package br.com.projeto.api.controle.estoquista.produto;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.dto.ProdutoDTO;
import br.com.projeto.api.modelo.Produto;
import br.com.projeto.api.repositorio.ProdutoRepositorio;

// Classe que contém as operações de consulta (Get) para Produto
@Service
public class GetProduto {

    @Autowired
    private ProdutoRepositorio produto_repositorio;

     // Método para listar todos os produtos
    public Iterable<Produto> listarTodosProdutos(){
        return produto_repositorio.findAll();
    }

    //metodo para verificar se existe EAN cadastrado. Obs: deve ser usado para quando for cadastrar um produto pra verificar se já existe um cadastrado.
    public ResponseEntity<String> consultaEAN(String ean) {
        // Verifica se o produto com o EAN fornecido existe
        Produto produto = produto_repositorio.findById(ean).orElse(null);

        // Verifica se a string ean possui 13 caracteres
        if (ean == null || ean.length() != 13) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O código de barras deverá ter 13 dígitos");
        }

        if (produto != null) {
            // Produto encontrado, retorna uma mensagem com o nome do produto
            String mensagem = "Produto já cadastrado: " + produto.getDescricao();
            return ResponseEntity.ok(mensagem);
        }

        // Produto não encontrado, retorna mensagem de produto não cadastrado
        String mensagem = "Produto ainda não cadastrado, continuar com cadastro.";
        return ResponseEntity.ok(mensagem);
    }
    
    //Métado para retorna o conteudo do produto ao passar o EAN na URL
    public ResponseEntity<Produto> listaProdutoPorEAN(String ean) {
        // Verifica se a string ean possui 13 caracteres
        if (ean == null || ean.length() != 13) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retorna null ou uma mensagem de erro
        }
    
        // Busca o produto pelo EAN
        Produto produto = produto_repositorio.findById(ean).orElse(null);
    
        if (produto != null) {
            // Produto encontrado, retorna o produto
            return ResponseEntity.ok(produto);
        }
    
        // Produto não encontrado, retorna uma resposta 404 Not Found
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

        //Métado para retorna descrição e valor do produto ao passar o EAN na URL
    public ResponseEntity<ProdutoDTO> produtoParaCarrinho(String ean) {
        // Verifica se o EAN possui 13 caracteres
        if (ean == null || ean.length() != 13) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // EAN inválido
        }

        // Busca o produto pelo EAN
        Produto produto = produto_repositorio.findByEan(ean);
        
        // Se o produto foi encontrado
        if (produto != null) {
            // Cria o DTO com descrição e preço
            ProdutoDTO produtoDTO = new ProdutoDTO(produto.getDescricao(), produto.getPreco());
            return ResponseEntity.ok(produtoDTO); // Retorna o DTO
        }

        // Caso o produto não seja encontrado
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Produto não encontrado
    }
}
