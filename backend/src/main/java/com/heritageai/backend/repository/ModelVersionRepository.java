package com.heritageai.backend.repository;

import com.heritageai.backend.model.ModelVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModelVersionRepository extends JpaRepository<ModelVersion, String> {
    Optional<ModelVersion> findByVersionTag(String versionTag);
    Optional<ModelVersion> findByIsActiveTrue();
}
