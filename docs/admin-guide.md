# Admin Guide — Jade Teja Portfolio

## Accessing the Dashboard
- **URL**: `/admin/login`
- **Initial Username**: `jade.teja@gmail.com`
- **Initial Password**: `Admin@JadeTeja2026!`

> [!IMPORTANT]
> Change the default password upon initial deployment using the **Change Password** tab in the sidebar.

## Managing Content

### 1. Inquiries
All customer leads submitted via the public contact form appear in `/admin/inquiries`.
- View client full name, email, phone/WhatsApp number, requested budget, and timeline.
- Click **Message on WhatsApp** to open an immediate prefilled chat with the client.
- Update status between: `NEW`, `IN_REVIEW`, `CONTACTED`, `COMPLETED`, `ARCHIVED`.

### 2. Pricing Plans
Configure base development and annual hosting costs at `/admin/pricing`.
- Updates immediately sync with the database and dynamically calculate the first-year total across both public website and Android packages.

### 3. Projects
Manage case studies at `/admin/projects`.
- Add new concept or client projects.
- Set technologies as JSON arrays (e.g. `["React", "Node.js"]`).
- Upload screenshots directly.

### 4. FAQs
Add, reorder, or remove frequently asked questions at `/admin/faqs`.
