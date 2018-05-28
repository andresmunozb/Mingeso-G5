package grupo.cinco.backend;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.TestCase;
import org.junit.Assert;
import org.junit.Test;

public class TestCaseControllerTests {
    @Test
    public void newTestCase()  {
        TestCase testCase = new TestCase();
        testCase.setId(1);
        testCase.setInput("1,1");
        testCase.setOutput("2");
        testCase.setExercise(new Exercise());
        Assert.assertNotNull(testCase);
    }
}
