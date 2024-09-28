package br.com.projeto.api.controle.estoquista.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.dto.ProdutoDTO;
import br.com.projeto.api.modelo.Produto;
import br.com.projeto.api.repositorio.ProdutoRepositorio;

import java.util.ArrayList;
import java.util.List;

// Classe que contém as operações de atualização (Update) para Produto
@Service
public class PutProduto {

    @Autowired
    private ProdutoRepositorio produto_repositorio;

    // Método para atualizar um produto por completo

    // Obs: para atualizar o produto deverar passar o mesmo codigo EAN na URL e na
    // Body Json
    public ResponseEntity<String> atualizaProduto(String ean, Produto objProduto) {
        // Atualiza o EAN do objeto Produto para o EAN recebido na URL
        objProduto.setEan(ean);

        // System.out.println("Atualizando produto com EAN: " + objProduto.getEan());

        // Verifica se o produto existe
        if (!produto_repositorio.existsById(ean)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }

        // Atualiza o produto no repositório
        produto_repositorio.save(objProduto);

        return ResponseEntity.ok("Produto atualizado com sucesso.");
    }

    // Caso queira atualizar o EAN. Obs: o produto com EAN anterior será excluido e
    // será criado um novo porque o EAN é chave primariar e não pode ser modificada.
    public ResponseEntity<String> atualizaProduto2(String ean, Produto objProduto) {
        // System.out.println("Atualizando produto com EAN antigo: " + ean);

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

    // Método para subtrair o estoque de um produto pelo EAN
    public ResponseEntity<String> removerEstoque(String ean, int quantidadeParaSubtrair) {
        // Verifica se o EAN possui 13 caracteres
        if (ean == null || ean.length() != 13) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("EAN inválido. Deve conter exatamente 13 dígitos.");
        }

        // Verifica se a quantidade para subtrair é válida
        if (quantidadeParaSubtrair <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Quantidade para subtrair deve ser maior que zero.");
        }

        // Busca o produto pelo EAN
        Produto produto = produto_repositorio.findByEan(ean);

        // Verifica se o produto existe
        if (produto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }

        // Verifica se há estoque suficiente para subtrair
        if (produto.getEstoque() < quantidadeParaSubtrair) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Estoque insuficiente para realizar a operação.");
        }

        // Subtrai a quantidade do estoque
        produto.setEstoque(produto.getEstoque() - quantidadeParaSubtrair);

        // Salva o produto com o estoque atualizado
        produto_repositorio.save(produto);

        return ResponseEntity.ok("Estoque atualizado com sucesso. Novo estoque: " + produto.getEstoque());
    }

    // Método para subtrair o estoque de um produto pelo EAN
    public ResponseEntity<String> adicionarEstoque(String ean, int quantidadeParaAdcionar) {
        // Verifica se o EAN possui 13 caracteres
        if (ean == null || ean.length() != 13) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("EAN inválido. Deve conter exatamente 13 dígitos.");
        }

        // Verifica se a quantidade para subtrair é válida
        if (quantidadeParaAdcionar <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Quantidade para adicionar deve ser maior que zero.");
        }

        // Busca o produto pelo EAN
        Produto produto = produto_repositorio.findByEan(ean);

        // Verifica se o produto existe
        if (produto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }

        // Adiciona a quantidade do estoque
        produto.setEstoque(produto.getEstoque() + quantidadeParaAdcionar);

        // Salva o produto com o estoque atualizado
        produto_repositorio.save(produto);

        return ResponseEntity.ok("Estoque atualizado com sucesso. Novo estoque: " + produto.getEstoque());
    }

    // Método para subtrair estoque para múltiplos produtos via JSON
    public ResponseEntity<List<String>> atualizarEstoque(List<ProdutoDTO> atualizacoes) {
        List<String> resultados = new ArrayList<>();

        // Itera sobre cada atualização recebida
        for (ProdutoDTO atualizacao : atualizacoes) {
            String ean = atualizacao.getEan();
            int quantidadeParaSubtrair = atualizacao.getEstoque();

            // Verifica se o EAN possui 13 caracteres
            if (ean == null || ean.length() != 13) {
                resultados.add("EAN inválido para o código: " + ean);
                continue;
            }

            // Verifica se a quantidade para subtrair é válida
            if (quantidadeParaSubtrair <= 0) {
                resultados.add("Quantidade inválida para subtração no produto com EAN: " + ean);
                continue;
            }

            // Busca o produto pelo EAN
            Produto produto = produto_repositorio.findByEan(ean);

            // Verifica se o produto existe
            if (produto == null) {
                resultados.add("Produto não encontrado para o código EAN: " + ean);
                continue;
            }

            // Verifica se há estoque suficiente para subtrair
            if (produto.getEstoque() < quantidadeParaSubtrair) {
                resultados.add("Estoque insuficiente para o produto com EAN: " + ean + ". Estoque atual: "
                        + produto.getEstoque());
                continue;
            }

            // Subtrai a quantidade do estoque
            produto.setEstoque(produto.getEstoque() - quantidadeParaSubtrair);

            // Salva o produto com o estoque atualizado
            produto_repositorio.save(produto);

            resultados.add("Estoque atualizado com sucesso para o produto com EAN: " + ean + ". Novo estoque: "
                    + produto.getEstoque());
        }

        return ResponseEntity.ok(resultados);
    }

}
