package com.jadeteja.portfolio.repository;

import com.jadeteja.portfolio.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, UUID> {
    List<ProjectImage> findByProjectIdOrderByDisplayOrderAsc(UUID projectId);
}
