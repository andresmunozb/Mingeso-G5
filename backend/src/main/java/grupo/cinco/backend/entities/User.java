package grupo.cinco.backend.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch= FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name= "id_rol", nullable = false)
    @JsonIgnore
    private Role role;

    @ManyToOne
    @JoinColumn(name= "id_class")
    @JsonIgnore
    private Class clase;

    @ManyToOne(fetch= FetchType.EAGER,cascade = CascadeType.REMOVE)
    @JoinColumn(name= "id_career")
    @JsonIgnore
    private Career career;

    @Column (name = "email")
    private String email;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Exercise> exercises;


    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Solution> solutions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Class getClase() {
        return clase;
    }

    public void setClase(Class clase) {
        this.clase = clase;
    }

    public Career getCareer() {
        return career;
    }

    public void setCareer(Career career) {
        this.career = career;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
    }
}