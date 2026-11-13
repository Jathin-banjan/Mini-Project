package com.heritageai.backend.repository;

import com.heritageai.backend.model.CulturalArtifact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CulturalArtifactRepository extends JpaRepository<CulturalArtifact, String> {
    
    @Query("SELECT a FROM CulturalArtifact a WHERE " +
           "(:category IS NULL OR a.culturalCategory = :category) AND " +
           "(:region IS NULL OR LOWER(a.region) LIKE LOWER(CONCAT('%', :region, '%'))) AND " +
           "(:search IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(a.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<CulturalArtifact> findFiltered(
        @Param("category") String category,
        @Param("region") String region,
        @Param("search") String search,
        Pageable pageable
    );

    long countByCulturalCategory(String category);

    long countByReviewStatus(String reviewStatus);
}
