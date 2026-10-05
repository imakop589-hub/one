# Hostxeon CMS & WHMCS Decoupled Architecture

This document outlines the architecture, data models, authentication strategy, integration layers, and administrative boundaries for the Hostxeon web platform and its Content Management System (CMS).

---

## 1. High-Level Architectural Overview

Hostxeon separates **Content Marketing & Brand Management** from **Customer Services & Billing Automation**:

```
[ ADMIN USER ]
      │
      ▼ (Protected Auth Guard: /admin or #admin)
┌──────────────────────────────────────────────┐
│             HOSTXEON CMS (This Repo)         │
│  - Pages CMS (Draft / Published, Metadata)   │
│  - Navigation Management (Header, Mega, Ftr) │
│  - Media Library (SVG, PNG, WEBP, JPEG)      │
│  - FAQs Content System                       │
│  - Global Site Settings & Brand Identity     │
│  - WHMCS Bridge Link Configuration           │
└──────────────────────┬───────────────────────┘
                       │ (Data Layer & Storage Service)
                       ▼
┌──────────────────────────────────────────────┐
│           PUBLIC HOSTXEON WEBSITE            │
│  - Landing Pages: Home, Web, WP, Cloud, VPS  │
│  - Real-Time DNS Availability Lookup         │
│  - Responsive Mobile / Desktop Layouts       │
│  - SEO Canonical Tags & JSON-LD Schemas      │
└──────────────────────┬───────────────────────┘
                       │
                       │ (External Redirects / Deep Links)
                       ▼
┌──────────────────────────────────────────────┐
│         DEDICATED WHMCS INSTALLATION         │
│             (Separately Deployed)            │
│  - Customer Accounts, Profiles & Login       │
│  - Payment Gateways (Stripe, PayPal, Bacs)   │
│  - Invoicing, Subscriptions, Prorata Billing │
│  - Automated Cloud / cPanel / KVM VPS Prov.  │
│  - Support Ticket Desks & Client Helpdesk    │
│  - Service Renewals & Cancellations          │
└──────────────────────────────────────────────┘
```

---

## 2. Admin Routes & Navigation

* **Route:** `/admin` or `#admin`
  * When unauthenticated: Displays the secure Hostxeon Admin Login interface.
  * When authenticated: Loads the complete Hostxeon Admin CMS environment with dedicated sidebar, top navigation, breadcrumbs, and live public preview link.
* **Sections:**
  * `dashboard` (`#admin`): Metric summaries (total pages, published/draft status, media count, menu items, WHMCS status) and quick actions.
  * `pages` (`#admin` -> Pages CMS): Searchable, filterable list of all content pages with publish toggles, edit shortcuts, and delete actions.
  * `page-new` / `page-edit`: Tabbed content editor supporting page content, slugs, publish state, and search engine optimization (SEO / OpenGraph / Canonical).
  * `navigation` (`#admin` -> Navigation): Link hierarchies for Header, Mega Menus (Domains, Hosting, VPS, Email), and Footer sections.
  * `media` (`#admin` -> Media Library): Asset uploads with client-side mime-type/size validation, copy URL helper, alt text, and previews.
  * `faqs` (`#admin` -> FAQs): FAQs categorized by Hosting, Domains, Billing, and General.
  * `settings` (`#admin` -> Site Settings): Brand identity, desk email, phone, physical headquarters address, copyright, social profiles, and announcement ribbon.
  * `whmcs` (`#admin` -> WHMCS Bridge): Base URLs, Product IDs (PIDs), client area links, and registration endpoints.

---

## 3. Data Models (`src/types/cms.ts`)

### `CmsPage`
* `id: string`
* `title: string`
* `slug: string`
* `status: 'draft' | 'published'`
* `category?: 'hosting' | 'domains' | 'company' | 'legal' | 'general'`
* `content: string`
* `seoTitle?: string`
* `metaDescription?: string`
* `canonicalUrl?: string`
* `ogTitle?: string`
* `ogDescription?: string`
* `ogImage?: string`
* `createdAt: string`
* `updatedAt: string`
* `publishedAt?: string`

### `CmsMenuItem`
* `id: string`
* `label: string`
* `url: string`
* `parentId?: string | null`
* `menuLocation: 'header' | 'mega_domains' | 'mega_hosting' | 'mega_vps' | 'mega_email' | 'footer_products' | 'footer_company' | 'footer_support'`
* `order: number`
* `isActive: boolean`
* `isExternal: boolean`
* `badge?: string`
* `badgeColor?: string`
* `targetView?: string`

### `CmsSiteSettings`
* `siteName: string`
* `tagline: string`
* `logoText: string`
* `contactEmail: string`
* `contactPhone: string`
* `contactAddress: string`
* `copyrightText: string`
* `defaultSeoTitle: string`
* `defaultMetaDescription: string`
* `defaultOgImage: string`
* `socialLinks: { twitter: string; linkedin: string; github: string; facebook?: string }`
* `maintenanceMode: boolean`
* `announcementText?: string`
* `announcementLink?: string`
* `announcementActive: boolean`

### `CmsMediaItem`
* `id: string`
* `title: string`
* `altText: string`
* `filename: string`
* `url: string`
* `fileSize: number` (bytes)
* `mimeType: string`
* `uploadedAt: string`

### `CmsWhmcsConfig`
* `baseUrl: string`
* `clientAreaUrl: string`
* `cartUrl: string`
* `domainRegisterUrl: string`
* `domainTransferUrl: string`
* `supportTicketUrl: string`
* `webHostingPid: string`
* `wordpressHostingPid: string`
* `cloudHostingPid: string`
* `vpsHostingPid: string`
* `emailHostingPid: string`
* `isWhmcsActive: boolean`

---

## 4. Authentication Strategy

* **Target:** Exclusively protects the `/admin` CMS area. Does **not** manage customer accounts.
* **Mechanism:**
  * Uses `crypto.subtle.digest('SHA-256')` hash verification.
  * Generates timed session tokens stored in `sessionStorage` with an 8-hour expiry window.
  * In production, environment variables `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD_HASH` configure access.
  * When deploying a Node/Express backend or OAuth server, the service interface (`authService.login`, `authService.logout`, `authService.isAuthenticated`) seamlessly swaps from client token storage to HttpOnly JWT cookies.

---

## 5. Media Storage Approach

* **Current Implementation:** Browser data storage with base64 data URLs, real-time client-side validation:
  * Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`.
  * Maximum file size limit: 5MB per file.
  * Sanitized filenames preventing path traversal or special characters.
* **Production Deployment Path:**
  * Interface `cmsService.uploadMedia` maps directly to an S3 / Cloud Storage / Cloudinary bucket presigned URL endpoint (`POST /api/media/upload`).

---

## 6. Public Frontend Data Layer

* The service layer (`src/services/cmsService.ts`) abstracts all CMS interactions.
* Pre-seeded default data (`src/data/defaultCmsData.ts`) ensures the website functions immediately without broken links, empty states, or layout collapses.
* State persists cleanly across reloads via local storage persistence.

---

## 7. Environment Variables (`.env.example`)

```bash
# Admin CMS Configuration
VITE_ADMIN_USERNAME=admin
# SHA-256 hash of admin password
VITE_ADMIN_PASSWORD_HASH=1f64f4347719ce3d5aee2dae7d5a57e62a0a2df4aa5349e5d796fa3bb135f661

# WHMCS Bridge Configuration
VITE_WHMCS_BASE_URL=https://billing.hostxeon.com
```

---

## 8. Features Intentionally Excluded (Belonging to WHMCS)

To prevent duplication and security liabilities, the following features are strictly **excluded** from this repository:
1. Customer Registration & Password Recovery
2. Credit Card Storage & Payment Gateway Tokenization (Stripe Elements / PayPal SDK)
3. Customer Invoicing, Tax Calculations & PDF Invoices
4. Live Server Provisioning (cPanel API / Proxmox API / SolusVM API)
5. Customer Support Ticket Ticketing Desks
6. Hosting Service Upgrade / Downgrade Automation
7. Customer Database Tables (`tblclients`, `tblhosting`, `tblinvoices`)
