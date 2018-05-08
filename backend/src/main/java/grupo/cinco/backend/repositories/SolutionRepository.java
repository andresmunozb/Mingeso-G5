package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Solution;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SolutionRepository extends PagingAndSortingRepository<Solution, Integer> {
}
