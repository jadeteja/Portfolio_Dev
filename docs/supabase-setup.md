# Supabase Setup Guide

## 1. Create a Supabase Project
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Click **New Project** and name it `jade-teja-portfolio`.
3. Choose a region close to your target audience (e.g., `ap-south-1` Mumbai).
4. Save the generated database password securely.

## 2. Obtain PostgreSQL Connection Details
In your Supabase project settings:
1. Go to **Settings** -> **Database**.
2. Under **Connection string**, select **JDBC**.
3. Use the URI string in your backend environment configuration:
   ```
   DATABASE_URL=jdbc:postgresql://db.<your-project-ref>.supabase.co:5432/postgres?sslmode=require
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=<your-db-password>
   ```

## 3. Storage Bucket Configuration
1. Go to **Storage** -> **New Bucket**.
2. Name the bucket `portfolio-assets`.
3. Toggle **Public bucket** to `ON` (allows public visitors to view published case study images).
4. Under **Settings** -> **API**, locate your `Project URL` and `service_role secret`.
5. Set these in the backend environment variables:
   ```
   SUPABASE_URL=https://<your-project-ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret>
   SUPABASE_STORAGE_BUCKET=portfolio-assets
   ```

> [!CAUTION]
> Never expose your `service_role` key in frontend code or public GitHub repositories. Only the Spring Boot backend should communicate with Supabase using the service role key.

## 4. Automatic Flyway Migration
When the Spring Boot backend starts with the Supabase connection string, Flyway will automatically execute:
- `V1__init_schema.sql` (Creates `admin_users`, `projects`, `services`, `pricing_plans`, `additional_charges`, `inquiries`, `faqs`, `site_settings`)
- `V2__seed_initial_data.sql` (Seeds all initial packages, concept projects, FAQs, and site settings)
