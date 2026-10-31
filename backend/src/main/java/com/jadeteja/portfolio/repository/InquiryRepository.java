package com.jadeteja.portfolio.repository;

import com.jadeteja.portfolio.entity.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, UUID> {
    Page<Inquiry> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(String status);
}
