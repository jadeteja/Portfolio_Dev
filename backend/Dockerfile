# ========================================================
# Stage 1: Build Java 21 Application using Maven
# ========================================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy dependency configuration and source
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

# Build production jar skipping testcontainers in container build
RUN mvn clean package -DskipTests

# ========================================================
# Stage 2: Minimal Distroless / Alpine Runtime
# ========================================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create unprivileged runtime user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy compiled artifact from builder stage
COPY --from=builder /app/target/portfolio-backend-1.0.0.jar app.jar

USER appuser

# Expose Render dynamic port
ENV PORT=8080
EXPOSE ${PORT}

# Healthcheck using actuator
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/actuator/health || exit 1

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Dserver.port=${PORT}", "-jar", "app.jar"]
