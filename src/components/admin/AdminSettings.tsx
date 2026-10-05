import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
  CheckCircle2,
  AlertCircle,
  Bell,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsSiteSettings } from '../../types/cms';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<CmsSiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await cmsService.getSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    try {
      const updated = await cmsService.updateSettings(settings);
      setSettings(updated);
      showToast('Site settings updated successfully.');
    } catch {
      showToast('Failed to save site settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return <div className="py-20 text-center text-xs text-slate-400">Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-300" />
            <span>Site Settings & Brand Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global Hostxeon brand identifiers, contact information, social profiles, and SEO defaults.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div role="status" className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section 1: General Brand Info */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Brand Identity & General</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="site-name">
              Brand / Site Name
            </label>
            <input
              id="site-name"
              type="text"
              required
              value={settings.siteName}
              onChange={e => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="site-tagline">
              Brand Tagline
            </label>
            <input
              id="site-tagline"
              type="text"
              value={settings.tagline}
              onChange={e => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1" htmlFor="copyright-txt">
            Footer Copyright Notice
          </label>
          <input
            id="copyright-txt"
            type="text"
            value={settings.copyrightText}
            onChange={e => setSettings({ ...settings, copyrightText: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Section 2: Contact Information */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-400" />
          <span>Contact Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="contact-email">
              Support / Desk Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={settings.contactEmail}
              onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="contact-phone">
              Contact Telephone
            </label>
            <input
              id="contact-phone"
              type="text"
              value={settings.contactPhone}
              onChange={e => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="block text-slate-300 font-semibold mb-1" htmlFor="contact-address">
            Registered Office Address
          </label>
          <input
            id="contact-address"
            type="text"
            value={settings.contactAddress}
            onChange={e => setSettings({ ...settings, contactAddress: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Section 3: Announcement Header Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#fed000]" />
            <span>Top Announcement Ribbon</span>
          </h2>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.announcementActive}
              onChange={e => setSettings({ ...settings, announcementActive: e.target.checked })}
              className="rounded bg-slate-900 border-slate-800 text-emerald-500 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>Enable Announcement</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
          <div className="sm:col-span-8">
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="announcement-text">
              Announcement Message
            </label>
            <input
              id="announcement-text"
              type="text"
              value={settings.announcementText || ''}
              onChange={e => setSettings({ ...settings, announcementText: e.target.value })}
              placeholder="e.g. Spring 2026 Release: NVMe 4.0 Storage live across all regions."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="announcement-link">
              Link Target
            </label>
            <input
              id="announcement-link"
              type="text"
              value={settings.announcementLink || ''}
              onChange={e => setSettings({ ...settings, announcementLink: e.target.value })}
              placeholder="#webhosting"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Social Media Links */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Share2 className="w-4 h-4 text-purple-400" />
          <span>Social Media Profiles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="soc-twitter">
              Twitter / X URL
            </label>
            <input
              id="soc-twitter"
              type="url"
              value={settings.socialLinks.twitter}
              onChange={e => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, twitter: e.target.value },
              })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-purple-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="soc-linkedin">
              LinkedIn URL
            </label>
            <input
              id="soc-linkedin"
              type="url"
              value={settings.socialLinks.linkedin}
              onChange={e => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
              })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-purple-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="soc-github">
              GitHub URL
            </label>
            <input
              id="soc-github"
              type="url"
              value={settings.socialLinks.github}
              onChange={e => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, github: e.target.value },
              })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-purple-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="soc-facebook">
              Facebook URL
            </label>
            <input
              id="soc-facebook"
              type="url"
              value={settings.socialLinks.facebook || ''}
              onChange={e => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, facebook: e.target.value },
              })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-purple-500 font-mono"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
