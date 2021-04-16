package pin.farmacia.modulos.pessoa.model;

import javax.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "id_pessoa")

public class funcionario extends pessoa {

    private float salario;
    @Column(name = "email", unique = true)
    private String email;
    private String senha;
    private float comissao;
    private boolean ativo;

    public funcionario(Integer id, String nome, String cpf, String apelido, String escopo, float salario, String email, String senha, boolean ativo) {
        super(id, nome, cpf, apelido, escopo);
        this.salario = salario;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }

    public funcionario(){}

    public float getSalario() {
        return salario;
    }

    public void setSalario(float salario) {
        this.salario = salario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public float getComissao() {
        return comissao;
    }

    public void setComissao(float comissao) {
        this.comissao = comissao;
    }

    @Override
    public String toString() {
        return "funcionario{" +
                "salario=" + salario +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", ativo=" + ativo +
                '}';
    }
}
