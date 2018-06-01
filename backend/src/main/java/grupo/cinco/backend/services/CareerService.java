package grupo.cinco.backend.services;


import grupo.cinco.backend.entities.Career;
import grupo.cinco.backend.entities.User;
import grupo.cinco.backend.repositories.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/careers")
public class CareerService {

    @Autowired
    private CareerRepository careerRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    @RequestMapping(value = "/{id}/users",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> getUsers(@PathVariable("id") Integer id) {
        Career career = careerRepository.findById(id).get();
        return career.getUsers();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Career create(@RequestBody Career resource)
    {
        return careerRepository.save(resource);
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody Career resource)
    {
        Career career = careerRepository.findById(id).get();
        career.setNameCareer(resource.getNameCareer());
        careerRepository.save(career);
    }
    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable Integer id)
    {
        Career career = careerRepository.findById(id).get();
        careerRepository.delete(career);
    }

}
