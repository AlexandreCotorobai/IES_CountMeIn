package group5.ies.countmein.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import group5.ies.countmein.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findById(long id);
}
