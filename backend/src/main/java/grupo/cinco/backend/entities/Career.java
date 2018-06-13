package grupo.cinco.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "careers")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int idCareer;

    @Column(name = "name")
    private String nameCareer;

    @OneToMany(mappedBy = "career")
    @JsonIgnore
    private List<User> users;

    public int getIdCareer() {
        return idCareer;
    }

    public void setIdCareer(int idCareer) {
        this.idCareer = idCareer;
    }

    public String getNameCareer() {
        return nameCareer;
    }

    public void setNameCareer(String nameCareer) {
        this.nameCareer = nameCareer;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
