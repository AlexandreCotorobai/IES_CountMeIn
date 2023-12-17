package group5.ies.countmein.entities.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class RoomSettingsRequest {
    private Long roomId;
    private int maxCapacity;
    private boolean locked;

    // Getters and setters...
}
