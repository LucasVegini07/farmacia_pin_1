package pin.farmacia.modulos.pedido.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pin.farmacia.modulos.pedido.repository.pedidoRepository;
import pin.farmacia.modulos.produto.model.produto;
import pin.farmacia.modulos.produto.repository.produtoRepository;
import pin.farmacia.modulos.pedido.model.pedido;
import pin.farmacia.modulos.pessoa.model.cliente;
import pin.farmacia.modulos.pessoa.model.funcionario;
import pin.farmacia.modulos.pessoa.repository.clienteRepository;
import pin.farmacia.modulos.pessoa.repository.funcionarioRepository;

import java.util.ArrayList;

import java.util.List;
import java.util.function.Function;

import org.json.JSONObject;

@Service
public class pedidoService {

    @Autowired
    pedidoRepository pedidoRepository;

    @Autowired
    produtoRepository produtoRepository;

    @Autowired
    clienteRepository clienteRepository;

    @Autowired
    funcionarioRepository funcionarioRepository;


    public pedido cadastrarPedido(pedido p, List<JSONObject> products) {

        ArrayList<String> produtos = new ArrayList<String>();
        ArrayList<Integer> quantidade = new ArrayList<Integer>();
        double comissao = 0;
        funcionario f = funcionarioRepository.getByCpf(p.getCpfFuncionario());

        for (int i = 0; i < products.size(); i++) {
            produto produtoBanco = produtoRepository.getById((Integer) products.get(i).get("id"));
            produtoBanco.setQuantidade(produtoBanco.getQuantidade() - Integer.parseInt((String) products.get(i).get("quantidade")));
            produtoRepository.save(produtoBanco);
            comissao = (comissao + (produtoBanco.getPreco() * produtoBanco.getComissao() * Integer.parseInt((String) products.get(i).get("quantidade")) * 0.01));
            produtos.add(produtoBanco.getNome());
            quantidade.add(Integer.parseInt((String) products.get(i).get("quantidade")));
        }
        f.setComissao((float) (f.getComissao() + comissao));
        p.setProdutos(produtos);
        p.setQuantidade(quantidade);

        funcionarioRepository.save(f);

        if (clienteRepository.existsByCpf(p.getCpfCliente())) {
            cliente c = clienteRepository.getByCpf(p.getCpfCliente());
            c.setValorGastoTotal(c.getValorGastoTotal() + (double) p.getValor());
            if (c.getValorGastoTotal() > 300)
                c.setPontos(c.getPontos() + 1);
            clienteRepository.save(c);

        } else {
            cliente c = new cliente(null, p.getNomeCliente(), p.getCpfCliente(), p.getNomeCliente(), "cliente");
            c.setValorGastoTotal((double) p.getValor());
            if (c.getValorGastoTotal() > 300)
                c.setPontos(c.getPontos() + 1);
            clienteRepository.save(c);
        }

        return pedidoRepository.save(p);
    }

    public List<pedido> getAllPedidos() {
        return pedidoRepository.findAllByOrderByIdAsc();
    }


}