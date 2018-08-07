package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Career;
import grupo.cinco.backend.entities.Class;

import grupo.cinco.backend.entities.Statistic;
import grupo.cinco.backend.entities.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;

public interface StatisticRepository extends PagingAndSortingRepository<Statistic, Integer> {
    Statistic findStatisticByUserAndDate(User user,Date date);
    Iterable<Statistic> findStatisticsByDateBetween(Date from,Date to);
    Iterable<Statistic> findStatisticsByDateBetweenAndUser(Date from, Date to,User user);
    Iterable<Statistic> findStatisticsByDateBetweenAndUser_Career(Date from, Date to,Career career);
    Iterable<Statistic> findStatisticsByDateBetweenAndUser_Clase(Date from, Date to, Class clase);
}