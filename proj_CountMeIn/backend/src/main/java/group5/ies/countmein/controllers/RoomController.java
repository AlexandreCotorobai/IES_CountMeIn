package group5.ies.countmein.controllers;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.kafka.core.KafkaTemplate;

import group5.ies.countmein.services.impl.RoomServiceImpl;
import lombok.AllArgsConstructor;
import group5.ies.countmein.entities.room.RoomSettingsRequest;


@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class RoomController  {
    private RoomServiceImpl roomService;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @PutMapping("/roomSettings/update")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> updateRoomSettings(@RequestHeader("Authorization") String token,
            @RequestBody RoomSettingsRequest roomSettingsRequest) {
        boolean isUpdated = roomService.updateRoomSettings(roomSettingsRequest.getRoomId(), roomSettingsRequest.getMaxCapacity(), roomSettingsRequest.isLocked());
        if (!isUpdated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(APPLICATION_JSON)
                    .body("Failed to update room settings");
        }
        // Send a message to Kafka topic "roomupdates"
        String message = String.format("{\"roomId\": %d, \"maxCount\": %d, \"locked\": %b}", 
        roomSettingsRequest.getRoomId(), roomSettingsRequest.getMaxCapacity(), roomSettingsRequest.isLocked());
        
        kafkaTemplate.send("roomupdates", message);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(APPLICATION_JSON)
                .body("Room settings updated successfully");
}
}
