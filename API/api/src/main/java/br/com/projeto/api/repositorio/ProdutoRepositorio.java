package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.modelo.Produto;

@Repository
public interface ProdutoRepositorio extends CrudRepository<Produto, String> {

    boolean existsByEan(String ean);

    Produto findByEan(String ean);
    
}
