package group5.ies.countmein.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group5.ies.countmein.entities.Event;
import group5.ies.countmein.entities.Room;
import group5.ies.countmein.entities.room.RoomStatusResponse;
import group5.ies.countmein.repositories.EventRepository;
import group5.ies.countmein.repositories.RoomRepository;
import group5.ies.countmein.services.RoomService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {
    private RoomRepository roomRepository;
    private EventRepository eventRepository;

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

    @Override
    public RoomStatusResponse getRoomStatus(long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            List<Event> events = eventRepository.findByRoom_id(id, Sort.by("date"));
            Event lastEvent = events.get(events.size() - 1);
            RoomStatusResponse response = new RoomStatusResponse(lastEvent.getRoom_count(),
                    roomOptional.get().getCapacity(), 0);
            return response;
        } else {
            return null;
        }
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}