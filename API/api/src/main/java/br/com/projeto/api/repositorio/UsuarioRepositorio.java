package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.modelo.Usuario;

@Repository
public interface UsuarioRepositorio extends CrudRepository<Usuario, Long>{
    
    boolean existsByLogin(String login);

    Usuario findByLogin(String login);


}
