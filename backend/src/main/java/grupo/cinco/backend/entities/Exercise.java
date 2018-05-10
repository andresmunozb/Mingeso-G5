package grupo.cinco.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.aspectj.weaver.ast.Test;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name= "id_user")
    private User user;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private boolean published;

    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    private List<TestCase> testCases;


    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    private List<Solution> solutions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPublished() {
        return published;
    }

    public List<TestCase> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<TestCase> testCases) {
        this.testCases = testCases;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public List<Solution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<Solution> solutions) {
        this.solutions = solutions;
    }
}
