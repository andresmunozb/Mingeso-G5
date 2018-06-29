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
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
    public Solution create(@PathVariable("id_user") Integer idUser,@PathVariable("id_exercise") Integer idExercise,@RequestBody Solution resource) {
        User user = userRepository.findById(idUser).get();
        Exercise exercise = exerciseRepository.findById(idExercise).get();
        String output = null;
        if(resource.getScript().contains("\"") || resource.getScript().contains("\\n"))
        {
            String middleInput = resource.getScript().replace("\"","\\\"");
            output = middleInput.replace("\\n","\\\\n");
            System.out.println(output);
        }
        resource.setExercise(exercise);
        resource.setUser(user);
        resource.setScript(output);
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
        JSONParser parser = new JSONParser();
        JSONObject json = null;
        Factory  factory = new Factory();
        System.out.println("Lenguaje: "+ resource.getLanguage());
        Context context = new Context(factory.getStrategy(resource.getLanguage()));
        String output = context.executeCode(resource.getScript());
        System.out.println(output);
        try {
            json = (JSONObject) parser.parse(output);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return json;
    }


}
