package group5.ies.countmein.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group5.ies.countmein.services.impl.EventServiceImpl;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/")
public class EventController {
    private EventServiceImpl eventService;

    @GetMapping("roomSettings/todayGraph")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> getTodayEvents(@RequestHeader("Authorization") String token,
            @RequestParam(name = "room_id", required = true) Long room_id) {
        return ResponseEntity.ok(eventService.getTodayEventByRoomId(room_id));
    }

    @GetMapping("roomSettings/weekGraph")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> getWeekEvents(@RequestHeader("Authorization") String token,
            @RequestParam(name = "room_id", required = true) Long room_id) {
        return ResponseEntity.ok(eventService.getWeekEventByRoomId(room_id));
    }

    @GetMapping("roomSettings/monthGraph")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> getMonthEvents(@RequestHeader("Authorization") String token,
            @RequestParam(name = "room_id", required = true) Long room_id) {
        return ResponseEntity.ok(eventService.getMonthEventByRoomId(room_id));
    }
}
