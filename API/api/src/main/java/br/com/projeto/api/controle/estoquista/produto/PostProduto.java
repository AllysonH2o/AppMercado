package br.com.projeto.api.controle.estoquista.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



import br.com.projeto.api.modelo.Produto;
import br.com.projeto.api.repositorio.ProdutoRepositorio;


// Classe que contém as operações de criação (Post) para Produto
@Service
public class PostProduto {
    
    @Autowired
    private ProdutoRepositorio produto_repositorio;

    //Método para cadastrar produto
    public ResponseEntity<String> cadastraProduto ( Produto objProduto){
        
        boolean existeEAN = produto_repositorio.existsByEan(objProduto.getEan());

        if (existeEAN){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Produto " + objProduto.getDescricao() + "já cadastrado.");
        }

        produto_repositorio.save(objProduto);
      
        return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com Sucesso");
    }

}
