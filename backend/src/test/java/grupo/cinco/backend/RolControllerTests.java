package grupo.cinco.backend;

import grupo.cinco.backend.entities.Role;
import grupo.cinco.backend.entities.User;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class RolControllerTests {

    @Test
    public void newRol()  {
        Role rol = new Role();
        rol.setId(1);
        rol.setName("Administrador");
        List<User> listUsers = new ArrayList<>();
        listUsers.add(new User());
        rol.setUsers(listUsers);
        Assert.assertNotNull(rol);
    }
}
