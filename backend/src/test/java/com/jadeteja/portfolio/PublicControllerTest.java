package com.jadeteja.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jadeteja.portfolio.dto.InquiryDto;
import com.jadeteja.portfolio.service.PublicService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PublicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PublicService publicService;

    @Test
    void testGetServices() throws Exception {
        when(publicService.getActiveServices()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/public/services"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void testSubmitInquiry_Success() throws Exception {
        InquiryDto.CreateRequest request = new InquiryDto.CreateRequest();
        request.setFullName("John Doe");
        request.setEmail("john@example.com");
        request.setPhone("+91 9876543210");
        request.setProjectType("Website Development");
        request.setProjectName("Custom Store");
        request.setDescription("Need an online store.");
        request.setConsentGiven(true);

        InquiryDto.Response response = new InquiryDto.Response();
        response.setId(UUID.randomUUID());
        response.setFullName("John Doe");
        response.setEmail("john@example.com");
        response.setStatus("NEW");
        response.setCreatedAt(OffsetDateTime.now());

        when(publicService.submitInquiry(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/public/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.fullName").value("John Doe"));
    }

    @Test
    void testSubmitInquiry_ValidationFailure() throws Exception {
        InquiryDto.CreateRequest request = new InquiryDto.CreateRequest();
        // Missing required fields

        mockMvc.perform(post("/api/v1/public/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
