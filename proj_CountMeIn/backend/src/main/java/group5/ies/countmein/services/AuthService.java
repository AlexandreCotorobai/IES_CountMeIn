package group5.ies.countmein.services;

import group5.ies.countmein.entities.auth.LoginRequest;
import group5.ies.countmein.entities.auth.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}