package com.elearning.backend.service;

import com.elearning.backend.dto.ContactRequest;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String toAddress;

    @Value("${app.mail.from}")
    private String fromAddress;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Async
    public void sendContactEmail(ContactRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress, fromName);
            helper.setTo(toAddress);
            helper.setReplyTo(request.getEmail(), request.getName());

            String subject = (request.getSubject() != null && !request.getSubject().isBlank())
                    ? request.getSubject()
                    : "New Contact Form Message";

            helper.setSubject(subject);
            helper.setText(buildHtmlBody(request), buildPlainBody(request));

            mailSender.send(message);
            log.info("Contact email sent from: {}", request.getEmail());
        } catch (Exception e) {
            log.error("Failed to send contact email from: {}", request.getEmail(), e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private String buildHtmlBody(ContactRequest request) {
        String subject = (request.getSubject() != null && !request.getSubject().isBlank())
                ? request.getSubject()
                : "New Contact Form Message";

        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                    .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; text-align: center; color: #fff; }
                    .header h1 { margin: 0; font-size: 24px; }
                    .body { padding: 30px; }
                    .field { margin-bottom: 20px; }
                    .field-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin-bottom: 4px; }
                    .field-value { font-size: 16px; color: #1e293b; line-height: 1.5; }
                    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Contact Message</h1>
                    </div>
                    <div class="body">
                        <div class="field">
                            <div class="field-label">Name</div>
                            <div class="field-value">%s</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Email</div>
                            <div class="field-value">%s</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Subject</div>
                            <div class="field-value">%s</div>
                        </div>
                        <hr class="divider">
                        <div class="field">
                            <div class="field-label">Message</div>
                            <div class="field-value" style="white-space: pre-wrap;">%s</div>
                        </div>
                    </div>
                    <div class="footer">
                        Sent from the E-Learn contact form
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                    escapeHtml(request.getName()),
                    escapeHtml(request.getEmail()),
                    escapeHtml(subject),
                    escapeHtml(request.getMessage())
            );
    }

    private String buildPlainBody(ContactRequest request) {
        String subject = (request.getSubject() != null && !request.getSubject().isBlank())
                ? request.getSubject()
                : "New Contact Form Message";

        return """
                New Contact Message

                Name: %s
                Email: %s
                Subject: %s
                Message:
                %s
                """.formatted(request.getName(), request.getEmail(), subject, request.getMessage());
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }
}
