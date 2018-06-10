package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.TestCase;
import grupo.cinco.backend.entities.User;
import grupo.cinco.backend.repositories.ExerciseRepository;
import grupo.cinco.backend.repositories.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getAllExercises() {

        return exerciseRepository.findAll();
    }

    @RequestMapping(value = "/create/{id_user}", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public int create(@PathVariable("id_user") Integer idUser,@RequestBody Exercise resource) {
        User user = userRepository.findById(idUser).get();
        resource.setUser(user);
        Exercise exercise = exerciseRepository.save(resource);
        return exercise.getId();
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody Exercise resource)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.setTitle(resource.getTitle());
        exercise.setDescription(resource.getDescription());
        exercise.setPublished(resource.isPublished());
        exerciseRepository.save(exercise);
    }

    @RequestMapping(value = "/{id_user}/published", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getPublished(@PathVariable("id_user") Integer idUser)
    {
        User user = userRepository.findById(idUser).get();
        return exerciseRepository.findExercisesByUserEqualsAndAndPublishedEquals(user,true);
    }

    @RequestMapping(value = "/{id_user}/unpublished", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Exercise> getUnpublished(@PathVariable("id_user") Integer idUser)
    {
        User user = userRepository.findById(idUser).get();
        return exerciseRepository.findExercisesByUserEqualsAndAndPublishedEquals(user,false);
    }

    @RequestMapping(value = "/{id}/publish",method = RequestMethod.PUT)
    @ResponseBody
    public void updatePublication(@PathVariable("id") Integer id,  @RequestBody Exercise resource) {
        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.setPublished(resource.isPublished());
        exerciseRepository.save(exercise);
    }

    @RequestMapping(value = "/{id}/testcases", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<TestCase> getTestCases(@PathVariable("id") Integer id)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        return exercise.getTestCases();
    }
    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable Integer id)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        exerciseRepository.delete(exercise);
    }

}