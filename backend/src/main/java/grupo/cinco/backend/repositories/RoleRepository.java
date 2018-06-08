package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Role;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RoleRepository extends PagingAndSortingRepository<Role,Integer> {
}
