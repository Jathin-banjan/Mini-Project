package com.heritageai.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heritageai.backend.dto.ArtifactDTOs.ArtifactCreateRequest;
import com.heritageai.backend.dto.AuthDTOs.LoginRequest;
import com.heritageai.backend.dto.AuthDTOs.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HeritageAiBackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void contextLoads() {
	}

	@Test
	void testLoginDefaultAdmin() throws Exception {
		LoginRequest request = new LoginRequest("admin", "AdminPass123!");

		mockMvc.perform(post("/api/auth/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").exists())
				.andExpect(jsonPath("$.user.username").value("admin"));
	}

	@Test
	void testUserRegistration() throws Exception {
		RegisterRequest request = new RegisterRequest(
				"testuser",
				"test@heritage.org",
				"Password123!",
				"Test Researcher",
				"Heritage Dept"
		);

		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").exists())
				.andExpect(jsonPath("$.user.username").value("testuser"));
	}

	@Test
	void testCreateAndGetArtifact() throws Exception {
		ArtifactCreateRequest createRequest = ArtifactCreateRequest.builder()
				.title("Warli Ritual Wall Painting")
				.culturalCategory("warli")
				.region("Thane, Maharashtra")
				.artifactType("Wall Painting")
				.description("Traditional Warli motif depicting Tarpa dance circle and harvest celebration.")
				.creatorAttribution("Jivya Soma Mashe Community")
				.sourceLicense("CC-BY-SA-4.0")
				.creationPeriod("Circa 1980s")
				.build();

		mockMvc.perform(post("/api/artifacts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(createRequest)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.title").value("Warli Ritual Wall Painting"))
				.andExpect(jsonPath("$.culturalCategory").value("warli"));

		mockMvc.perform(get("/api/artifacts")
				.param("category", "warli"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.content").isArray());
	}

	@Test
	void testResearchSummaryEndpoint() throws Exception {
		mockMvc.perform(get("/api/research/summary"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.totalStoredArtifacts").exists())
				.andExpect(jsonPath("$.categoryDistribution").exists());
	}
}
