package group5.ies.countmein.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import group5.ies.countmein.entities.Admin;
import group5.ies.countmein.repositories.AdminRepository;
import group5.ies.countmein.services.AdminService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
    private AdminRepository adminRepository;

    @Override
    public Optional<Admin> authenticate(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

}
