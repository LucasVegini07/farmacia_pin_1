package pin.farmacia.modulos.produto.service;

import pin.farmacia.modulos.produto.model.produto;
import pin.farmacia.modulos.produto.repository.produtoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class produtoService {

    @Autowired
    produtoRepository produtoRepository;

    public produto cadastrarProduto(produto p){
        return produtoRepository.save(p);
    }

    public List<produto> getAllProdutos(){
        return produtoRepository.findAllByOrderByIdAsc();
    }
}
