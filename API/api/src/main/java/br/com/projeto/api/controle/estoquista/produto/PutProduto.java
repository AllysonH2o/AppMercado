package br.com.projeto.api.controle.estoquista.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.modelo.Produto;
import br.com.projeto.api.repositorio.ProdutoRepositorio;

// Classe que contém as operações de atualização (Update) para Produto
@Service
public class PutProduto {
    
    @Autowired
    private ProdutoRepositorio produto_repositorio;

    //Método para atualizar um produto por completo

    //Obs: para atualizar o produto deverar passar o mesmo codigo EAN na URL e na Body Json
    public ResponseEntity<String> atualizaProduto(String ean, Produto objProduto) {
        // Atualiza o EAN do objeto Produto para o EAN recebido na URL
        objProduto.setEan(ean);
        
        System.out.println("Atualizando produto com EAN: " + objProduto.getEan());
    
        // Verifica se o produto existe
        if (!produto_repositorio.existsById(ean)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
    
        // Atualiza o produto no repositório
        produto_repositorio.save(objProduto);
        
        return ResponseEntity.ok("Produto atualizado com sucesso.");
    }

    //Caso queira atualizar o EAN. Obs: o produto com EAN anterior será excluido e será criado um novo porque o EAN é chave primariar e não pode ser modificada.
    public ResponseEntity<String> atualizaProduto2(String ean, Produto objProduto) {
        System.out.println("Atualizando produto com EAN antigo: " + ean);

        // Verifica se o produto existe
        if (!produto_repositorio.existsById(ean)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
    
        // Exclui o produto com o EAN antigo
        produto_repositorio.deleteById(ean);
    
        // Salva o produto com o novo EAN
        produto_repositorio.save(objProduto);
    
        return ResponseEntity.ok("Produto atualizado com sucesso.");
    }




}

