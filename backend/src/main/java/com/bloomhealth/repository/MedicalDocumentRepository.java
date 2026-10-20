package com.bloomhealth.repository;

import com.bloomhealth.model.MedicalDocument;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public class MedicalDocumentRepository {

    private final JdbcTemplate jdbcTemplate;

    public MedicalDocumentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<MedicalDocument> DOCUMENT_ROW_MAPPER = new RowMapper<MedicalDocument>() {
        @Override
        public MedicalDocument mapRow(ResultSet rs, int rowNum) throws SQLException {
            Timestamp createdTs = rs.getTimestamp("created_at");
            return new MedicalDocument(
                    rs.getString("id"),
                    rs.getString("user_id"),
                    rs.getString("original_filename"),
                    rs.getString("content_type"),
                    rs.getLong("size_bytes"),
                    rs.getString("processing_status"),
                    createdTs != null ? createdTs.toInstant() : Instant.now()
            );
        }
    };

    public void save(MedicalDocument doc) {
        String sql = """
                INSERT INTO medical_documents (id, user_id, original_filename, content_type, size_bytes, processing_status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT (id) DO UPDATE SET
                    processing_status = EXCLUDED.processing_status
                """;
        jdbcTemplate.update(
                sql,
                doc.id(),
                doc.userId(),
                doc.originalFilename(),
                doc.contentType(),
                doc.sizeBytes(),
                doc.processingStatus(),
                Timestamp.from(doc.createdAt())
        );
    }

    public Optional<MedicalDocument> findById(String id) {
        String sql = "SELECT id, user_id, original_filename, content_type, size_bytes, processing_status, created_at FROM medical_documents WHERE id = ?";
        try {
            MedicalDocument doc = jdbcTemplate.queryForObject(sql, DOCUMENT_ROW_MAPPER, id);
            return Optional.ofNullable(doc);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<MedicalDocument> findByUserId(String userId) {
        String sql = "SELECT id, user_id, original_filename, content_type, size_bytes, processing_status, created_at FROM medical_documents WHERE user_id = ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, DOCUMENT_ROW_MAPPER, userId);
    }

    public void updateStatus(String id, String status) {
        String sql = "UPDATE medical_documents SET processing_status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, id);
    }
}
