package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Class;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ClassRepository extends PagingAndSortingRepository<Class,Integer> {
}
