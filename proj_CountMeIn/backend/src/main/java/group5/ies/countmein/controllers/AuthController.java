package group5.ies.countmein.controllers;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group5.ies.countmein.entities.auth.LoginRequest;
import group5.ies.countmein.entities.auth.LoginResponse;
import group5.ies.countmein.entities.dto.AdminDTO;
import group5.ies.countmein.services.impl.AuthServiceImpl;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/")
public class AuthController {
    private AuthServiceImpl authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(APPLICATION_JSON)
                    .body("Invalid credentials");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(APPLICATION_JSON)
                .body(response);
    }

    @GetMapping("/user")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> me(@RequestHeader("Authorization") String token) {
        AdminDTO admin = authService.currentAdmin(token);
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(APPLICATION_JSON)
                    .body("Admin not found");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(APPLICATION_JSON)
                .body(admin);
    }

}
