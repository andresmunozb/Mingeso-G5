package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Career;
import grupo.cinco.backend.entities.Class;

import grupo.cinco.backend.entities.Statistic;
import grupo.cinco.backend.entities.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;

public interface StatisticRepository extends PagingAndSortingRepository<Statistic, Integer> {
    Statistic findStatisticByUserAndDate(User user,Date date);
    Iterable<Statistic> findStatisticsByUser(User user);
    Iterable<Statistic> findStatisticsByUser_Career(Career career);
    Iterable<Statistic> findStatisticsByUser_Clase(Class clase);

    Iterable<Statistic> findStatisticsByDateBetweenAndUser(Date from, Date to,User user);
    Iterable<Statistic> findStatisticsByDateBetweenAndUser_Career(Date from, Date to,Career career);
    Iterable<Statistic> findStatisticsByDateBetweenAndUser_Clase(Date from, Date to, Class clase);
}