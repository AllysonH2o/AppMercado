package br.com.projeto.api.controle.gerente.usuario;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.api.modelo.Usuario;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

// Classe responsável por gerenciar todas as requisições relacionadas ao Usuário.
@RestController
@AllArgsConstructor
@RequestMapping("/usuario")
public class ControleUsuario {
    
    private final PostUsuario postUsuario;
    private final GetUsuario getUsuario;
    
    //cadastrar usuario
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody Usuario objUsuario){
        return postUsuario.cadastroUsuario(objUsuario);
    }
    // Método para listar todos os usuários
    @GetMapping("/usuarios")
    public ResponseEntity<Iterable<Usuario>> listarTodosUsuarios() {
        return ResponseEntity.ok(getUsuario.listarTodosUsuarios());
    }

    // Método para listar apenas um usuário ao passar seu login na URL
    @GetMapping("/usuarios/{login}")
    public ResponseEntity<Usuario> listarUsuarioPorLogin(@PathVariable String login) {
        return ResponseEntity.ok(getUsuario.listarUsuarioPorLogin(login).orElse(null));
    }

    // Método que ao receber login e senha pela URL retorne o conteúdo do cargo do usuário
    @GetMapping("/usuarios/cargo")
    public ResponseEntity<String> listarCargoUsuario(@RequestParam String login, @RequestParam String senha) {
        return ResponseEntity.ok(getUsuario.listarCargoUsuario(login, senha));
    }


}
