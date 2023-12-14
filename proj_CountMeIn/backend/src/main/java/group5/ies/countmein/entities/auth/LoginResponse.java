package group5.ies.countmein.entities.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
}
