export type ContentStatus = 'draft' | 'published';

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  status: ContentStatus;
  content: string;
  category?: 'hosting' | 'domains' | 'company' | 'legal' | 'general';
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CmsMenuItem {
  id: string;
  label: string;
  url: string;
  parentId?: string | null;
  menuLocation: 'header' | 'mega_domains' | 'mega_hosting' | 'mega_vps' | 'mega_email' | 'footer_products' | 'footer_company' | 'footer_support';
  order: number;
  isActive: boolean;
  isExternal: boolean;
  badge?: string;
  badgeColor?: string;
  targetView?: string;
}

export interface CmsSiteSettings {
  siteName: string;
  tagline: string;
  logoText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  copyrightText: string;
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    facebook?: string;
  };
  maintenanceMode: boolean;
  announcementText?: string;
  announcementLink?: string;
  announcementActive: boolean;
}

export interface CmsMediaItem {
  id: string;
  title: string;
  altText: string;
  filename: string;
  url: string;
  fileSize: number; // bytes
  mimeType: string;
  uploadedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface CmsFaq {
  id: string;
  category: 'general' | 'hosting' | 'domains' | 'billing_whmcs' | 'security';
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
}

export interface CmsWhmcsConfig {
  baseUrl: string;
  clientAreaUrl: string;
  cartUrl: string;
  domainRegisterUrl: string;
  domainTransferUrl: string;
  supportTicketUrl: string;
  webHostingPid: string;
  wordpressHostingPid: string;
  cloudHostingPid: string;
  vpsHostingPid: string;
  emailHostingPid: string;
  isWhmcsActive: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'superadmin' | 'editor';
}

export interface AdminSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
}
