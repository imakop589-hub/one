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
│  - Public Dynamic CMS Page Resolver (/#slug) │
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

## 2. Component Implementation Status Breakdown

| Feature / Domain | Status | Architecture Classification |
|---|---|---|
| **Admin UI & Dashboard** | **IMPLEMENTED** | Admin management screens active at `/#admin` |
| **Pages CMS CRUD** | **IMPLEMENTED** | Create, Read, Update, Delete, publish toggle, and SEO fields |
| **Public CMS Page Resolver** | **IMPLEMENTED** | Dynamically resolves and renders published CMS pages |
| **Navigation Management** | **IMPLEMENTED** | Header, Mega menus, and Footer link management |
| **FAQs Management** | **IMPLEMENTED** | Category-based FAQ CRUD with public dynamic display |
| **Site Settings** | **IMPLEMENTED** | Brand identity, phone, desk email, copyright, social links |
| **WHMCS Link Bridge** | **IMPLEMENTED** | Configurable base URL, clientarea URL, cart URL, PIDs |
| **Storage Layer: Dev Mode** | **DEVELOPMENT FALLBACK** | Local storage adapter for offline testing |
| **Storage Layer: Prod API** | **REQUIRES DEPLOYMENT CONFIG** | `ApiStorageAdapter` ready via `VITE_CMS_API_URL` |
| **Admin Auth: Dev Mode** | **DEVELOPMENT FALLBACK** | Local dev simulator using salted WebCrypto SHA-256 (no hardcoded passwords) |
| **Admin Auth: Prod Mode** | **REQUIRES DEPLOYMENT CONFIG** | `ApiAuthAdapter` ready for HttpOnly cookie sessions |
| **Media: Local Dev** | **DEVELOPMENT FALLBACK** | Local data URL simulator with 5MB validation |
| **Media: S3 / Cloud Bucket** | **REQUIRES DEPLOYMENT CONFIG** | Presigned S3 adapter ready via `POST /api/media/upload` |
| **Customer Accounts & Billing**| **WHMCS / EXTERNAL SYSTEM** | Separate WHMCS system (strictly out of scope for website) |
| **Live Server Provisioning** | **WHMCS / EXTERNAL SYSTEM** | Handled via WHMCS server automation modules |

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
* **Separation of Modes:**
  * **Production Mode:** `ApiAuthAdapter` dispatches `POST /api/admin/auth/login` to the backend server. The server verifies credentials against server-side argon2/bcrypt hashes and returns HttpOnly session cookies. Session checks query `GET /api/admin/auth/me`. Zero admin credentials, passwords, or hashes exist in the client bundle.
  * **Development Fallback Mode:** `DevFallbackAuthAdapter` provides an isolated local simulator for rapid UI and CMS workflow evaluation when no API server is connected. On first access, the administrator configures a local password which is salted and hashed using browser WebCrypto SHA-256 (`crypto.subtle`) into local storage. No plaintext passwords or backdoors exist anywhere in the source code. The Admin UI displays a prominent "DEV SIMULATOR" badge for transparency.

---

## 5. Media Storage Approach

* **Current Development Fallback:** Local data simulator with client-side validation:
  * Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`.
  * Maximum file size limit: 5MB per file.
  * Sanitized filenames preventing path traversal or special characters.
* **Production Deployment Requirement:**
  * `S3CloudMediaAdapter` (`src/services/mediaStorageAdapter.ts`) connects to AWS S3, Cloudflare R2, or MinIO via backend presigned upload URLs (`POST /api/media/upload`).

---

## 6. Public Frontend Data Layer

* `src/services/cmsService.ts` wraps the active storage adapter.
* Pre-seeded default data (`src/data/defaultCmsData.ts`) guarantees zero downtime or broken layouts if CMS data is empty.
* Public pages consume CMS published data dynamically:
  * `CmsPageResolver.tsx` dynamically resolves and renders published CMS pages (e.g. `/#about`, `/#faq`, `/#contact`, or custom slugs).
  * `FaqSection.tsx` dynamically displays published CMS FAQs with fallback to static `FAQ_ITEMS`.
  * `Footer.tsx` dynamically displays site settings copyright and contact details.

---

## 7. Features Intentionally Excluded (Belonging to WHMCS)

To prevent duplication, data fragmentation, and security liabilities, the following features are strictly **excluded** from this repository:
1. Customer Registration & Password Recovery
2. Credit Card Storage & Payment Gateway Tokenization (Stripe Elements / PayPal SDK)
3. Customer Invoicing, Tax Calculations & PDF Invoices
4. Live Server Provisioning (cPanel API / Proxmox API / SolusVM API)
5. Customer Support Ticket Helpdesks
6. Hosting Service Upgrade / Downgrade Automation
7. Customer Database Tables (`tblclients`, `tblhosting`, `tblinvoices`)
