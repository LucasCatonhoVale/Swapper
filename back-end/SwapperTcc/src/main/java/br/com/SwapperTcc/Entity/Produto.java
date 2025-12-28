package br.com.SwapperTcc.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
@Entity
@Getter
@Setter
@Table(name = "Produtos")
public class Produto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prod")
    private Integer id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "descri")
    private String descricao;
    @Column(name = "categoria")
    private String categoria;
    @Lob
    @Column(name = "imagem", columnDefinition = "MEDIUMTEXT")
    private String imagem;
    @Column(name = "preco")
    private BigDecimal preco; }