package group5.ies.countmein.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group5.ies.countmein.services.impl.RoomServiceImpl;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class RoomController  {
    private RoomServiceImpl roomService;

    @PutMapping("roomSettings/update")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> updateRoomSettings(@RequestHeader("Authorization") String token,
            @RequestParam(name = "roomId", required = true) Long roomId,
            @RequestParam(name = "maxCount", required = true) int maxCount,
            @RequestParam(name = "locked", required = true) boolean locked) {
        return ResponseEntity.ok(roomService.updateRoomSettings(roomId, maxCount, locked));
    }
}
