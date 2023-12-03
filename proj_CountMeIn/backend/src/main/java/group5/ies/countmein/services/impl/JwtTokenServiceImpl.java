package group5.ies.countmein.services.impl;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group5.ies.countmein.config.JwtConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenServiceImpl {

    private final JwtConfig jwtConfig;
    private final Key jwtKey;

    @Autowired
    public JwtTokenServiceImpl(JwtConfig jwtConfig, Key jwtKey) {
        this.jwtConfig = jwtConfig;
        this.jwtKey = jwtKey;
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtConfig.getExpiration() * 1000L);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtKey, SignatureAlgorithm.HS512)
                .compact();
    }
}
