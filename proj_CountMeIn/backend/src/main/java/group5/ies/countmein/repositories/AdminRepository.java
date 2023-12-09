package group5.ies.countmein.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import group5.ies.countmein.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
