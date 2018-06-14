package grupo.cinco.backend.repositories;

import grupo.cinco.backend.entities.Exercise;
import grupo.cinco.backend.entities.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExerciseRepository extends PagingAndSortingRepository<Exercise, Integer> {
    
    Iterable<Exercise> findExercisesByUserEqualsAndAndPublishedEquals(User user, boolean published);
    Exercise findExercisesByTitleEquals(String title);
    Iterable<Exercise> findExercisesByPublished(boolean published);
}