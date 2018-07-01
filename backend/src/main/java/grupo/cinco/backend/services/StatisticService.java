package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Career;
import grupo.cinco.backend.entities.Class;
import grupo.cinco.backend.entities.Statistic;
import grupo.cinco.backend.entities.User;
import grupo.cinco.backend.repositories.CareerRepository;
import grupo.cinco.backend.repositories.ClassRepository;
import grupo.cinco.backend.repositories.StatisticRepository;
import grupo.cinco.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/statistics")
public class StatisticService {

    @Autowired
    private StatisticRepository statisticRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private ClassRepository classRepository;

    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Statistic> getStatisticUser(@PathVariable("id") Integer id) {
        User user = userRepository.findById(id).get();
        Iterable<Statistic> statistics = statisticRepository.findStatisticsByUser(user);
        return statistics;
    }

    @RequestMapping(value = "/career/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Statistic> getStatisticCareer(@PathVariable("id") Integer id) {
        Career career = careerRepository.findById(id).get();
        Iterable<Statistic> statistics = statisticRepository.findStatisticsByUser_Career(career);
        statistics = groupByDate(statistics);
        return statistics;
    }

    @RequestMapping(value = "/class/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Statistic> getStatisticClase(@PathVariable("id") Integer id) {
        Class clase = classRepository.findById(id).get();
        Iterable<Statistic> statistics = statisticRepository.findStatisticsByUser_Clase(clase);
        statistics = groupByDate(statistics);
        return statistics;
    }

    private Iterable<Statistic> groupByDate(Iterable<Statistic> iterable){
        List<Date> fechas = new ArrayList<Date>();
        List<Statistic> group = new ArrayList<Statistic>();
        for(Statistic s: iterable){
            if(!fechas.contains(s.getDate())){
                fechas.add(s.getDate());
                System.out.println(s.getDate().toString());
            }
        }
        for(Date d:fechas){
            Statistic statistic = new Statistic();
            statistic.setSolutions(0);
            statistic.setSpendTime(0);
            statistic.setDate(d);
            group.add(statistic);
        }
        int index = 0;
        for(Statistic s: iterable){
            index = fechas.indexOf(s.getDate());
            System.out.println("Date: " + s.getDate() + "index: " + index);
            Statistic temp = group.get(index);
            temp.setSpendTime(s.getSpendTime() + temp.getSpendTime());
            temp.setSolutions(s.getSolutions() + temp.getSolutions());
            group.set(index,temp);

        }
        return group;


    }


}
