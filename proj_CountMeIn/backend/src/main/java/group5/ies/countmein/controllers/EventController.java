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
@RequestMapping("/api")
public class EventController {
    private EventServiceImpl eventService;

    @GetMapping("roomSettings/todayGraph")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> getTodayEvents(@RequestHeader("Authorization") String token,
            @RequestParam(name = "roomId", required = true) Long roomId) {
        return ResponseEntity.ok(eventService.getTodayEventByRoomId(roomId));
    }

    @GetMapping("roomSettings/weekGraph")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> getWeekEvents(@RequestHeader("Authorization") String token,
            @RequestParam(name = "roomId", required = true) Long roomId) {
        return ResponseEntity.ok(eventService.getWeekEventByRoomId(roomId));
    }

    @GetMapping("roomSettings/monthGraph")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> getMonthEvents(@RequestHeader("Authorization") String token,
            @RequestParam(name = "roomId", required = true) Long roomId) {
        return ResponseEntity.ok(eventService.getMonthEventByRoomId(roomId));
    }
}
