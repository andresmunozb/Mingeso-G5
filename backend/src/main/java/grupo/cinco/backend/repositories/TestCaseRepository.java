package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.TestCase;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TestCaseRepository extends PagingAndSortingRepository<TestCase, Integer> {
}
