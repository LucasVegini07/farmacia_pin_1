package pin.farmacia.modulos.pessoa.repository;

import org.springframework.data.repository.CrudRepository;
import pin.farmacia.modulos.pessoa.model.cliente;

 public interface clienteRepository extends CrudRepository<cliente, Long> {

  cliente getById(int id);
  cliente getByCpf(String cpf);
  boolean existsByCpf(String cpf);

 }
