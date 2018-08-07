package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Class;
import grupo.cinco.backend.entities.Solution;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SolutionRepository extends PagingAndSortingRepository<Solution, Integer> {

    Iterable<Solution> findAllByExercise_IdAndUserClase(Integer idExercise, Class clase);
}
