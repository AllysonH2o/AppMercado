package br.com.projeto.api.controle.gerente.usuario;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    private final PutUsuario putUsuario;
    private final DeleteUsuario deleteUsuario;

    // cadastrar usuario
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody Usuario objUsuario) {
        return postUsuario.cadastroUsuario(objUsuario);
    }

    // Método para listar todos os usuários
    @GetMapping("/listar")
    public ResponseEntity<Iterable<Usuario>> listarTodosUsuarios() {
        return ResponseEntity.ok(getUsuario.listarTodosUsuarios());
    }

    // Método para listar apenas um usuário ao passar seu login na URL
    @GetMapping("/conta/{login}")
    public ResponseEntity<Usuario> listarUsuarioPorLogin(@PathVariable String login) {
        return getUsuario.listarUsuarioPorLogin(login);
    }

    // Método que ao receber login e senha pela URL retorne o conteúdo do cargo do usuário
    @GetMapping("/login/{login}/{senha}")
    public ResponseEntity<Map<String, String>> loginReturnCargo2(@PathVariable String login,@PathVariable String senha) {
        return getUsuario.login(login, senha); // Chama o método login e retorna o cargo
    }
    //Metodo para atualziar as informações do usuario. Obs: atualizar todas as informações do usuario
    @PutMapping("/atualizar/{idUsuario}")
    public ResponseEntity<String> atualizarFuncionario(@PathVariable Long idUsuario, @RequestBody Usuario objUsuario){
        return putUsuario.atualizarFuncionario(idUsuario, objUsuario);

    }

    @DeleteMapping("/deletar/{idUsuario}")
    public ResponseEntity<String> deletarUsuario(@PathVariable Long idUsuario){
        return deleteUsuario.deletarUsuario(idUsuario);
    }
}
