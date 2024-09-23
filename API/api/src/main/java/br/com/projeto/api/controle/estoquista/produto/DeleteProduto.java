package br.com.projeto.api.controle.estoquista.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.repositorio.ProdutoRepositorio;

// Classe que contém as operações de exclusão (Delete) para Produto
@Service
public class DeleteProduto {

    @Autowired
    private ProdutoRepositorio produto_repositorio;
    
    public ResponseEntity<String> deletarproduto(String ean){
        if (!produto_repositorio.existsByEan(ean)) {
            return ResponseEntity.ok("Produto não encontrado");
        }
        produto_repositorio.deleteById(ean);
        return ResponseEntity.ok("Produto removido!");
    }
}
