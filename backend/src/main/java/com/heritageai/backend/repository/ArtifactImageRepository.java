package com.heritageai.backend.repository;

import com.heritageai.backend.model.ArtifactImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtifactImageRepository extends JpaRepository<ArtifactImage, String> {
}
