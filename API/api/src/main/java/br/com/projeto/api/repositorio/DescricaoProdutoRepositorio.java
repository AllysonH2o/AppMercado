package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.modelo.DescricaoProduto;


public interface DescricaoProdutoRepositorio extends CrudRepository<DescricaoProduto, Long> {
    
}
