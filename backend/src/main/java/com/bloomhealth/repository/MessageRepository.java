package com.bloomhealth.repository;

import com.bloomhealth.model.Message;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public class MessageRepository {

    private final JdbcTemplate jdbcTemplate;

    public MessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Message> MESSAGE_ROW_MAPPER = new RowMapper<Message>() {
        @Override
        public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
            Timestamp createdTs = rs.getTimestamp("created_at");
            return new Message(
                    rs.getString("id"),
                    rs.getString("conversation_id"),
                    rs.getString("role"),
                    rs.getString("content"),
                    createdTs != null ? createdTs.toInstant() : Instant.now()
            );
        }
    };

    public void save(Message message) {
        String sql = """
                INSERT INTO messages (id, conversation_id, role, content, created_at)
                VALUES (?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(
                sql,
                message.id(),
                message.conversationId(),
                message.role(),
                message.content(),
                Timestamp.from(message.createdAt())
        );
    }

    public List<Message> findByConversationId(String conversationId) {
        String sql = "SELECT id, conversation_id, role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at ASC";
        return jdbcTemplate.query(sql, MESSAGE_ROW_MAPPER, conversationId);
    }

    public void deleteByConversationId(String conversationId) {
        String sql = "DELETE FROM messages WHERE conversation_id = ?";
        jdbcTemplate.update(sql, conversationId);
    }
}
