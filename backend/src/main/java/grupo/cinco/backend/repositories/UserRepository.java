package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, Integer> {

    User findUserByEmailEquals(String mail);
}
