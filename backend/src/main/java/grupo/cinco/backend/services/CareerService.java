package grupo.cinco.backend.services;


import grupo.cinco.backend.entities.Career;
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
    public Iterable<Career> getAllProducts() {
        return careerRepository.findAll();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Career create(@RequestBody Career resource)
    {
        return careerRepository.save(resource);
    }

}
