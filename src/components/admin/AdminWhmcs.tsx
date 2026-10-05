import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Save,
  CheckCircle2,
  ShieldCheck,
  Link,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsWhmcsConfig } from '../../types/cms';

export const AdminWhmcs: React.FC = () => {
  const [config, setConfig] = useState<CmsWhmcsConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await cmsService.getWhmcsConfig();
        setConfig(data);
      } catch (err) {
        console.error('Failed to load WHMCS config:', err);
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
    if (!config) return;

    setIsSaving(true);
    try {
      const updated = await cmsService.updateWhmcsConfig(config);
      setConfig(updated);
      showToast('WHMCS bridge configuration saved.');
    } catch {
      showToast('Failed to save WHMCS configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !config) {
    return <div className="py-20 text-center text-xs text-slate-400">Loading WHMCS configuration...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-amber-400" />
            <span>WHMCS Link Bridge Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure integration endpoints for the separate WHMCS billing, client authentication, and provisioning system.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Bridge Config'}</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div role="status" className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Architecture Separation Banner */}
      <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-900/50 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Architecture Notice: WHMCS Will Be Installed Separately</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Hostxeon is strictly structured with a decoupled billing architecture. Customers, credit cards, invoices, automated cPanel/Plesk accounts, KVM virtualization control, and support tickets reside exclusively in your dedicated WHMCS installation (e.g., <code className="text-amber-300 font-mono">billing.hostxeon.com</code>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <strong className="text-white block mb-0.5">Hostxeon CMS (This Repo):</strong>
            Marketing pages, domain search UI, SEO, branding, FAQs, and static pricing copy.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <strong className="text-white block mb-0.5">WHMCS Portal (Separate):</strong>
            Client login, checkout processing, Stripe/PayPal gateways, invoices, server provisioning.
          </div>
        </div>
      </div>

      {/* Section 1: Endpoints */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Link className="w-4 h-4 text-amber-400" />
            <span>Primary WHMCS URLs</span>
          </h2>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={config.isWhmcsActive}
              onChange={e => setConfig({ ...config, isWhmcsActive: e.target.checked })}
              className="rounded bg-slate-900 border-slate-800 text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>Enable Direct WHMCS Links</span>
          </label>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1" htmlFor="whmcs-base">
              WHMCS Base URL
            </label>
            <input
              id="whmcs-base"
              type="url"
              required
              value={config.baseUrl}
              onChange={e => setConfig({ ...config, baseUrl: e.target.value })}
              placeholder="https://billing.hostxeon.com"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1" htmlFor="whmcs-client">
                Client Area / Login URL
              </label>
              <input
                id="whmcs-client"
                type="url"
                required
                value={config.clientAreaUrl}
                onChange={e => setConfig({ ...config, clientAreaUrl: e.target.value })}
                placeholder="https://billing.hostxeon.com/clientarea.php"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1" htmlFor="whmcs-cart">
                Cart & Order Form URL
              </label>
              <input
                id="whmcs-cart"
                type="url"
                required
                value={config.cartUrl}
                onChange={e => setConfig({ ...config, cartUrl: e.target.value })}
                placeholder="https://billing.hostxeon.com/cart.php"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1" htmlFor="whmcs-dom-reg">
                Domain Registration Action Link
              </label>
              <input
                id="whmcs-dom-reg"
                type="url"
                value={config.domainRegisterUrl}
                onChange={e => setConfig({ ...config, domainRegisterUrl: e.target.value })}
                placeholder="https://billing.hostxeon.com/cart.php?a=add&domain=register"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1" htmlFor="whmcs-tickets">
                Support Ticket Dispatch Link
              </label>
              <input
                id="whmcs-tickets"
                type="url"
                value={config.supportTicketUrl}
                onChange={e => setConfig({ ...config, supportTicketUrl: e.target.value })}
                placeholder="https://billing.hostxeon.com/submitticket.php"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: WHMCS Product IDs */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Product Group & Package IDs (PIDs)</span>
        </h2>
        <p className="text-xs text-slate-400">
          When visitors click order buttons on pricing tables, the CMS will route them with the exact WHMCS package PID parameter: <code className="text-emerald-400 font-mono">/cart.php?a=add&pid=X</code>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Web Hosting PID</label>
            <input
              type="text"
              value={config.webHostingPid}
              onChange={e => setConfig({ ...config, webHostingPid: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">WordPress Hosting PID</label>
            <input
              type="text"
              value={config.wordpressHostingPid}
              onChange={e => setConfig({ ...config, wordpressHostingPid: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Cloud Hosting PID</label>
            <input
              type="text"
              value={config.cloudHostingPid}
              onChange={e => setConfig({ ...config, cloudHostingPid: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">VPS Server PID</label>
            <input
              type="text"
              value={config.vpsHostingPid}
              onChange={e => setConfig({ ...config, vpsHostingPid: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Business Email PID</label>
            <input
              type="text"
              value={config.emailHostingPid}
              onChange={e => setConfig({ ...config, emailHostingPid: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
