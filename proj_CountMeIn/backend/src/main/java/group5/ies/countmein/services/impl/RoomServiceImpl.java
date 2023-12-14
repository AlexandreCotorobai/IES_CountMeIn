package group5.ies.countmein.services.impl;

import org.springframework.stereotype.Service;

import group5.ies.countmein.entities.Room;

import group5.ies.countmein.repositories.RoomRepository;
import group5.ies.countmein.services.RoomService;
import lombok.AllArgsConstructor;
import java.util.Optional;


@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService{
    private RoomRepository roomRepository;

    @Override
    public boolean updateRoomSettings(long id, int capacity, boolean locked) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            room.setCapacity(capacity);
            room.setLocked(locked);
            roomRepository.save(room);
            return true;
        } else {
            return false;
        }
    }
}