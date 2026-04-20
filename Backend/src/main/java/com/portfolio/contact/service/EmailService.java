package com.portfolio.contact.service;

import com.portfolio.contact.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${contact.email.to}")
    private String toEmail;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(ContactRequest request) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setFrom(fromEmail);
        helper.setReplyTo(request.getEmail());
        helper.setSubject("[Portfolio Contact] " + request.getSubject());

        String htmlContent = buildEmailContent(request);
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

    // email body
    private String buildEmailContent(ContactRequest request) {
        return """
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; border-radius: 8px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #c5f82a, #8bc34a); padding: 24px 32px;">
                        <h1 style="margin: 0; color: #0a0a0a; font-size: 20px;">📬 New Contact Message</h1>
                    </div>
                    <div style="padding: 32px;">
                        <table style="width: 100%%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #a0a0a0; width: 100px;">Name</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #a0a0a0;">Email</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a;">
                                    <a href="mailto:%s" style="color: #c5f82a;">%s</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #a0a0a0;">Subject</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff;">%s</td>
                            </tr>
                        </table>
                        <div style="margin-top: 24px;">
                            <p style="color: #a0a0a0; font-size: 13px; margin-bottom: 8px;">MESSAGE</p>
                            <div style="background-color: #111111; border-radius: 6px; padding: 20px; color: #e0e0e0; line-height: 1.6; white-space: pre-wrap;">%s</div>
                        </div>
                    </div>
                    <div style="padding: 16px 32px; background-color: #111111; text-align: center;">
                        <p style="color: #6b6b6b; font-size: 12px; margin: 0;">Sent from Portfolio Contact Form</p>
                    </div>
                </div>
                """
                .formatted(
                        escapeHtml(request.getName()),
                        escapeHtml(request.getEmail()),
                        escapeHtml(request.getEmail()),
                        escapeHtml(request.getSubject()),
                        escapeHtml(request.getMessage()));
    }

    /**
     * Basic HTML escaping to prevent XSS in email content.
     */
    private String escapeHtml(String input) {
        if (input == null)
            return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
