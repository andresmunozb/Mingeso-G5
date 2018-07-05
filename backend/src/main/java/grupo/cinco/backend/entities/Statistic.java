package grupo.cinco.backend.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import grupo.cinco.backend.utils.DTO2;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Entity
@Table(name = "statistics")
public class Statistic implements Comparable<Statistic> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "solutions")
    private int solutions;

    @Column(name = "spend_time")
    private long spendTime;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSolutions() {
        return solutions;
    }

    public void setSolutions(int solutions) {
        this.solutions = solutions;
    }

    public long getSpendTime() {
        return spendTime;
    }

    public void setSpendTime(long spendTime) {
        this.spendTime = spendTime;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int compareTo(Statistic o) {
        if (this.getDate() == null || o.getDate() == null)
            return 0;
        return this.getDate().compareTo(o.getDate());
    }

    public static Date sumarDia(Date fecha, int dias){
        if (dias==0) return fecha;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fecha);
        calendar.add(Calendar.DAY_OF_YEAR, dias);
        return calendar.getTime();
    }
    public static List<Date> getListBetween(Date desde,Date hasta) {
        List<Date> result = new ArrayList<Date>();
        Date buffer = desde;
        System.out.println("hola");
        while(buffer.compareTo(hasta)!= 0){
            result.add(buffer);
            System.out.println("nueva fecha");
            buffer = sumarDia(buffer,1);
        }
        return result;
    }

    public static Iterable<Statistic> groupByDate(Iterable<Statistic> iterable){
        List<Date> fechas = new ArrayList<Date>();
        List<Statistic> group = new ArrayList<Statistic>();
        for(Statistic s: iterable){
            if(!fechas.contains(s.getDate())){
                fechas.add(s.getDate());
                //System.out.println(s.getDate().toString());
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
            //System.out.println("Date: " + s.getDate() + "index: " + index);
            Statistic temp = group.get(index);
            temp.setSpendTime(s.getSpendTime() + temp.getSpendTime());
            temp.setSolutions(s.getSolutions() + temp.getSolutions());
            group.set(index,temp);

        }
        Collections.sort(group);
        return group;
    }


    public static Date toDate(String fecha){

        SimpleDateFormat formatoDelTexto = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = formatoDelTexto.parse(fecha);


        } catch (ParseException ex) {

            ex.printStackTrace();

        }
        return date;

    }

    public static Iterable<Statistic> groupByDateB(Iterable<Statistic> iterable,Date desde,Date hasta){
        List<Date> fechas = getListBetween(desde,hasta);
        List<Statistic> group = new ArrayList<Statistic>();
        for(Statistic s: iterable){
            if(!fechas.contains(s.getDate())){
                fechas.add(s.getDate());
                //System.out.println(s.getDate().toString());
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
            //System.out.println("Date: " + s.getDate() + "index: " + index);
            Statistic temp = group.get(index);
            temp.setSpendTime(s.getSpendTime() + temp.getSpendTime());
            temp.setSolutions(s.getSolutions() + temp.getSolutions());
            group.set(index,temp);

        }
        Collections.sort(group);
        return group;
    }
}
