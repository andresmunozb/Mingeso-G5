package grupo.cinco.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "careers")
public class Career {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "career", fetch = FetchType.LAZY,cascade = CascadeType.PERSIST, orphanRemoval = true)
    @JsonIgnore
    private List<User> users;
}
