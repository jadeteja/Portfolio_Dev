package com.jadeteja.portfolio.repository;

import com.jadeteja.portfolio.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    Optional<Project> findBySlugAndPublishedTrue(String slug);
    Optional<Project> findBySlug(String slug);

    List<Project> findAllByPublishedTrueOrderByDisplayOrderAsc();

    @Query("SELECT p FROM Project p WHERE p.published = true AND (:category IS NULL OR LOWER(p.category) = LOWER(:category)) ORDER BY p.displayOrder ASC")
    List<Project> findPublishedByCategory(@Param("category") String category);

    Page<Project> findAllByOrderByDisplayOrderAsc(Pageable pageable);

    long countByPublishedTrue();
}
