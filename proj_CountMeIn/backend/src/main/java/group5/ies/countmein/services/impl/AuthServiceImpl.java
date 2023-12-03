package group5.ies.countmein.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import group5.ies.countmein.entities.Admin;
import group5.ies.countmein.entities.auth.LoginRequest;
import group5.ies.countmein.entities.auth.LoginResponse;
import group5.ies.countmein.repositories.AdminRepository;
import group5.ies.countmein.services.AuthService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private AdminRepository adminRepository;
    private JwtTokenServiceImpl jwtTokenService;

    private static final Map<String, String> whiteList = new HashMap<>();

    public LoginResponse login(LoginRequest loginRequest) {
        Admin admin = adminRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (admin != null && admin.checkPassword(loginRequest.getPassword())) {
            String token = jwtTokenService.generateToken(loginRequest.getEmail());
            whiteList.put(admin.getEmail(), token);
            System.out.println("Login successful");
            return new LoginResponse(token);
        }
        System.out.println("Invalid credentials");
        return null;
    }

}
