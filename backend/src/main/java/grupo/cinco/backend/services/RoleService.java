package grupo.cinco.backend.services;

import grupo.cinco.backend.entities.Role;
import grupo.cinco.backend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Role create(@RequestBody Role resource)
    {
        return roleRepository.save(resource);
    }

}
