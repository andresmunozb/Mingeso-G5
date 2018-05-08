package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@CrossOrigin
@RestController
@Transactional
@RequestMapping("/exercises")
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getAllProducts() {
        return exerciseRepository.findAll();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Exercise create(@RequestBody Exercise resource) {

        return exerciseRepository.save(resource);
    }
}