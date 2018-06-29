package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Statistic;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StatisticRepository extends PagingAndSortingRepository<Statistic, Integer> {
}
