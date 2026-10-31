# Local Development Setup Guide

## Prerequisites
- **Node.js**: v20+ or v24 LTS (`node -v`)
- **npm**: v10+ (`npm -v`)
- **Java**: JDK 21 (`java -version`)
- **Apache Maven**: 3.9+ (`mvn -version`)
- **PostgreSQL**: Local instance or Supabase cloud connection

---

## 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure environment variables (or rely on defaults for local development):
   ```bash
   # Optional overrides:
   export DATABASE_URL="jdbc:postgresql://localhost:5432/portfolio_db"
   export DATABASE_USERNAME="postgres"
   export DATABASE_PASSWORD="your_password"
   export JWT_SECRET="404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"
   ```

3. Run the tests to verify the setup:
   ```bash
   mvn test
   ```

4. Run the Spring Boot server:
   ```bash
   mvn spring-boot:run
   ```
   The API will start at `http://localhost:8080`.
   - Healthcheck: `http://localhost:8080/actuator/health`
   - Initial Admin Account bootstrapped automatically:
     - **Email**: `jade.teja@gmail.com`
     - **Password**: `Admin@JadeTeja2026!`

---

## 2. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   The site will be live at `http://localhost:3000`.

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```
