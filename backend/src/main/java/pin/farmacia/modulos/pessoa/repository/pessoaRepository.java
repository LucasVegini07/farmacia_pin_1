package pin.farmacia.modulos.pessoa.repository;


import pin.farmacia.modulos.pessoa.model.funcionario;
import pin.farmacia.modulos.pessoa.model.pessoa;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

    public interface pessoaRepository extends CrudRepository<pessoa, Long> {

    }
