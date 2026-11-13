package com.heritageai.backend;

import com.heritageai.backend.model.Role;
import com.heritageai.backend.model.User;
import com.heritageai.backend.repository.RoleRepository;
import com.heritageai.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;
import java.util.UUID;

@SpringBootApplication
public class HeritageAiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeritageAiBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner initDefaultUsers(UserRepository userRepository, 
											 RoleRepository roleRepository, 
											 PasswordEncoder passwordEncoder) {
		return args -> {
			Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> 
				roleRepository.save(Role.builder().id("role-admin-01").name("ROLE_ADMIN").build())
			);
			Role researcherRole = roleRepository.findByName("ROLE_RESEARCHER").orElseGet(() -> 
				roleRepository.save(Role.builder().id("role-researcher-02").name("ROLE_RESEARCHER").build())
			);
			Role archivistRole = roleRepository.findByName("ROLE_ARCHIVIST").orElseGet(() -> 
				roleRepository.save(Role.builder().id("role-archivist-03").name("ROLE_ARCHIVIST").build())
			);

			// Seed Admin User
			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = User.builder()
						.id(UUID.randomUUID().toString())
						.username("admin")
						.email("admin@heritageai.org")
						.passwordHash(passwordEncoder.encode("AdminPass123!"))
						.fullName("System Administrator")
						.institution("HeritageAI Cultural Research Lab")
						.enabled(true)
						.roles(Set.of(adminRole, researcherRole, archivistRole))
						.build();
				userRepository.save(admin);
				System.out.println("[Backend Seeder] Initialized default admin user ('admin' / 'AdminPass123!')");
			}

			// Seed Researcher User
			if (userRepository.findByUsername("researcher").isEmpty()) {
				User researcher = User.builder()
						.id(UUID.randomUUID().toString())
						.username("researcher")
						.email("researcher@heritageai.org")
						.passwordHash(passwordEncoder.encode("Research123!"))
						.fullName("Dr. Ananya Sharma")
						.institution("National Institute of Heritage & Fine Arts")
						.enabled(true)
						.roles(Set.of(researcherRole))
						.build();
				userRepository.save(researcher);
				System.out.println("[Backend Seeder] Initialized default researcher user ('researcher' / 'Research123!')");
			}
		};
	}
}
