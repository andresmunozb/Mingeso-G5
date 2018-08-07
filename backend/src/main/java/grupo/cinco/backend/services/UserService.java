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

    @RequestMapping(value = "/students",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> students() {
        Role role = roleRepository.findRoleByNameRol("student");
        return userRepository.findUsersByRole(role);
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

    @RequestMapping(value = "/create/{id_role}/{id_class}/{id_career}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User createWithRCC(@PathVariable("id_role") Integer idRole,@PathVariable("id_class") Integer idClass, @PathVariable("id_career") Integer idCareer,@RequestBody User resource)
    {
        Class clase = classRepository.findById(idClass).get();
        Career career = careerRepository.findById(idCareer).get();
        Role role = roleRepository.findById(idRole).get();
        resource.setClase(clase);
        resource.setCareer(career);
        resource.setRole(role);
        return userRepository.save(resource);
    }

    @RequestMapping(value = "/create/{id_role}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User createWithR(@PathVariable("id_role") Integer idRole,@RequestBody User resource)
    {
        Role role = roleRepository.findById(idRole).get();
        resource.setRole(role);
        return userRepository.save(resource);
    }

    @RequestMapping(value = "/{id_user}/update/{id_role}/{id_class}/{id_career}", method = RequestMethod.PUT)
    @ResponseBody
    public User update(@PathVariable("id_user") Integer idUser,
                       @PathVariable("id_role") Integer idRole,
                       @PathVariable("id_class") Integer idClass,
                       @PathVariable("id_career") Integer idCareer,
                       @RequestBody User resource)
    {
        User user = userRepository.findById(idUser).get();
        Career career;
        Class clase;
        Role role = roleRepository.findById(idRole).get();
        if(idClass==-1){
            clase = null;
        }
        else{
            clase = classRepository.findById(idClass).get();
        }
        if(idCareer == -1){
            career = null;
        }
        else{
            career = careerRepository.findById(idCareer).get();
        }
        user.setRole(role);
        user.setClase(clase);
        user.setCareer(career);
        user.setEmail(resource.getEmail());
        return userRepository.save(user);
    }

    @RequestMapping(value = "/class/{id_class}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateClass(@PathVariable("id_class") Integer idClass, @RequestBody User resource)
    {
        Class clase = classRepository.findById(idClass).get();
        resource.setClase(clase);
        return userRepository.save(resource);
    }

    @RequestMapping(value = "/career/{id_career}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateCareer(@PathVariable("id_career") Integer idCareer, @RequestBody User resource)
    {
        Career career = careerRepository.findById(idCareer).get();
        resource.setCareer(career);
        return userRepository.save(resource);
    }


    @RequestMapping(value = "/role/{id_role}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateRole(@PathVariable("id_role") Integer idRole, @RequestBody User resource)
    {
        Role role = roleRepository.findById(idRole).get();
        resource.setRole(role);
        return userRepository.save(resource);
    }

    @RequestMapping(value = "{mail}/role", method = RequestMethod.GET)
    @ResponseBody
    public Role getRoleUser(@PathVariable("mail") String mail)
    {
        User user = userRepository.findUserByEmailEquals(mail);
        return user.getRole();
    }

    @RequestMapping(value = "{mail}/id", method = RequestMethod.GET)
    @ResponseBody
    public int getIdUser(@PathVariable("mail") String mail)
    {
        User user = userRepository.findUserByEmailEquals(mail);
        return user.getId();
    }


    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable("id") Integer id)
    {
        User user = userRepository.findById(id).get();
        userRepository.delete(user);
    }

}
