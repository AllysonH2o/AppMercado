package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "Usuario")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @NotBlank(message = "O login não pode estar em branco")
    @Size(min = 3, max = 20, message = "O login deve ter entre 3 e 20 caracteres")
    private String login;

    @NotBlank(message = "A senha não pode estar em branco")
    @Pattern(regexp = "\\d{8}", message = "A senha deve conter exatamente 8 dígitos")
    private String senha;

    @NotBlank(message = "O cargo não pode estar em branco")
    @Size(min = 3, max = 12, message = "O cargo deve ter entre 3 e 12 caracteres")
    private String cargo;

    private Boolean acesso;

}
