package pin.farmacia.modulos.pessoa.service;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties;
import pin.farmacia.modulos.pessoa.model.cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pin.farmacia.modulos.pessoa.model.funcionario;
import pin.farmacia.modulos.pessoa.repository.clienteRepository;
import pin.farmacia.modulos.pessoa.repository.pessoaRepository;

@Service
public class clienteService {

    @Autowired
    clienteRepository clienteRepository;

    @Autowired
    pessoaRepository pessoaRepository;

    public cliente cadastrarCliente(cliente c) { return clienteRepository.save(c);}

    public cliente getClienteByCPF(String cpf){
        cliente c = clienteRepository.getByCpf(cpf);
        return c;
    }

}
