package grupo.cinco.backend.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @Column(name = "id")
    private int id;

    @Column
    private String name;

    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER,cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<User> users;
}
