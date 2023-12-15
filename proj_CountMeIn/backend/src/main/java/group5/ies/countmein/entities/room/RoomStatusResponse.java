package group5.ies.countmein.entities.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class RoomStatusResponse {
    private int currentOccupancy;
    private int maxCapacity;
}
