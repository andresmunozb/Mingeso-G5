package grupo.cinco.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch= FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name= "id_user", nullable = false)
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "text")
    private String text;
}
