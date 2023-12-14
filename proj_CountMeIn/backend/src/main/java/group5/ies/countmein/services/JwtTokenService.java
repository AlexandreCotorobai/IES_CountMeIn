package group5.ies.countmein.services;

public interface JwtTokenService {
    String generateToken(String email);

    boolean validateToken(String token);

    String getEmailFromToken(String token);
}
