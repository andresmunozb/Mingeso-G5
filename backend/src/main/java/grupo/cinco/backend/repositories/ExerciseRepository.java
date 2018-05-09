package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Exercise;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExerciseRepository extends PagingAndSortingRepository<Exercise, Integer> {

    Iterable<Exercise> findExercisesByPublicatedEquals(boolean publicated);
}