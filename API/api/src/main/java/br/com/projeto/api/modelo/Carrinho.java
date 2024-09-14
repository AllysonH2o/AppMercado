package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;

@Entity
@Table(name = "Carrinho")
@Data
@IdClass(CarrinhoID.class)
public class Carrinho {
   
    @Id
    private Long fk_idVenda;

    @Id
    private Long fk_idEan;

    @DecimalMin(value = "0", message = "A quantidade não pode ser negativo")
    private int quantidadeVendida;

}
