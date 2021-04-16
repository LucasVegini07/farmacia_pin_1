package pin.farmacia.modulos.produto.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pin.farmacia.modulos.produto.model.produto;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

    public interface produtoRepository extends CrudRepository<produto, Long> {

        produto getById(int id);
        List<produto> findAllByOrderByIdAsc();


    }
