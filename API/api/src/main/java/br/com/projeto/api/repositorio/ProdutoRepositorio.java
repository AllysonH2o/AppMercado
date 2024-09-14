package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.modelo.Produto;

public interface ProdutoRepositorio extends CrudRepository<Produto, String> {
    
}
