package br.com.projeto.api.controle.estoquista.produto;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.api.modelo.Produto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

// Classe responsável por gerenciar todas as requisições relacionadas ao Produto.
@RestController
@AllArgsConstructor
@RequestMapping("/produto")
public class ControleProduto {


    private final PostProduto postProduto;
    private final GetProduto getProduto;
    private final PutProduto putProduto;
    private final DeleteProduto deleteProduto;

    //endpoint para cadastrar produto
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody Produto objProduto){
        return postProduto.cadastraProduto(objProduto);
    }
    //endpoint para consultar se existe produto cadastrado
    @GetMapping("/{ean}")
    public ResponseEntity<String> consultaEAN (@PathVariable String ean){
        return getProduto.consultaEAN(ean);
    }
    //Endpoit para listar um produto pelo seu EAN passado na URL
    @GetMapping("/listaProdutoPorEAN/{ean}")
    public ResponseEntity<Produto> listaProdutoPorEAN (@PathVariable String ean){
        return getProduto.listaProdutoPorEAN(ean);
    }

    //Método para atualziar um produto. 
    @PutMapping("/atualizar/{ean}")
    public ResponseEntity<String> atualizar (@Valid @PathVariable String ean, @RequestBody Produto objProduto){
        return putProduto.atualizaProduto(ean, objProduto);

        /*Lista de métodos
         * 1 - atualizaProduto - atualizar produto mas não o codigo EAN. OBS: deverar passar o codigo o mesmo codigo EAN na URL e na requesição Json
         * 2 - atualizaProduto2 - atualizar produto por completo mas deleta toda a informação do produto e cria um novo com os dados enviados
         */
    }
    


    //Endpoint para deletar um produto atravez de seu EAN recebido na URL
    @DeleteMapping("/deletar/{ean}")
    public ResponseEntity<String> deletarProduto(@PathVariable String ean){
        return deleteProduto.deletarproduto(ean);
    }
    
}
