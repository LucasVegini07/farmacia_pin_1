package pin.farmacia.modulos.produto.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
public class produto implements Serializable {

    private static final long serialVersionUID = -299569408537971270L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_produto")
    private int id;

    private String nome;
    private String setor;
    private float preco;
    private int quantidade;
    private float comissao;


    public produto(){}

    public produto(int id, String nome, String setor, float preco, int quantidade, float comissao) {
        this.id = id;
        this.nome = nome;
        this.setor = setor;
        this.preco = preco;
        this.quantidade = quantidade;
        this.comissao = comissao;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public float getComissao() {
        return comissao;
    }

    public void setComissao(float comissao) {
        this.comissao = comissao;
    }

    @Override
    public String toString() {
        return "produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", setor='" + setor + '\'' +
                ", preco=" + preco +
                ", quantidade=" + quantidade +
                ", comissao=" + comissao +
                '}';
    }
}
