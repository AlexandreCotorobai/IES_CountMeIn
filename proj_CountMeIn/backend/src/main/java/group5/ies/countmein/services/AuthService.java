package group5.ies.countmein.services;

import group5.ies.countmein.entities.auth.LoginRequest;
import group5.ies.countmein.entities.auth.LoginResponse;
import group5.ies.countmein.entities.dto.AdminDTO;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);

    Boolean isAuthenticated(String token);

    AdminDTO currentAdmin(String token);
}