package group5.ies.countmein.services;

import java.util.List;

import group5.ies.countmein.entities.dto.EventDTO;
import group5.ies.countmein.entities.dto.MaxEventDTO;

public interface EventService {
    List<EventDTO> getTodayEventByRoomId(long id);

    List<MaxEventDTO> getWeekEventByRoomId(long id);

    List<MaxEventDTO> getMonthEventByRoomId(long id);
}
