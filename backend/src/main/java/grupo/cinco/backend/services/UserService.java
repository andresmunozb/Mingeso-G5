package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.*;
import grupo.cinco.backend.entities.Class;
import grupo.cinco.backend.repositories.CareerRepository;
import grupo.cinco.backend.repositories.ClassRepository;
import grupo.cinco.backend.repositories.RoleRepository;
import grupo.cinco.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> getAll() {
        return userRepository.findAll();
    }


    @RequestMapping(value = "/{id}/exercises",method = RequestMethod.GET)
    @ResponseBody
    public List<Exercise> getAllExercises(@PathVariable("id") Integer id) {
        User user = userRepository.findById(id).get();
        return user.getExercises();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User create(@RequestBody User resource)
    {
        return userRepository.save(resource);
    }

    @RequestMapping(value = "/class/{id_class}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateClass(@PathVariable("id_class") Integer id_class, @RequestBody User resource)
    {
        Class clase = classRepository.findById(id_class).get();
        resource.setClase(clase);
        return userRepository.save(resource);
    }

    @RequestMapping(value = "/career/{id_career}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateCareer(@PathVariable("id_career") Integer id_career, @RequestBody User resource)
    {
        Career career = careerRepository.findById(id_career).get();
        resource.setCareer(career);
        return userRepository.save(resource);
    }


    @RequestMapping(value = "/role/{id_role}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateRole(@PathVariable("id_role") Integer id_role, @RequestBody User resource)
    {
        Role role = roleRepository.findById(id_role).get();
        resource.setRole(role);
        return userRepository.save(resource);
    }

    @RequestMapping(value = "{id_user}/role/{mail}", method = RequestMethod.GET)
    @ResponseBody
    public Role getRoleUser(@PathVariable("id_user") Integer id_user,@PathVariable("mail") String mail)
    {
        User user = userRepository.findUserByEmailEquals(mail);
        return user.getRole();
    }

}
