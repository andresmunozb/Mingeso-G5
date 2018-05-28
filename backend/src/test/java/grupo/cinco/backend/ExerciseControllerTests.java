package grupo.cinco.backend;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.Solution;
import grupo.cinco.backend.entities.TestCase;
import grupo.cinco.backend.entities.User;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class ExerciseControllerTests {
    @Test
    public void newExercise()  {
        Exercise exercise = new Exercise();
        exercise.setId(1);
        exercise.setTitle("Palindromo");
        exercise.setDescription("crear funcion para invertir un string");
        exercise.setFunctionName("invertir");
        exercise.setPublished(false);
        exercise.setUser(new User());
        List<Solution> solutionList = new ArrayList<Solution>();
        solutionList.add(new Solution());
        exercise.setSolutions(solutionList);
        List<TestCase> testCaseList = new ArrayList<TestCase>();
        testCaseList.add(new TestCase());
        exercise.setTestCases(testCaseList);
        Assert.assertNotNull(exercise);
    }
}
