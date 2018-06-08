package grupo.cinco.backend;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.Solution;
import grupo.cinco.backend.entities.User;
import org.junit.Assert;
import org.junit.Test;

public class SolutionControllerTests {
    @Test
    public void newSolution()  {
        Solution solution = new Solution();
        solution.setId(1);
        solution.setScript("print(4)");
        solution.setLanguage("python");
        solution.setExercise(new Exercise());
        solution.setUser(new User());
        Assert.assertNotNull(solution);
    }
}
