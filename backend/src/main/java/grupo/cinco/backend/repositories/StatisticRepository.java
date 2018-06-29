package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Statistic;
import grupo.cinco.backend.entities.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StatisticRepository extends PagingAndSortingRepository<Statistic, Integer> {
    Statistic findStatisticByUser(User user);
}