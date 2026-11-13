package com.heritageai.backend.controller;

import com.heritageai.backend.dto.ArtifactDTOs.*;
import com.heritageai.backend.service.ArtifactService;
import com.heritageai.backend.service.AuditService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artifacts")
@RequiredArgsConstructor
public class ArtifactController {

    private final ArtifactService artifactService;
    private final AuditService auditService;

    @PostMapping
    public ResponseEntity<ArtifactResponseDTO> createArtifact(@Valid @RequestBody ArtifactCreateRequest request, Authentication authentication) {
        ArtifactResponseDTO created = artifactService.createArtifact(request);
        String username = authentication != null ? authentication.getName() : "ANONYMOUS";
        auditService.logAction(null, username, "CREATE_ARTIFACT", "CULTURAL_ARTIFACT", created.getId(), "Artifact created: " + created.getTitle());
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<Page<ArtifactResponseDTO>> getArtifacts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<ArtifactResponseDTO> artifacts = artifactService.getArtifacts(category, region, search, page, size, sortBy, sortDir);
        return ResponseEntity.ok(artifacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtifactResponseDTO> getArtifactById(@PathVariable String id) {
        return ResponseEntity.ok(artifactService.getArtifactById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtifactResponseDTO> updateArtifact(@PathVariable String id, @Valid @RequestBody ArtifactCreateRequest request, Authentication authentication) {
        ArtifactResponseDTO updated = artifactService.updateArtifact(id, request);
        String username = authentication != null ? authentication.getName() : "ANONYMOUS";
        auditService.logAction(null, username, "UPDATE_ARTIFACT", "CULTURAL_ARTIFACT", updated.getId(), "Updated artifact details: " + updated.getTitle());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteArtifact(@PathVariable String id, Authentication authentication) {
        artifactService.deleteArtifact(id);
        String username = authentication != null ? authentication.getName() : "ADMIN";
        auditService.logAction(null, username, "DELETE_ARTIFACT", "CULTURAL_ARTIFACT", id, "Deleted artifact id: " + id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export/csv")
    public ResponseEntity<String> exportCsv() {
        String csvData = artifactService.exportCsv();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"heritageai_artifacts_catalog.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvData);
    }
}
