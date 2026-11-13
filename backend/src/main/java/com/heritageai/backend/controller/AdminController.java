package com.heritageai.backend.controller;

import com.heritageai.backend.dto.AdminDTOs.*;
import com.heritageai.backend.dto.AuthDTOs.UserDTO;
import com.heritageai.backend.model.Dataset;
import com.heritageai.backend.model.Role;
import com.heritageai.backend.repository.DatasetRepository;
import com.heritageai.backend.repository.UserRepository;
import com.heritageai.backend.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final DatasetRepository datasetRepository;
    private final UserRepository userRepository;
    private final AuditService auditService;

    @GetMapping("/datasets")
    public ResponseEntity<List<DatasetDTO>> getDatasets() {
        List<Dataset> list = datasetRepository.findAll();
        List<DatasetDTO> dtos = list.stream().map(d -> DatasetDTO.builder()
                .id(d.getId())
                .datasetName(d.getDatasetName())
                .version(d.getVersion())
                .description(d.getDescription())
                .sampleCount(d.getSampleCount())
                .licenseInfo(d.getLicenseInfo())
                .sourceReference(d.getSourceReference())
                .createdAt(d.getCreatedAt())
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/datasets")
    public ResponseEntity<DatasetDTO> createDataset(@RequestBody DatasetDTO dto, Authentication authentication) {
        Dataset dataset = Dataset.builder()
                .id(UUID.randomUUID().toString())
                .datasetName(dto.getDatasetName())
                .version(dto.getVersion())
                .description(dto.getDescription())
                .sampleCount(dto.getSampleCount())
                .licenseInfo(dto.getLicenseInfo())
                .sourceReference(dto.getSourceReference())
                .build();
        Dataset saved = datasetRepository.save(dataset);

        String username = authentication != null ? authentication.getName() : "ADMIN";
        auditService.logAction(null, username, "REGISTER_DATASET", "DATASET", saved.getId(), "Registered dataset: " + saved.getDatasetName());

        dto.setId(saved.getId());
        dto.setCreatedAt(saved.getCreatedAt());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<Page<AuditLogDTO>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(auditService.getAuditLogs(page, size));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> users = userRepository.findAll().stream().map(user -> UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .institution(user.getInstitution())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }
}
