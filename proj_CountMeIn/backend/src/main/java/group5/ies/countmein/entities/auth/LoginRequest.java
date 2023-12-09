package group5.ies.countmein.entities.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class LoginRequest {
    private String email;
    private String password;
}
