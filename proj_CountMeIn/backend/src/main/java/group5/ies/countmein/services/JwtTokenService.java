package group5.ies.countmein.services;

public interface JwtTokenService {
    String generateToken(String email);
}
