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

    @RequestMapping(value = "create/{id_exercise}",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public TestCase create(@PathVariable("id_exercise") Integer id_exercise, @RequestBody TestCase resource)
    {
        Exercise exercise = exerciseRepository.findById(id_exercise).get();
        resource.setExercise(exercise);
        return testCaseRepository.save(resource);
    }
}
