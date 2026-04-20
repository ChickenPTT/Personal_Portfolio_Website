package com.portfolio.contact.controller;

import com.portfolio.contact.dto.ContactRequest;
import com.portfolio.contact.dto.ContactResponse;
import com.portfolio.contact.service.EmailService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactResponse> sendContactEmail(
            @Valid @RequestBody ContactRequest request) {
        try {
            emailService.sendContactEmail(request);
            return ResponseEntity.ok(
                    ContactResponse.success("Message sent successfully! I'll get back to you soon."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ContactResponse.error("Failed to send message. Please try again later."));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<ContactResponse> healthCheck() {
        return ResponseEntity.ok(ContactResponse.success("API is running!"));
    }
}
