package com.heritageai.backend.service;

import com.heritageai.backend.dto.AdminDTOs.AuditLogDTO;
import com.heritageai.backend.model.AuditLog;
import com.heritageai.backend.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    @Transactional
    public void logAction(String userId, String username, String action, String entityType, String entityId, String details) {
        AuditLog log = AuditLog.builder()
                .id(UUID.randomUUID().toString())
                .userId(userId)
                .username(username)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .details(details)
                .build();
        auditLogRepository.save(log);
    }

    public Page<AuditLogDTO> getAuditLogs(int page, int size) {
        Page<AuditLog> pageResult = auditLogRepository.findAllByOrderByTimestampDesc(PageRequest.of(page, size));
        return pageResult.map(log -> AuditLogDTO.builder()
                .id(log.getId())
                .userId(log.getUserId())
                .username(log.getUsername())
                .action(log.getAction())
                .entityType(log.getEntityType())
                .entityId(log.getEntityId())
                .details(log.getDetails())
                .timestamp(log.getTimestamp())
                .build());
    }
}
