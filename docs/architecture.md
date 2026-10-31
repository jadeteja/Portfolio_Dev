# System Architecture — Jade Teja Portfolio

## Overview
This platform is an enterprise-grade full-stack freelance website and administrative back-office system built for **JADE TEJA** (Freelance Web & Android App Developer).

```
   +-----------------------------------------------------------+
   |                     Browser / Mobile                      |
   +-----------------------------------------------------------+
                                 |
                                 v
   +-----------------------------------------------------------+
   |              Next.js 15 App Router Frontend               |
   |   (TypeScript, Tailwind CSS, Motion, GSAP, Responsive)    |
   +-----------------------------------------------------------+
                                 |
                          HTTPS REST API
                                 |
                                 v
   +-----------------------------------------------------------+
   |             Spring Boot 3.3.x Backend API                 |
   | (Java 21, Spring Security, JWT Auth, Hibernate, Flyway)   |
   +-----------------------------------------------------------+
                    |                               |
       PostgreSQL Connection                 S3 / REST
                    |                               |
                    v                               v
   +---------------------------------+  +----------------------+
   |    Supabase PostgreSQL 15+      |  |   Supabase Storage   |
   | (UUID PKs, JSONB, Timestamptz)  |  |  (Project Media)     |
   +---------------------------------+  +----------------------+
```

## Security Design
- **Role-Based Access Control**: All public endpoints (`/api/v1/public/**`) are accessible without authentication. All management endpoints (`/api/v1/admin/**`) require the `ROLE_ADMIN` authority.
- **JWT Authentication**: Short-lived HMAC-SHA256 access tokens paired with refresh tokens.
- **Password Hashing**: BCrypt with salted rounds.
- **Input Validation**: Strict Jakarta Bean Validation on all backend controllers and Zod schemas on the Next.js frontend.
- **Spam & Injection Resistance**: UUID primary keys, parameterized JPA queries preventing SQL injection, and structured CORS origins.
