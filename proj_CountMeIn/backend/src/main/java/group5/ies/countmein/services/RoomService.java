package group5.ies.countmein.services;

import java.util.List;

import group5.ies.countmein.entities.Room;
import group5.ies.countmein.entities.room.RoomStatusResponse;

public interface RoomService {
    boolean updateRoomSettings(long id, int maxCount, boolean locked);

    RoomStatusResponse getRoomStatus(long id);

    List<Room> getAllRooms();
}
