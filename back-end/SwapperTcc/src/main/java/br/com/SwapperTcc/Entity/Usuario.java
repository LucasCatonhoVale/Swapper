package br.com.SwapperTcc.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id_usuario")
    private  Integer id;

    @Column(name = "nome", length = 200,nullable = true)
    private  String nome;

    @Column(name = "email", length = 200,nullable = true)
    private  String email;

    @Column(name = "cpf",length = 25,nullable = true)
    private  String cpf;

    @Column(name = "telefone", length = 200,nullable = true)
    private  String telefone;

    @Column(name = "senha", columnDefinition = "TEXT", nullable = true)
    private  String senha;
}
