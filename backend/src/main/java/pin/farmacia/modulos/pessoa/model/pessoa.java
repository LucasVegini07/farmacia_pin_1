package pin.farmacia.modulos.pessoa.model;


import javax.persistence.*;
import java.io.Serializable;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class pessoa implements Serializable {

    private static final long serialVersionUID = -299569408537971270L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id_pessoa")
    private Integer id;

    private String nome;
    @Column(name = "cpf", unique = true, columnDefinition = "CHAR(11)")
    private String cpf;
    private String apelido;
    private String escopo;

    public pessoa(Integer id, String nome, String cpf, String apelido, String escopo) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.apelido = apelido;
        this.escopo = escopo;
    }

    public pessoa(){}

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getApelido() {
        return apelido;
    }

    public void setApelido(String apelido) {
        this.apelido = apelido;
    }

    public String getEscopo() {
        return escopo;
    }

    public void setEscopo(String escopo) {
        this.escopo = escopo;
    }

    @Override
    public String toString() {
        return "pessoa{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", apelido='" + apelido + '\'' +
                ", escopo='" + escopo + '\'' +
                '}';
    }
}