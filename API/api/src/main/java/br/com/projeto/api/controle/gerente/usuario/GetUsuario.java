package br.com.projeto.api.controle.gerente.usuario;

import java.util.Map;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.projeto.api.modelo.Usuario;
import br.com.projeto.api.repositorio.UsuarioRepositorio;

// Classe que contém as operações de consulta (Get) para Usuário.
@Service
public class GetUsuario {
    
    @Autowired
    private UsuarioRepositorio usuario_repositorio;

        // Método para listar todos os usuários
    public Iterable<Usuario> listarTodosUsuarios() {
        return usuario_repositorio.findAll();
    }

    // Método para listar apenas um usuário ao passar seu login
    public ResponseEntity<Usuario> listarUsuarioPorLogin(String login) {
        return ResponseEntity.ofNullable(usuario_repositorio.findByLogin(login));
    }

    // Método que ao receber login e senha retorne o conteúdo do cargo do usuário
    public ResponseEntity<Map<String, String>> login(String login, String senha) {
    Usuario usuario = usuario_repositorio.findByLogin(login);
    
    if (usuario != null && usuario.getSenha().equals(senha)) {
        // Cria um mapa contendo apenas o cargo do usuário
        Map<String, String> resposta = new HashMap<>();
        resposta.put("cargo", usuario.getCargo());
        return ResponseEntity.ok(resposta);
    } else {
        // Retorna status 404 se o login falhar
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}


}
