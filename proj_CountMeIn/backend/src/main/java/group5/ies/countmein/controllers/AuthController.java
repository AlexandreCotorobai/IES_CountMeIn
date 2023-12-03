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

import group5.ies.countmein.entities.Admin;
import group5.ies.countmein.entities.auth.LoginRequest;
import group5.ies.countmein.entities.auth.LoginResponse;
import group5.ies.countmein.services.impl.AuthServiceImpl;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AuthController {
    private AuthServiceImpl authService;

    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody Admin admin) {
    // Optional<Admin> authenticatedAdmin =
    // adminService.authenticate(admin.getEmail(), admin.getPassword());
    // try {
    // if (authenticatedAdmin.isPresent()) {
    // return new ResponseEntity<>("Login successful", HttpStatus.OK);
    // } else {
    // return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    // }
    // } catch (Exception e) {
    // System.out.println(e.getMessage());
    // System.out.println(e.getCause());
    // System.out.println(e.getLocalizedMessage());
    // throw new BadCredentialsException("Invalid credentials");
    // }
    // }

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

    @GetMapping("/me")
    @PreAuthorize("@authServiceImpl.isAuthenticated(#token)")
    public ResponseEntity<Object> me(@RequestHeader("Authorization") String token) {
        Admin admin = authService.currentAdmin(token);
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
