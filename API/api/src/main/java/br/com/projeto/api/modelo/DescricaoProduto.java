package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "DescricaoProduto")
@Data
public class DescricaoProduto {

    @Id
    private Long idDescricao;
    
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




}
