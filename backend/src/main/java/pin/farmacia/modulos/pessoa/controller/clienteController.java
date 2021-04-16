package pin.farmacia.modulos.pessoa.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pin.farmacia.modulos.pessoa.model.cliente;
import pin.farmacia.modulos.pessoa.service.clienteService;

@RequestMapping("/api")
@Controller
public class clienteController {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    clienteService clienteService;

    @PostMapping(value = "/cliente", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> cadastrarCliente (
            @RequestParam(value = "cliente", required = false) String clienteString) throws Exception {
        cliente clienteJson = objectMapper.readValue( clienteString, cliente.class);
        return new ResponseEntity<>(clienteService.cadastrarCliente(clienteJson) , HttpStatus.OK);
    }

    @PutMapping(value = "/cliente", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editaCliente (
            @RequestParam(value = "cliente", required = false) String clienteString) throws Exception {
        cliente clienteJson = objectMapper.readValue( clienteString, cliente.class);
        return new ResponseEntity<>(clienteService.cadastrarCliente(clienteJson) , HttpStatus.OK);
    }

    @GetMapping(value = "/cliente/busca/cpf/{cpf}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> buscaClienteByCpf(@PathVariable String cpf) {
        return new ResponseEntity<>(clienteService.getClienteByCPF(cpf), HttpStatus.OK);
    }

}
