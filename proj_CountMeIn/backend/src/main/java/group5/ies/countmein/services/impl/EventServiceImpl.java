package group5.ies.countmein.services.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import group5.ies.countmein.entities.Event;
import group5.ies.countmein.entities.dto.EventDTO;
import group5.ies.countmein.entities.dto.MaxEventDTO;
import group5.ies.countmein.repositories.EventRepository;
import group5.ies.countmein.services.EventService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;

    @Override
    public List<EventDTO> getTodayEventByRoomId(long id) {
        List<Event> events = eventRepository.findByRoom_id(id);

        // filter events by today's date
        List<Event> todayEvents = events.stream().filter(event -> event.getDate().toInstant()
                .atZone(ZoneId.systemDefault()).toLocalDate().equals(LocalDate.now())).collect(Collectors.toList());

        // usa ModelMapper para converter Event para EventDTO
        ModelMapper modelMapper = new ModelMapper();
        List<EventDTO> todayEventsDTO = todayEvents.stream().map(event -> modelMapper.map(event, EventDTO.class))
                .collect(Collectors.toList());

        return todayEventsDTO;
    }

    @Override
    public List<MaxEventDTO> getWeekEventByRoomId(long id) {
        List<MaxEventDTO> result = new ArrayList<>();

        List<Event> events = eventRepository.findByRoom_id(id);

        // faz um for de 7 dias
        // para cada dia, filtra os eventos por esse dia
        // guarda o evento com maior contagem na lista result
        for (int i = 0; i < 7; i++) {
            LocalDate date = LocalDate.now().minusDays(i);
            List<Event> dayEvents = events.stream().filter(event -> event.getDate().toInstant()
                    .atZone(ZoneId.systemDefault()).toLocalDate().equals(date)).collect(Collectors.toList());

            int maxCount = 0;
            for (Event event : dayEvents) {
                if (event.getRoom_count() > maxCount) {
                    maxCount = event.getRoom_count();
                }
            }

            MaxEventDTO eventDTO = new MaxEventDTO(maxCount, date);
            result.add(eventDTO);
        }

        return result;
    }

    @Override
    public List<MaxEventDTO> getMonthEventByRoomId(long id) {
        List<MaxEventDTO> result = new ArrayList<>();

        List<Event> events = eventRepository.findByRoom_id(id);

        // faz um for de 30 dias
        // para cada dia, filtra os eventos por esse dia
        // guarda o evento com maior contagem na lista result
        for (int i = 0; i < 30; i++) {
            LocalDate date = LocalDate.now().minusDays(i);
            List<Event> dayEvents = events.stream().filter(event -> event.getDate().toInstant()
                    .atZone(ZoneId.systemDefault()).toLocalDate().equals(date)).collect(Collectors.toList());

            int maxCount = 0;
            for (Event event : dayEvents) {
                if (event.getRoom_count() > maxCount) {
                    maxCount = event.getRoom_count();
                }
            }

            MaxEventDTO eventDTO = new MaxEventDTO(maxCount, date);
            result.add(eventDTO);
        }

        return result;
    }
}
