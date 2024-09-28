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

import br.com.projeto.api.dto.ProdutoDTO;
import br.com.projeto.api.modelo.Produto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;

// Classe responsável por gerenciar todas as requisições relacionadas ao Produto.
@RestController
@AllArgsConstructor
@RequestMapping("/produto")
public class ControleProduto {

    private final PostProduto postProduto;
    private final GetProduto getProduto;
    private final PutProduto putProduto;
    private final DeleteProduto deleteProduto;

    // -------------------ENDPOINTS DE POST---------------------------//
    // endpoint para cadastrar produto
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody Produto objProduto) {
        return postProduto.cadastraProduto(objProduto);
    }

    // -------------------ENDPOINTS DE GET---------------------------//

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Produto>> listarTodosProdutos(){
        return ResponseEntity.ok(getProduto.listarTodosProdutos());
    }

    // endpoint para consultar se existe produto cadastrado
    @GetMapping("/{ean}")
    public ResponseEntity<String> consultaEAN(@PathVariable String ean) {
        return getProduto.consultaEAN(ean);
    }

    // Endpoit para listar um produto pelo seu EAN passado na URL
    @GetMapping("/listaProdutoPorEAN/{ean}")
    public ResponseEntity<Produto> listaProdutoPorEAN(@PathVariable String ean) {
        return getProduto.listaProdutoPorEAN(ean);
    }

    @GetMapping("/carrinho/{ean}")
    public ResponseEntity<ProdutoDTO> produtoCarrinho(@PathVariable String ean) {
        return getProduto.produtoParaCarrinho(ean);
    }

    // -------------------ENDPOINTS DE PUT---------------------------//

    // Método para atualziar um produto.
    @PutMapping("/atualizar/{ean}")
    public ResponseEntity<String> atualizar(@Valid @PathVariable String ean, @RequestBody Produto objProduto) {
        return putProduto.atualizaProduto(ean, objProduto);

        /*
         * Lista de métodos
         * 1 - atualizaProduto - atualizar produto mas não o codigo EAN. OBS: deverar
         * passar o codigo o mesmo codigo EAN na URL e na requesição Json
         * 2 - atualizaProduto2 - atualizar produto por completo mas deleta toda a
         * informação do produto e cria um novo com os dados enviados
         */
    }

    // Para adiconar o estoque deve passar no body da requisição o codigo ean e o valor estoque
    @PutMapping("/adicionarEstoque")
    public ResponseEntity<String> adicionarEstoque(@RequestBody ProdutoDTO produtoDTO) {
        String ean = produtoDTO.getEan();
        int quantidadeParaAdicionar = produtoDTO.getEstoque();
        return putProduto.adicionarEstoque(ean, quantidadeParaAdicionar);
    }

    // Para remover o estoque deve passar no body da requisição o codigo ean e o
    // valor estoque
    @PutMapping("/removerEstoque")
    public ResponseEntity<String> removerEstoque(@RequestBody ProdutoDTO produtoDTO) {
        String ean = produtoDTO.getEan();
        int quantidadeParaAdicionar = produtoDTO.getEstoque();
        return putProduto.removerEstoque(ean, quantidadeParaAdicionar);
    }

    // Para atualizar o estoque com dados do carrinho deve passar um Arrylist body
    /*
     * Exemplo da do Arrylist esperado:
     * [
     * {"ean": "0123456789123", "estoque": 3},
     * {"ean": "1234567890123", "estoque": 5},
     * {"ean": "2345678901234", "estoque": 2}
     * ]
     * 
     */
    @PutMapping("/atualizarEstoque")
    public ResponseEntity<List<String>> atualizarEstoque(@RequestBody List<ProdutoDTO> atualizacoes) {
        return putProduto.atualizarEstoque(atualizacoes);
    }

    // -------------------ENDPOINTS DE DELETE------------------------//

    // Endpoint para deletar um produto atravez de seu EAN recebido na URL
    @DeleteMapping("/deletar/{ean}")
    public ResponseEntity<String> deletarProduto(@PathVariable String ean) {
        return deleteProduto.deletarproduto(ean);
    }

}
