package br.com.projeto.api.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

    private String ean;
    private String descricao;
    private BigDecimal preco;
    private int estoque;

    // Construtor adicional com apenas descrição e preço
    public ProdutoDTO(String descricao, BigDecimal preco) {
        this.descricao = descricao;
        this.preco = preco;
    }

}
