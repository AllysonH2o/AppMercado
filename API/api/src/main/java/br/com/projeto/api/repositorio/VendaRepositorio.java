package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.modelo.Venda;

public interface VendaRepositorio extends CrudRepository<Venda, Long>{
    
}
