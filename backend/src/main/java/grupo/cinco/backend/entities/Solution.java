package grupo.cinco.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "solutions")
public class Solution {

    @Id
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_exercise")
    @JsonIgnore
    private Exercise exercise;

    @Column(name = "script")
    private String script;

    @Column (name ="language" )
    private String language;

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

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}