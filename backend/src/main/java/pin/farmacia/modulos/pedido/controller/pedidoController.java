package pin.farmacia.modulos.pedido.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pin.farmacia.modulos.pedido.service.pedidoService;
import pin.farmacia.modulos.pedido.model.pedido;
import pin.farmacia.modulos.produto.model.produto;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class pedidoController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    pedidoService pedidoService;

    @PostMapping(value = "/pedido", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createPedido (
            @RequestParam(value = "produtos", required = false) List<JSONObject> produtos,
            @RequestParam(value = "pedido", required = false) String pedidoString ) throws Exception {
        pedido pedido = objectMapper.readValue( pedidoString, pedido.class);
            return new ResponseEntity<>(pedidoService.cadastrarPedido(pedido, produtos), HttpStatus.OK);
    }

    @GetMapping(value = "/pedido/busca-todos", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> buscaTodosPedidos () {
        return new ResponseEntity<>(pedidoService.getAllPedidos(), HttpStatus.OK);
    }

    @GetMapping(value = "/cria-banco", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> criaBanco () {
        return new ResponseEntity<>(pedidoService.getAllPedidos(), HttpStatus.OK);
    }


}
