package com.bloomhealth.repository;

import com.bloomhealth.model.Conversation;
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
public class ConversationRepository {

    private final JdbcTemplate jdbcTemplate;

    public ConversationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Conversation> CONVERSATION_ROW_MAPPER = new RowMapper<Conversation>() {
        @Override
        public Conversation mapRow(ResultSet rs, int rowNum) throws SQLException {
            Timestamp createdTs = rs.getTimestamp("created_at");
            Timestamp updatedTs = rs.getTimestamp("updated_at");
            return new Conversation(
                    rs.getString("id"),
                    rs.getString("user_id"),
                    rs.getString("title"),
                    rs.getString("language"),
                    createdTs != null ? createdTs.toInstant() : Instant.now(),
                    updatedTs != null ? updatedTs.toInstant() : Instant.now()
            );
        }
    };

    public void save(Conversation conversation) {
        String sql = """
                INSERT INTO conversations (id, user_id, title, language, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    language = EXCLUDED.language,
                    updated_at = EXCLUDED.updated_at
                """;
        jdbcTemplate.update(
                sql,
                conversation.id(),
                conversation.userId(),
                conversation.title(),
                conversation.language(),
                Timestamp.from(conversation.createdAt()),
                Timestamp.from(conversation.updatedAt())
        );
    }

    public Optional<Conversation> findById(String id) {
        String sql = "SELECT id, user_id, title, language, created_at, updated_at FROM conversations WHERE id = ?";
        try {
            Conversation conv = jdbcTemplate.queryForObject(sql, CONVERSATION_ROW_MAPPER, id);
            return Optional.ofNullable(conv);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Conversation> findByUserId(String userId) {
        String sql = "SELECT id, user_id, title, language, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC";
        return jdbcTemplate.query(sql, CONVERSATION_ROW_MAPPER, userId);
    }

    public void updateTitle(String id, String title) {
        String sql = "UPDATE conversations SET title = ?, updated_at = ? WHERE id = ?";
        jdbcTemplate.update(sql, title, Timestamp.from(Instant.now()), id);
    }

    public void touch(String id) {
        String sql = "UPDATE conversations SET updated_at = ? WHERE id = ?";
        jdbcTemplate.update(sql, Timestamp.from(Instant.now()), id);
    }

    public void deleteById(String id) {
        String sql = "DELETE FROM conversations WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
