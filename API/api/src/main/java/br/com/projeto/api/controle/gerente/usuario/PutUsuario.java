package br.com.projeto.api.controle.gerente.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.modelo.Usuario;
import br.com.projeto.api.repositorio.UsuarioRepositorio;

// Classe que contém as operações de atualização (Update) para Usuário.
@Service
public class PutUsuario {
    
    @Autowired
    private UsuarioRepositorio usuario_repositorio;

    public ResponseEntity<String> atualizarFuncionario(Long idUsuario, Usuario objuUsuario){
        
        objuUsuario.setIdUsuario(idUsuario);

        if (!usuario_repositorio.existsById(idUsuario)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cadastro não encontrado para atualização");
            
        }
        usuario_repositorio.save(objuUsuario);
        return ResponseEntity.ok("Usuario atualizado");
    }



}
