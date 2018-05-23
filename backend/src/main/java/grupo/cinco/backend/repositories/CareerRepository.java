package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Career;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CareerRepository extends PagingAndSortingRepository<Career, Integer> {
}
