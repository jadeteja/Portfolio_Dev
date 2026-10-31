package com.jadeteja.portfolio.repository;

import com.jadeteja.portfolio.entity.PricingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PricingPlanRepository extends JpaRepository<PricingPlan, UUID> {
    List<PricingPlan> findAllByActiveTrue();
    Optional<PricingPlan> findByServiceType(String serviceType);
}
