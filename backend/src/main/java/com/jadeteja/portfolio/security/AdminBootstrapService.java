package com.jadeteja.portfolio.security;

import com.jadeteja.portfolio.entity.AdminUser;
import com.jadeteja.portfolio.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminBootstrapService {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrapService.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.initial-email:jade.teja@gmail.com}")
    private String initialEmail;

    @Value("${app.admin.initial-password:Admin@JadeTeja2026!}")
    private String initialPassword;

    public AdminBootstrapService(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void bootstrapAdmin() {
        if (adminUserRepository.count() == 0) {
            log.info("No administrative users found. Bootstrapping default administrator: {}", initialEmail);
            String encodedPassword = passwordEncoder.encode(initialPassword);
            AdminUser admin = new AdminUser(initialEmail, encodedPassword, "ROLE_ADMIN");
            adminUserRepository.save(admin);
            log.info("Administrator account bootstrapped successfully.");
        }
    }
}
