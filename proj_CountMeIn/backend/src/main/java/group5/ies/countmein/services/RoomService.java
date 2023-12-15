package group5.ies.countmein.services;


public interface  RoomService {
    boolean updateRoomSettings(long id, int maxCount, boolean locked);
}
