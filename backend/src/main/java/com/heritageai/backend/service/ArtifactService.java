package com.heritageai.backend.service;

import com.heritageai.backend.dto.ArtifactDTOs.*;
import com.heritageai.backend.model.ArtifactImage;
import com.heritageai.backend.model.CulturalArtifact;
import com.heritageai.backend.repository.ArtifactImageRepository;
import com.heritageai.backend.repository.CulturalArtifactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtifactService {

    private final CulturalArtifactRepository artifactRepository;
    private final ArtifactImageRepository imageRepository;

    @Transactional
    public ArtifactResponseDTO createArtifact(ArtifactCreateRequest request) {
        CulturalArtifact artifact = CulturalArtifact.builder()
                .id(UUID.randomUUID().toString())
                .title(request.getTitle())
                .culturalCategory(request.getCulturalCategory())
                .verifiedCategory(request.getVerifiedCategory())
                .region(request.getRegion())
                .artifactType(request.getArtifactType())
                .description(request.getDescription())
                .creatorAttribution(request.getCreatorAttribution())
                .sourceLicense(request.getSourceLicense())
                .creationPeriod(request.getCreationPeriod())
                .reviewStatus(request.getVerifiedCategory() != null ? "VERIFIED" : "UNREVIEWED")
                .build();

        if (request.getImageId() != null) {
            ArtifactImage img = imageRepository.findById(request.getImageId()).orElse(null);
            if (img != null) {
                img.setArtifact(artifact);
                artifact.getImages().add(img);
            }
        }

        CulturalArtifact saved = artifactRepository.save(artifact);
        return mapToDTO(saved);
    }

    public Page<ArtifactResponseDTO> getArtifacts(String category, String region, String search, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<CulturalArtifact> artifactPage = artifactRepository.findFiltered(category, region, search, pageable);
        return artifactPage.map(this::mapToDTO);
    }

    public ArtifactResponseDTO getArtifactById(String id) {
        CulturalArtifact artifact = artifactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artifact not found with id " + id));
        return mapToDTO(artifact);
    }

    @Transactional
    public ArtifactResponseDTO updateArtifact(String id, ArtifactCreateRequest request) {
        CulturalArtifact artifact = artifactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artifact not found with id " + id));

        artifact.setTitle(request.getTitle());
        artifact.setCulturalCategory(request.getCulturalCategory());
        if (request.getVerifiedCategory() != null) {
            artifact.setVerifiedCategory(request.getVerifiedCategory());
            artifact.setReviewStatus("VERIFIED");
        }
        artifact.setRegion(request.getRegion());
        artifact.setArtifactType(request.getArtifactType());
        artifact.setDescription(request.getDescription());
        artifact.setCreatorAttribution(request.getCreatorAttribution());
        artifact.setSourceLicense(request.getSourceLicense());
        artifact.setCreationPeriod(request.getCreationPeriod());

        CulturalArtifact updated = artifactRepository.save(artifact);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteArtifact(String id) {
        if (!artifactRepository.existsById(id)) {
            throw new RuntimeException("Artifact not found with id " + id);
        }
        artifactRepository.deleteById(id);
    }

    public String exportCsv() {
        List<CulturalArtifact> list = artifactRepository.findAll();
        StringBuilder sb = new StringBuilder();
        sb.append("ID,Title,Category,VerifiedCategory,Region,Type,ReviewStatus,CreationPeriod,Attribution,License\n");
        for (CulturalArtifact a : list) {
            sb.append(String.format("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                    a.getId(),
                    escapeCsv(a.getTitle()),
                    a.getCulturalCategory(),
                    a.getVerifiedCategory() != null ? a.getVerifiedCategory() : "",
                    escapeCsv(a.getRegion()),
                    escapeCsv(a.getArtifactType()),
                    a.getReviewStatus(),
                    escapeCsv(a.getCreationPeriod()),
                    escapeCsv(a.getCreatorAttribution()),
                    escapeCsv(a.getSourceLicense())
            ));
        }
        return sb.toString();
    }

    private String escapeCsv(String input) {
        if (input == null) return "";
        return input.replace("\"", "\"\"");
    }

    public ArtifactResponseDTO mapToDTO(CulturalArtifact a) {
        ImageDTO mainImageDto = null;
        if (a.getImages() != null && !a.getImages().isEmpty()) {
            ArtifactImage img = a.getImages().get(0);
            mainImageDto = ImageDTO.builder()
                    .id(img.getId())
                    .originalFilename(img.getOriginalFilename())
                    .storageUrl("/uploads/" + img.getStorageKey())
                    .mimeType(img.getMimeType())
                    .fileSize(img.getFileSize())
                    .width(img.getWidth())
                    .height(img.getHeight())
                    .build();
        }

        return ArtifactResponseDTO.builder()
                .id(a.getId())
                .title(a.getTitle())
                .culturalCategory(a.getCulturalCategory())
                .verifiedCategory(a.getVerifiedCategory())
                .region(a.getRegion())
                .artifactType(a.getArtifactType())
                .description(a.getDescription())
                .creatorAttribution(a.getCreatorAttribution())
                .sourceLicense(a.getSourceLicense())
                .creationPeriod(a.getCreationPeriod())
                .reviewStatus(a.getReviewStatus())
                .mainImage(mainImageDto)
                .createdAt(a.getCreatedAt())
                .updatedAt(a.getUpdatedAt())
                .build();
    }
}
