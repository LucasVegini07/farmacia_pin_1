package pin.farmacia.modulos.pedido.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;


@Entity
public class pedido  implements Serializable {

    private static final long serialVersionUID = -299569408537971270L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String nomeCliente;
    private String cpfCliente;
    private String cpfFuncionario;
    private double valor;
    private ArrayList<String> produtos = new ArrayList<>();
    private ArrayList<Integer> quantidade = new ArrayList<>();

    public pedido(int id, String nomeCliente, String cpfCliente, String cpfFuncionario, double valor) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.cpfFuncionario = cpfFuncionario;
        this.valor = valor;
    }

    public pedido(){}

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCpfCliente() {
        return cpfCliente;
    }

    public void setCpfCliente(String cpfCliente) {
        this.cpfCliente = cpfCliente;
    }

    public String getCpfFuncionario() {
        return cpfFuncionario;
    }

    public void setCpfFuncionario(String cpfFuncionario) {
        this.cpfFuncionario = cpfFuncionario;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public ArrayList<String> getProdutos() {
        return produtos;
    }

    public void setProdutos(ArrayList<String> produtos) {
        this.produtos = produtos;
    }

    public ArrayList<Integer> getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(ArrayList<Integer> quantidade) {
        this.quantidade = quantidade;
    }
}
