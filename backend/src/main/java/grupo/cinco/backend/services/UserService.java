package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.Solution;
import grupo.cinco.backend.entities.User;
import grupo.cinco.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> getAll() {
        return userRepository.findAll();
    }


    /*@RequestMapping(value = "/{id}/exercises",method = RequestMethod.GET)
    @ResponseBody
    public List<Exercise> getAllExercises(@PathVariable("id") Integer id) {
        User user = userRepository.findById(id).get();
        return user.getExercises();
    }*/

}
