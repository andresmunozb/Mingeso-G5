package grupo.cinco.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private int id;


    @ManyToOne(fetch= FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name= "id_rol", nullable = false)
    private Role role;

    @Column
    private String email;

}