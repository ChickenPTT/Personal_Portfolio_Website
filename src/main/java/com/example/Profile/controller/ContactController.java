package com.example.Profile.controller;

import com.example.Profile.Model.ContactRequest;
import com.example.Profile.Model.ContactResponse;
import com.example.Profile.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
@RestController
@EnableAsync
@RequestMapping("/api")
@CrossOrigin(origins = "https://myportfolio.com")
public class ContactController {
    private EmailService emailService;
    public ContactController(EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactResponse> sendContactEmail
            (@Valid @RequestBody ContactRequest request)
    {
        try {
            emailService.sendContactEmail(request);
            return ResponseEntity.ok(
                    ContactResponse.success("Message sent successfully! I'll get back to you soon."));
        } catch (MessagingException e) {
            log.error("Failed to send contact email", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(ContactResponse.error("Email service temporarily unavailable."));
        }
    }
    @GetMapping("/health")
    public ResponseEntity<ContactResponse> healthCheck() {
        return ResponseEntity.ok(ContactResponse.success("API is running!"));
    }

}
