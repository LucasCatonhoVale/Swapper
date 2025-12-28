package br.com.SwapperTcc.Controller;

import br.com.SwapperTcc.Dao.InterfaceUsuario;
import br.com.SwapperTcc.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private InterfaceUsuario dao;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return (List<Usuario>) dao.findAll();
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo=dao.save(usuario);
        return usuarioNovo;
    }

}
