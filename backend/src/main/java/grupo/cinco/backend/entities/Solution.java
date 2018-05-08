package grupo.cinco.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "solutions")
public class Solution {

    @Id
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @Column(name = "script")
    private String script;

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

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }
}