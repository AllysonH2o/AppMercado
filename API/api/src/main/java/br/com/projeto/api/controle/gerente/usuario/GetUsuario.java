package br.com.projeto.api.controle.gerente.usuario;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

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
    public Optional<Usuario> listarUsuarioPorLogin(String login) {
        return Optional.ofNullable(usuario_repositorio.findByLogin(login));
    }

    // Método que ao receber login e senha retorne o conteúdo do cargo do usuário
    public String listarCargoUsuario(String login, String senha) {
        Usuario usuario = usuario_repositorio.findByLogin(login);
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario.getCargo();
        } else {
            return "Usuário ou senha inválidos";
        }
    }

}
