package br.com.projeto.api.controle.gerente.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.projeto.api.repositorio.UsuarioRepositorio;

// Classe que contém as operações de exclusão (Delete) para Usuário.
@Service
public class DeleteUsuario {
    
    @Autowired
    private UsuarioRepositorio usuario_repositorio;

    public ResponseEntity<String> deletarUsuario (Long idUsuario){
        if (!usuario_repositorio.existsById(idUsuario)) {
            return ResponseEntity.ok("Usuario não encontrado");
        }
        usuario_repositorio.deleteById(idUsuario);
        return ResponseEntity.ok("Usuario removido");
    }
}
