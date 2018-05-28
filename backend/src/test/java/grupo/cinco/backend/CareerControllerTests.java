package grupo.cinco.backend;

import grupo.cinco.backend.entities.Career;
import grupo.cinco.backend.entities.User;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class CareerControllerTests {

    @Test
    public void newCareer()  {
        Career career = new Career();
        career.setId(1);
        career.setName("Ingeniería Civil Informática");
        List<User> listUsers = new ArrayList<>();
        listUsers.add(new User());
        career.setUsers(listUsers);
        Assert.assertNotNull(career);
    }
}
