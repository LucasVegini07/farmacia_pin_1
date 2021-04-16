package pin.farmacia.modulos.pessoa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pin.farmacia.modulos.pessoa.service.funcionarioService;
import pin.farmacia.modulos.pessoa.model.funcionario;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/api")
public class funcionarioController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    funcionarioService funcionarioService;

    @PostMapping(value = "/funcionario", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createFuncionario (
            @RequestParam(value = "funcionario", required = false) String funcionarioString ) throws Exception {
        funcionario funcionario = objectMapper.readValue( funcionarioString, funcionario.class);
        return new ResponseEntity<>(funcionarioService.cadastrarFuncionario(funcionario), HttpStatus.OK);
    }

    @PutMapping(value = "/funcionario", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editaFuncionario (
            @RequestParam(value = "funcionario", required = false) String funcionarioString ) throws Exception {
        funcionario funcionario = objectMapper.readValue( funcionarioString, funcionario.class);
        return new ResponseEntity<>(funcionarioService.cadastrarFuncionario(funcionario), HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(
            @RequestParam(value = "email") String email, @RequestParam(value = "senha") String senha) throws Exception {
        return new ResponseEntity<>(funcionarioService.autenticaFuncionario(email, senha), HttpStatus.OK);
    }

    @GetMapping(value = "/funcionario/busca-todos", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> buscaTodosFuncionarios () {
        return new ResponseEntity<>(funcionarioService.getAllFuncionarios(), HttpStatus.OK);
    }

    @GetMapping(value = "/funcionario/busca/id/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> buscaFuncionarioById(@PathVariable int id) {
        return new ResponseEntity<>(funcionarioService.getFuncionarioById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/funcionario/busca/email/{email}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> buscaFuncionarioByEmail(
            @PathVariable(value = "email", required = false) String email) {
        return new ResponseEntity<>(funcionarioService.getFuncionarioByEmail(email), HttpStatus.OK);
    }

    @GetMapping(value = "/funcionario/existe/gerente", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> verificaSeGerenteExiste () {
        return new ResponseEntity<>(funcionarioService.existeGerente(), HttpStatus.OK);
    }

    @PutMapping(value = "funcionario/desativa", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> desativaFuncionario (
            @RequestParam(value = "funcionario", required = false) String funcionarioString ) throws Exception {
        funcionario funcionario = objectMapper.readValue( funcionarioString, funcionario.class);
        return new ResponseEntity<>(funcionarioService.desativaFuncionario(funcionario), HttpStatus.OK);
    }

    @PutMapping(value = "funcionario/ativa", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> ativaFuncionario (
            @RequestParam(value = "funcionario", required = false) String funcionarioString ) throws Exception {
        funcionario funcionario = objectMapper.readValue( funcionarioString, funcionario.class);
        return new ResponseEntity<>(funcionarioService.ativaFuncionario(funcionario), HttpStatus.OK);
    }
    @PutMapping(value = "/funcionario/zerar/comissao", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> zerarComissao () {
        return new ResponseEntity<>(funcionarioService.zerarComissao(), HttpStatus.OK);
    }
}
