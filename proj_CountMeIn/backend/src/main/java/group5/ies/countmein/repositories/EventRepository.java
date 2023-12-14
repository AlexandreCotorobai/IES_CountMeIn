package group5.ies.countmein.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import group5.ies.countmein.entities.Event;

public interface EventRepository extends MongoRepository<Event, Long> {
    @Query("{ 'room_id' : ?0 }")
    List<Event> findByRoom_id(long room_id);
}
