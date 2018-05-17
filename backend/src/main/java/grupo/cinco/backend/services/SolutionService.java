package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.Solution;
import grupo.cinco.backend.entities.User;
import grupo.cinco.backend.repositories.ExerciseRepository;
import grupo.cinco.backend.repositories.SolutionRepository;
import grupo.cinco.backend.repositories.UserRepository;
import grupo.cinco.backend.utils.Context;
import grupo.cinco.backend.utils.Factory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/solutions")
public class SolutionService {

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Solution> getAllProducts() {
        return solutionRepository.findAll();
    }

    @RequestMapping(value = "/create/{id_user}/{id_exercise}", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Solution create(@PathVariable("id_user") Integer id_user,@PathVariable("id_exercise") Integer id_exercise,@RequestBody Solution resource) {
        User user = userRepository.findById(id_user).get();
        Exercise exercise = exerciseRepository.findById(id_exercise).get();
        resource.setExercise(exercise);
        resource.setUser(user);
        return solutionRepository.save(resource);
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody Solution resource)
    {
        Solution solution = solutionRepository.findById(id).get();
        solution.setScript(resource.getScript());
        solution.setLanguage(resource.getLanguage());
        solutionRepository.save(solution);
    }


    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable Integer id)
    {
        Solution solution = solutionRepository.findById(id).get();
        solutionRepository.delete(solution);
    }

    @RequestMapping(value = "/execute", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JSONObject execute(@RequestBody Solution resource) {
        Factory  factory = new Factory();
        Context context = new Context(factory.getStrategy(resource.getLanguage()));
        return context.executeCode(resource.getScript());
    }


}
