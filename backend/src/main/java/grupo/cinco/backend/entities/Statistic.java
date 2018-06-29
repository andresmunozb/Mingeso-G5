package grupo.cinco.backend.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "statistics")
public class Statistic {
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
    @JsonFormat(pattern = "dd/MM/yyyy' a las 'HH:mm")
    private Date date;

    @OneToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
}
