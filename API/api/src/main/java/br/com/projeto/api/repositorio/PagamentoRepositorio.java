package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.modelo.Pagamento;

public interface PagamentoRepositorio extends CrudRepository<Pagamento, Long>{
    
}
