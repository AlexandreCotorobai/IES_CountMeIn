package group5.ies.countmein.services;

import java.util.List;

import group5.ies.countmein.entities.dto.EventDTO;
import group5.ies.countmein.entities.dto.MaxEventDTO;

public interface  RoomService {
    boolean updateRoomSettings(long id, int maxCount, boolean locked);
}
