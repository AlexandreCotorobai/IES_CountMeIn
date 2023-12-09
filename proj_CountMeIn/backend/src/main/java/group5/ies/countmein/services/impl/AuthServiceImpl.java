package group5.ies.countmein.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import group5.ies.countmein.entities.Admin;
import group5.ies.countmein.entities.auth.LoginRequest;
import group5.ies.countmein.entities.auth.LoginResponse;
import group5.ies.countmein.entities.dto.AdminDTO;
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
            return new LoginResponse(token);
        }
        return null;
    }

    public Boolean isAuthenticated(String tokenRequest) {
        String token = tokenRequest.replace("Bearer ", "");
        if (whiteList.isEmpty()) {
            return false;
        }
        String email = jwtTokenService.getEmailFromToken(token);
        if (!jwtTokenService.validateToken(token) || !whiteList.containsKey(email)) {
            return false;
        }
        return whiteList.get(email).equals(token);
    }

    public AdminDTO currentAdmin(String tokenRequest) {
        String token = tokenRequest.replace("Bearer ", "");
        String email = jwtTokenService.getEmailFromToken(token);
        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin != null) {
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(admin, AdminDTO.class);
        }

        return null;
    }

}
