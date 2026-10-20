package com.bloomhealth.config;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class FlywayMigrationConfig {

    private static final Logger log = LoggerFactory.getLogger(FlywayMigrationConfig.class);

    @Bean
    public CommandLineRunner runFlywayMigrations(DataSource dataSource) {
        return args -> {
            log.info("Checking PostgreSQL database connectivity for Flyway migrations...");
            try (Connection conn = dataSource.getConnection()) {
                log.info("Successfully connected to PostgreSQL at {}. Running Flyway migrations...", conn.getMetaData().getURL());
                Flyway flyway = Flyway.configure()
                        .dataSource(dataSource)
                        .locations("classpath:db/migration")
                        .baselineOnMigrate(true)
                        .load();
                int applied = flyway.migrate().migrationsExecuted;
                log.info("Flyway migration complete. Executed {} migration(s).", applied);
            } catch (Exception e) {
                log.warn("PostgreSQL is not currently reachable: {}. " +
                        "Database persistence will be pending until PostgreSQL is started on localhost:5432.", e.getMessage());
            }
        };
    }
}
