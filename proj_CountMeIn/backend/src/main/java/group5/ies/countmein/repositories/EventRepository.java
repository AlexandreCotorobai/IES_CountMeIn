package group5.ies.countmein.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import group5.ies.countmein.entities.Event;

public interface EventRepository extends MongoRepository<Event, Long> {
    List<Event> findByRoomId(long room_id);
}
