package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.TestCase;
import grupo.cinco.backend.repositories.ExerciseRepository;
import grupo.cinco.backend.repositories.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/testcases")
public class TestCaseService {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<TestCase> getAllTestCases(){return testCaseRepository.findAll();}

    @RequestMapping(value = "create/{id_exercise}",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public TestCase create(@PathVariable("id_exercise") Integer idExercise, @RequestBody TestCase resource)
    {
        Exercise exercise = exerciseRepository.findById(idExercise).get();
        resource.setExercise(exercise);
        return testCaseRepository.save(resource);
    }

    @RequestMapping(value = "/{id}/edit",method = RequestMethod.PUT,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody TestCase resource)
    {
        TestCase testCase = testCaseRepository.findById(id).get();
        testCase.setInput(resource.getInput());
        testCase.setOutput(resource.getOutput());
        testCaseRepository.save(testCase);
    }



    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable("id") Integer id)
    {
        TestCase testCase = testCaseRepository.findById(id).get();
        testCaseRepository.delete(testCase);
    }
}
