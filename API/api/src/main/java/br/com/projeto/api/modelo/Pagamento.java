package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "Pagamento")
@Data
public class Pagamento {


    @Id
    private Long fk_idVenda;


    @NotNull(message = "O preço não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9999.99", inclusive = true, message = "O custo deve ser menor ou igual a 9999.99")
    private BigDecimal dinheiro;

    @NotNull(message = "O preço não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9999.99", inclusive = true, message = "O custo deve ser menor ou igual a 9999.99")
    private BigDecimal pix;

    @NotNull(message = "O preço não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9999.99", inclusive = true, message = "O custo deve ser menor ou igual a 9999.99")
    private BigDecimal cartaoDebito;

    @NotNull(message = "O preço não pode estar em branco")
    @DecimalMin(value = "0.00", inclusive = true, message = "O custo deve ser maior ou igual a 0")
    @DecimalMax(value = "9999.99", inclusive = true, message = "O custo deve ser menor ou igual a 9999.99")
    private BigDecimal cartaoCredito;
    
}
