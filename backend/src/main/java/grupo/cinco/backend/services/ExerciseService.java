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
    public Iterable<Exercise> getAllExercises() {

        return exerciseRepository.findAll();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Exercise create(@RequestBody Exercise resource) {

        return exerciseRepository.save(resource);
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody Exercise resource)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.setName(resource.getName());
        exercise.setText(resource.getText());
        exercise.setPublicated(resource.isPublicated());
        exerciseRepository.save(exercise);
    }

    @RequestMapping(value = "/published", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getPublished()
    {
        return exerciseRepository.findExercisesByPublicatedEquals(true);
    }

    @RequestMapping(value = "/unpublished", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getUnpublished()
    {
        return exerciseRepository.findExercisesByPublicatedEquals(false);
    }

    @RequestMapping(value = "/{id}/publish",method = RequestMethod.PUT)
    @ResponseBody
    public void updatePublication(@PathVariable("id") Integer id,  @RequestBody Exercise resource) {
        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.setPublicated(resource.isPublicated());
        exerciseRepository.save(exercise);
    }

    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable Integer id)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        exerciseRepository.delete(exercise);
    }

}