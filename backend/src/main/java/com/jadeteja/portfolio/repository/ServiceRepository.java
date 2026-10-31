package com.jadeteja.portfolio.repository;

import com.jadeteja.portfolio.entity.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceItem, UUID> {
    List<ServiceItem> findAllByActiveTrueOrderByDisplayOrderAsc();
    List<ServiceItem> findAllByOrderByDisplayOrderAsc();
    Optional<ServiceItem> findBySlug(String slug);
    long countByActiveTrue();
}
