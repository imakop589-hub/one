# Hostxeon CMS Setup & Deployment Guide

This guide describes how to configure, run, and deploy the Hostxeon Content Management System (CMS) for development and production environments.

---

## 1. Architectural Model & Responsibilities

Hostxeon uses a strict decoupled architecture:

* **Hostxeon CMS (This Repository):**
  * Marketing landing pages (Web Hosting, WordPress, Cloud, VPS, Email, Domains).
  * Page metadata, OpenGraph tags, canonical URLs, and SEO descriptions.
  * Public navigation menus (Header, Mega Menus, Footer).
  * Media Library asset management.
  * Frequently Asked Questions (FAQs).
  * Global Site Settings (brand tagline, desk phone, desk email, social URLs, announcement ribbon).
* **WHMCS Portal (Separate Dedicated Installation):**
  * Customer registration, authentication, and client control panel.
  * Credit card payment processing (Stripe, PayPal, Merchant gateways).
  * Invoices, automated recurring billing, tax calculations, and receipts.
  * Automated cPanel, DirectAdmin, Proxmox, and KVM server provisioning.
  * Support tickets, SLA escalation, and technical helpdesk.

---

## 2. Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
# Optional backend API endpoint for production CMS persistence.
# Leave empty to run the local development fallback mode.
VITE_CMS_API_URL=""

# Media Storage Provider ('local_dev' | 's3_cloud_storage')
VITE_MEDIA_STORAGE_PROVIDER="local_dev"

# WHMCS Portal Base URL (Separate installation)
VITE_WHMCS_BASE_URL="https://billing.hostxeon.com"
```

> **Security Rule:** Never place database passwords, admin credentials, or secret keys in `VITE_*` variables. Any variable prefixed with `VITE_` is compiled into public client bundles.

---

## 3. Development Mode vs. Production Deployment

### Development Mode (Isolated Local Fallback)
* When `VITE_CMS_API_URL` is empty, Hostxeon uses the `DevFallbackStorageAdapter` and `DevFallbackAuthAdapter`.
* Data changes persist in browser local storage for rapid UI and layout testing.
* Admin Login operates via the isolated development simulator:
  * On first entry in dev mode, enter your desired admin username and password (min 6 characters).
  * The password is salted with a random cryptographic salt and hashed using browser `crypto.subtle` (SHA-256). Only the salt and hash are stored locally (never plaintext).
  * A "Reset Local Dev Sandbox Credentials" button allows clearing the local salt/hash at any time.
  * Zero plaintext passwords or backdoors exist in client source code.
* Clear badges in the UI explicitly indicate development mode so it is never confused with production.

### Production Mode (REST API & Database Persistence)
To deploy with full server persistence:
1. Deploy a Node/Express, Go, or Python REST API implementing the endpoints detailed in Section 4.
2. Configure `VITE_CMS_API_URL=https://api.yourdomain.com` (or `/api` if using reverse proxy).
3. Connect the API to a persistent database (PostgreSQL or MySQL).
4. Run:
   ```bash
   npm run build
   ```

---

## 4. Production Backend API Specification

When `VITE_CMS_API_URL` is configured, the CMS client makes standard REST calls:

### Authentication Endpoints
* `POST /api/admin/auth/login`: Accepts `{ username, password }`. Validates against argon2/bcrypt server hashes. Sets secure `HttpOnly; SameSite=Strict; Secure` session cookies.
* `POST /api/admin/auth/logout`: Clears session cookie.
* `GET /api/admin/auth/me`: Returns `{ id, username, name, role }`.

### Content Endpoints
* `GET /api/cms/pages`: Returns list of `CmsPage` objects.
* `GET /api/cms/pages/:id`: Returns single page.
* `GET /api/cms/pages/slug/:slug`: Returns page by slug.
* `POST /api/cms/pages`: Creates new page.
* `PUT /api/cms/pages/:id`: Updates page.
* `DELETE /api/cms/pages/:id`: Deletes page.
* `PATCH /api/cms/pages/:id/toggle-status`: Toggles publish status.
* `GET /api/cms/settings`: Returns `CmsSiteSettings`.
* `PUT /api/cms/settings`: Updates `CmsSiteSettings`.
* `GET /api/cms/menus`: Returns menu items.
* `POST /api/cms/menus`: Adds or updates menu items.
* `DELETE /api/cms/menus/:id`: Deletes menu item.
* `GET /api/cms/faqs`: Returns FAQ items.
* `POST /api/cms/faqs`: Creates or updates FAQ.
* `DELETE /api/cms/faqs/:id`: Deletes FAQ.
* `GET /api/cms/whmcs`: Returns WHMCS bridge configuration.
* `PUT /api/cms/whmcs`: Updates WHMCS bridge configuration.

---

## 5. Media Cloud Storage Setup (S3 / Cloudflare R2 / MinIO)

For production asset storage:
1. Configure an S3-compatible bucket (AWS S3, Cloudflare R2, or DigitalOcean Spaces).
2. The server exposes:
   * `POST /api/media/upload`: Receives file buffer or issues presigned upload URLs.
   * `GET /api/media`: Returns list of uploaded media records.
   * `DELETE /api/media/:id`: Deletes object from bucket.
3. Supported image types: JPEG, PNG, WEBP, SVG, GIF (maximum 5MB per upload).

---

## 6. WHMCS Bridge Integration

Configure WHMCS bridge settings in `#admin` -> **WHMCS Bridge Config**:

* **WHMCS Base URL:** `https://billing.hostxeon.com`
* **Client Area URL:** `https://billing.hostxeon.com/clientarea.php`
* **Cart URL:** `https://billing.hostxeon.com/cart.php`
* **Domain Registration:** `https://billing.hostxeon.com/cart.php?a=add&domain=register`
* **Support Ticket Desk:** `https://billing.hostxeon.com/submitticket.php`
* **Product Package PIDs:** Configure PIDs matching your WHMCS product configuration for Web Hosting, WordPress, Cloud, VPS, and Business Email.
