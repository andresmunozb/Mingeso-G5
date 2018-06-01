package grupo.cinco.backend;

import grupo.cinco.backend.entities.User;
import org.junit.Assert;
import org.junit.Test;
import grupo.cinco.backend.entities.Class;

import java.util.ArrayList;
import java.util.List;

public class ClassControllerTests {
    @Test
    public void newClass()  {
        Class clase = new Class();
        clase.setIdClass(1);
        clase.setNameClass("A-1");
        List<User> listUsers = new ArrayList<>();
        listUsers.add(new User());
        clase.setUsers(listUsers);
        Assert.assertNotNull(clase);
    }
}
