package grupo.cinco.backend.services;


import grupo.cinco.backend.entities.Class;
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

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Class create(@RequestBody Class resource)
    {
        return classRepository.save(resource);
    }
}
