package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Table(name = "Venda")
@Data
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long idVenda;

    @NotBlank(message = "O preço não pode estar em branco")
    @Pattern(regexp = "^\\d{1,4}(\\.\\d{1,2})?$", message = "O preço deve ter no máximo 4 dígitos à esquerda da vírgula e 2 dígitos à direita")
    private double valorVenda;

    private String dataVenda;
    
}
