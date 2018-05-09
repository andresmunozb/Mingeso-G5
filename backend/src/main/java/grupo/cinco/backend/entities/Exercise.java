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

    @Column(name = "publicated")
    private boolean publicated;

    public boolean isPublicated() {
        return publicated;
    }

    public void setPublicated(boolean publicated) {
        this.publicated = publicated;
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
