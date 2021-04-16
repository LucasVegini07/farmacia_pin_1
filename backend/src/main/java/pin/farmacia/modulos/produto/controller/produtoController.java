package pin.farmacia.modulos.produto.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pin.farmacia.modulos.pessoa.model.funcionario;
import pin.farmacia.modulos.produto.service.produtoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import pin.farmacia.modulos.produto.model.produto;

@Controller
@RequestMapping("/api")
public class produtoController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    produtoService produtoService;

    @PostMapping(value = "/produto", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createProduto (
            @RequestParam(value = "produto", required = false) String produtoString ) throws Exception {
        produto produto = objectMapper.readValue( produtoString, produto.class);
        return new ResponseEntity<>(produtoService.cadastrarProduto(produto), HttpStatus.OK);
    }

    @PutMapping(value = "/produto", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editProduto (
            @RequestParam(value = "produto", required = false) String produtoString ) throws Exception {
        produto produto = objectMapper.readValue( produtoString, produto.class);
        return new ResponseEntity<>(produtoService.cadastrarProduto(produto), HttpStatus.OK);
    }


    @GetMapping(value = "/produto/busca-todos", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> buscaTodosProdutos () {
        return new ResponseEntity<>(produtoService.getAllProdutos(), HttpStatus.OK);
    }


}
