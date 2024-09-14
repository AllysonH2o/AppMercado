package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.modelo.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long>{
    
}
