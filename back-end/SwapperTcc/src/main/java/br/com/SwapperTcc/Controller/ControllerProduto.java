package br.com.SwapperTcc.Controller;

import br.com.SwapperTcc.Dao.InterfaceProduto;
import br.com.SwapperTcc.Entity.Produto;
import br.com.SwapperTcc.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("*")
@RequestMapping("/produtos")
public class ControllerProduto {

    @Autowired
    private InterfaceProduto dao;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public ResponseEntity<?> listarProdutos() {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Integer id) {
        return dao.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public Produto criarProduto(@RequestBody Produto produto){
        Produto produtoNovo=dao.save(produto);
        return produtoNovo;
    }

}
