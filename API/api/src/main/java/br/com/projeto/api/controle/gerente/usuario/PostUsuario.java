package br.com.projeto.api.controle.gerente.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.modelo.Usuario;
import br.com.projeto.api.repositorio.UsuarioRepositorio;

// Classe que contém as operações de criação (Post) para Usuário.
@Service
public class PostUsuario {

    @Autowired
    private UsuarioRepositorio usuario_repositorio;

    public ResponseEntity<String> cadastroUsuario (Usuario objUsuario){

        boolean existeLogin = usuario_repositorio.existsByLogin(objUsuario.getLogin());

        if (existeLogin) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Login existente");
        }

        usuario_repositorio.save(objUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("cadastro feito!");
    }

    
}
