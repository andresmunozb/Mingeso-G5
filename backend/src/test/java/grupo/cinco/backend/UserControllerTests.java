package grupo.cinco.backend;

import grupo.cinco.backend.entities.*;
import grupo.cinco.backend.entities.Class;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class UserControllerTests {

    @Test
    public void newUser()  {
        User user = new User();
        user.setId(1);
        user.setEmail("alcides.quispe@usach.cl");
        user.setRole(new Role());
        user.setCareer(new Career());
        user.setClase(new Class());
        List<Exercise> exercisesList = new ArrayList<>();
        exercisesList.add(new Exercise());
        user.setExercises(exercisesList);
        List<Solution> solutionList = new ArrayList<>();
        solutionList.add(new Solution());
        user.setSolutions(solutionList);
        Assert.assertNotNull(user);
    }
}
