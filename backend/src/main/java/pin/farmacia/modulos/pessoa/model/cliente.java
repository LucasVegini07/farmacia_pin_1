package pin.farmacia.modulos.pessoa.model;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "cliente")
@PrimaryKeyJoinColumn(name = "id_pessoa")

public class cliente extends pessoa {

    private int pontos;
    private double valorGastoTotal;

    public cliente(Integer idPessoa, String nome, String cpf, String apelido, String escopo) {
        super(idPessoa, nome, cpf, apelido, escopo);
    }

    public cliente(){}

    public int getPontos() {
        return pontos;
    }

    public void setPontos(int pontos) {
        this.pontos = pontos;
    }

    public double getValorGastoTotal() {
        return valorGastoTotal;
    }

    public void setValorGastoTotal(double valorGastoTotal) {
        this.valorGastoTotal = valorGastoTotal;
    }

    @Override
    public String toString() {
        return "cliente{" +
                "pontos=" + pontos +
                ", valorGastoTotal=" + valorGastoTotal +
                '}';
    }
}
