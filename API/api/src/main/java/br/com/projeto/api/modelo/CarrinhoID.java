package br.com.projeto.api.modelo;
import java.io.Serializable;

import lombok.Data;

@Data
public class CarrinhoID implements Serializable {
    
    private Long fk_idVenda;
    private Long fk_idEan;

}
