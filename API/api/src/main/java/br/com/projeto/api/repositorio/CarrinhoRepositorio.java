package br.com.projeto.api.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.projeto.api.modelo.Carrinho;
import br.com.projeto.api.modelo.CarrinhoID;


@Repository
public interface CarrinhoRepositorio extends JpaRepository<Carrinho, CarrinhoID>{
    
}
