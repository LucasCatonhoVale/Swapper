package br.com.SwapperTcc.Controller;

import br.com.SwapperTcc.Dao.InterfaceUsuario;
import br.com.SwapperTcc.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private InterfaceUsuario dao;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Usuario  loginData){
        Optional<Usuario> cadastro=dao.findByEmailAndSenha(loginData.getEmail(),loginData.getSenha());
        if (cadastro.isPresent()){
            return ResponseEntity.ok().body(Map.of("success",true));
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success",false,"message","Usuario ou Senha invlaidos"));
        }
    }
}
