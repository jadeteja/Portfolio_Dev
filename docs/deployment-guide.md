# Production Deployment Guide

## 1. Database & Storage: Supabase
1. Create a Supabase project in `ap-south-1` (Mumbai) or your chosen region.
2. Note your JDBC connection string:
   ```
   jdbc:postgresql://db.<project-ref>.supabase.co:5432/postgres?sslmode=require
   ```
3. Create a public storage bucket named `portfolio-assets`.

---

## 2. Backend Deployment: Render (Docker)
1. Push repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), click **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Set **Root Directory**: `backend`
5. Select **Environment**: `Docker` (Render automatically uses `backend/Dockerfile`).
6. Set the Environment Variables:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DATABASE_URL`: Your Supabase JDBC connection string
   - `DATABASE_USERNAME`: `postgres`
   - `DATABASE_PASSWORD`: `<your-supabase-db-password>`
   - `JWT_SECRET`: A secure 64-character hex string
   - `FRONTEND_ALLOWED_ORIGINS`: `https://your-domain.vercel.app,https://yourcustomdomain.com`
   - `SUPABASE_URL`: `https://<project-ref>.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `<your-service-role-key>`
   - `SUPABASE_STORAGE_BUCKET`: `portfolio-assets`
   - `INITIAL_ADMIN_EMAIL`: `jade.teja@gmail.com`
   - `INITIAL_ADMIN_PASSWORD`: `<strong-random-password>`
7. Deploy the service. Note your Render URL (e.g. `https://jade-teja-api.onrender.com`).

---

## 3. Frontend Deployment: Vercel
1. In [Vercel Dashboard](https://vercel.com), click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Configure the Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_BASE_URL`: `https://jade-teja-api.onrender.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`: `916304579593`
5. Click **Deploy**. Vercel will build the Next.js application with full SSG/ISR support.
