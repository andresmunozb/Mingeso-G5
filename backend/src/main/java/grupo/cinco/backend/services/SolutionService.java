package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Solution;
import grupo.cinco.backend.repositories.SolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/solutions")
public class SolutionService {

    @Autowired
    private SolutionRepository solutionRepository;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Solution> getAllProducts() {
        return solutionRepository.findAll();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Solution create(@RequestBody Solution resource) {

        return solutionRepository.save(resource);
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    @ResponseBody
    public void update(@PathVariable("id") Integer id, @RequestBody Solution resource)
    {
        Solution solution = solutionRepository.findById(id).get();
        solution.setScript(resource.getScript());
        solutionRepository.save(solution);
    }


    @DeleteMapping(value = "{id}/delete")
    @ResponseBody
    public void delete(@PathVariable Integer id)
    {
        Solution solution = solutionRepository.findById(id).get();
        solutionRepository.delete(solution);
    }
}
