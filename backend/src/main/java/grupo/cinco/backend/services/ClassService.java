package grupo.cinco.backend.services;


import grupo.cinco.backend.entities.Class;
import grupo.cinco.backend.entities.User;
import grupo.cinco.backend.repositories.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/classes")
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Class> getAllClasses()
    {
        return classRepository.findAll();
    }

    @RequestMapping(value = "/{id}/users",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> getUsers(@PathVariable("id") Integer id) {
        Class clase = classRepository.findById(id).get();
        return clase.getUsers();
    }

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Class create(@RequestBody Class resource)
    {
        return classRepository.save(resource);
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody Class resource)
    {
        Class clase = classRepository.findById(id).get();
        clase.setNameClass(resource.getNameClass());
        classRepository.save(clase);
    }
    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable Integer id)
    {
        Class career = classRepository.findById(id).get();
        classRepository.delete(career);
    }
}
