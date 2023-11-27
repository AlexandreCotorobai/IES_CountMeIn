package group5.ies.countmein.services;

import java.util.Optional;

import group5.ies.countmein.entities.Admin;

public interface AdminService { // AuthenticationService?
    Optional<Admin> authenticate(String email, String password);
}