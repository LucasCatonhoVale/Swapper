package br.com.SwapperTcc.Dao;

import br.com.SwapperTcc.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface InterfaceUsuario extends CrudRepository<Usuario, Integer> {
    @Autowired
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
}
