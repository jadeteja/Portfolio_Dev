# REST API Documentation

Base URL: `/api/v1`

## Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/public/services` | Retrieve active services (Web, Android, API, Deployment) |
| `GET` | `/api/v1/public/pricing` | Retrieve active pricing plans and calculated totals |
| `GET` | `/api/v1/public/additional-charges` | Retrieve list of optional features and charge categories |
| `GET` | `/api/v1/public/projects` | Retrieve published projects (optional `?category=` filter) |
| `GET` | `/api/v1/public/projects/{slug}` | Retrieve single project details by slug |
| `GET` | `/api/v1/public/faqs` | Retrieve active frequently asked questions |
| `GET` | `/api/v1/public/settings` | Retrieve public website settings and developer bio |
| `GET` | `/api/v1/public/profile` | Shortcut for brand and developer profile information |
| `POST` | `/api/v1/public/inquiries` | Submit client inquiry with server-side validation |

### Inquiry Submission Payload
```json
{
  "fullName": "Aditya Sharma",
  "email": "aditya@business.com",
  "phone": "+91 98765 43210",
  "projectType": "Website Development",
  "projectName": "Retail Store Showcase",
  "budgetRange": "₹5,000 - ₹20,000",
  "preferredTimeline": "1-2 Weeks (Standard)",
  "description": "Looking for a modern business website with appointment booking.",
  "consentGiven": true
}
```

---

## Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Authenticate admin with email and password |
| `POST` | `/api/v1/auth/refresh` | Rotate access token using valid refresh token |
| `POST` | `/api/v1/auth/logout` | End session |
| `GET` | `/api/v1/auth/me` | Return authenticated user details |
| `POST` | `/api/v1/auth/change-password` | Update administrator password |

---

## Admin Endpoints (Requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/dashboard` | Aggregated metrics (total projects, inquiries, services) |
| `GET` | `/api/v1/admin/projects` | List all projects |
| `POST` | `/api/v1/admin/projects` | Create a new project |
| `PUT` | `/api/v1/admin/projects/{id}` | Update existing project |
| `DELETE` | `/api/v1/admin/projects/{id}` | Delete project |
| `POST` | `/api/v1/admin/projects/{id}/images` | Upload image to Supabase Storage |
| `DELETE` | `/api/v1/admin/projects/{id}/images/{imageId}` | Delete project screenshot |
| `GET` | `/api/v1/admin/services` | List all services |
| `PUT` | `/api/v1/admin/services/{id}` | Update service |
| `GET` | `/api/v1/admin/pricing` | List pricing plans |
| `PUT` | `/api/v1/admin/pricing/{id}` | Update pricing package rates |
| `GET` | `/api/v1/admin/additional-charges` | List additional charges |
| `POST` | `/api/v1/admin/additional-charges` | Create additional charge |
| `DELETE` | `/api/v1/admin/additional-charges/{id}` | Delete additional charge |
| `GET` | `/api/v1/admin/faqs` | List FAQs |
| `POST` | `/api/v1/admin/faqs` | Create new FAQ |
| `DELETE` | `/api/v1/admin/faqs/{id}` | Delete FAQ |
| `GET` | `/api/v1/admin/inquiries` | Paginated inquiries (`?page=0&size=20`) |
| `PATCH` | `/api/v1/admin/inquiries/{id}/status` | Update inquiry status |
| `PUT` | `/api/v1/admin/settings` | Update general site settings |
