package group5.ies.countmein.services;

import group5.ies.countmein.entities.room.RoomStatusResponse;

public interface RoomService {
    boolean updateRoomSettings(long id, int maxCount, boolean locked);

    RoomStatusResponse getRoomStatus(long id);
}
