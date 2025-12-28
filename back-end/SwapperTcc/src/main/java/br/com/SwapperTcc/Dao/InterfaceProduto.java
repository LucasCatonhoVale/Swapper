package br.com.SwapperTcc.Dao;

import br.com.SwapperTcc.Entity.Produto;
import org.springframework.data.repository.CrudRepository;

public interface InterfaceProduto extends CrudRepository<Produto, Integer> {
}
