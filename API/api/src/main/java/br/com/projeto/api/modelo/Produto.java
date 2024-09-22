package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "Produto")
@Data
public class Produto {

    @Id
    @NotBlank(message = "O EAN não pode estar em branco")
    @Size(min = 13, max = 13, message = "O EAN deve conter exatamente 13 dígitos")
    //@Pattern(regexp = "\\d{13}", message = "O EAN deve ser composto apenas por dígitos numéricos")
    private String ean;

    @NotBlank(message = "A descrição não pode estar em branco")
    @Size(max = 20, message = "A descrição deve ter no máximo 20 caracteres")
    private String descricao;

    @NotBlank(message = "O tipo de produto não pode estar em branco")
    @Size(max = 20, message = "O tipo de produto deve ter no máximo 20 caracteres")
    private String tipoProduto;

    @NotBlank(message = "A unidade não pode estar em branco")
    @Size(max = 5, message = "A unidade deve ter no máximo 5 caracteres")
    private String unidade;

    @NotBlank(message = "A gramagem não pode estar em branco")
    @Size(max = 10, message = "A gramagem deve ter no máximo 10 caracteres")
    private String gramagem;

    @NotBlank(message = "A categoria não pode estar em branco")
    @Size(max = 15, message = "A categoria deve ter no máximo 15 caracteres")
    private String categoria;

    @NotBlank(message = "A marca não pode estar em branco")
    @Size(max = 20, message = "A marca deve ter no máximo 20 caracteres")
    private String marca;

    @NotNull(message = "O custo não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9999.99", inclusive = true, message = "O custo deve ser menor ou igual a 9999.99")
    private BigDecimal custo;

    @NotNull(message = "O lucro não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9.99", inclusive = true, message = "O custo deve ser menor ou igual a 9.99")
    private BigDecimal lucro;

    @NotNull(message = "O preço não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9999.99", inclusive = true, message = "O custo deve ser menor ou igual a 9999.99")
    private BigDecimal preco;

    @DecimalMin(value = "0", message = "O estoque não pode ser negativo")
    private int estoque;



}


