package pin.farmacia.modulos.pessoa.repository;

import org.springframework.data.repository.CrudRepository;
import pin.farmacia.modulos.pessoa.model.cliente;
import pin.farmacia.modulos.pessoa.model.funcionario;

import java.util.List;

public interface funcionarioRepository extends CrudRepository<funcionario, Long> {

    List<funcionario> findAllByOrderByIdAsc();
    boolean existsByescopo(String escopo);
    boolean existsByemail(String email);
    funcionario getByEmail(String email);
    funcionario getById(int id);
    funcionario getByCpf(String cpf);




}
