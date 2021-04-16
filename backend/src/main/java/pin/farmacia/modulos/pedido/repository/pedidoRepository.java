package pin.farmacia.modulos.pedido.repository;

import org.springframework.data.repository.CrudRepository;
import pin.farmacia.modulos.pedido.model.pedido;

import java.util.List;

public interface pedidoRepository extends CrudRepository<pedido, Long> {

    List<pedido> findAllByOrderByIdAsc();


}