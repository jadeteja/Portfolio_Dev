package com.jadeteja.portfolio.repository;

import com.jadeteja.portfolio.entity.AdditionalCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdditionalChargeRepository extends JpaRepository<AdditionalCharge, UUID> {
    List<AdditionalCharge> findAllByActiveTrueOrderByDisplayOrderAsc();
    List<AdditionalCharge> findAllByOrderByDisplayOrderAsc();
}
