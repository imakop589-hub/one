import React from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'cookies' | 'security' | null;

interface LegalModalProps {
  policyType: PolicyType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy & GDPR Compliance',
      subtitle: 'Last updated: January 2026 • Hostxeon Platform',
      icon: Lock,
      sections: [
        {
          heading: '1. Data Controller & Storage',
          text: 'Hostxeon processes and stores your personal and hosting account data exclusively within Tier-3 ISO-27001 certified European data centres in compliance with GDPR and UK Data Protection legislation.',
        },
        {
          heading: '2. Information We Collect',
          text: 'We collect account details (name, email, phone number, billing address) and technical metrics (domain DNS records, server access logs) solely to provide hosting, domain registry, and billing services.',
        },
        {
          heading: '3. Zero Data Selling',
          text: 'We never sell, rent, or lease your personal information or contact details to third-party advertisers or data brokers under any circumstances.',
        },
        {
          heading: '4. Your Data Rights',
          text: 'You have the right to request access, rectification, export (portability), or permanent deletion of your stored data anytime through our Control Panel or by contacting our Data Protection Officer.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service & Hosting Agreement',
      subtitle: 'Last updated: January 2026 • Hostxeon Platform',
      icon: FileText,
      sections: [
        {
          heading: '1. Service Provision & 99.9% SLA',
          text: 'Hostxeon provides shared web hosting, managed WordPress, cloud infrastructure, VPS instances, and domain registration backed by our 99.9% uptime Service Level Agreement.',
        },
        {
          heading: '2. 15-Day Money-Back Guarantee',
          text: 'All shared hosting, cloud packages, and email plans come with an unconditional 15-day money-back guarantee. If you are not satisfied, you can cancel within 15 days for a full refund.',
        },
        {
          heading: '3. Transparent Billing & Renewal',
          text: 'Subscriptions renew automatically at standard annual rates as clearly shown during checkout. You may cancel your subscription at any time with 1 click from your Control Panel before the renewal date.',
        },
        {
          heading: '4. Acceptable Usage Policy',
          text: 'Hostxeon prohibits phishing, unsolicited bulk email (spam), distributed denial-of-service tools, copyright infringement, and malicious malware execution across our network.',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      subtitle: 'Last updated: January 2026 • Hostxeon Platform',
      icon: ShieldCheck,
      sections: [
        {
          heading: '1. Essential Cookies',
          text: 'These cookies are required for shopping basket functionality, customer authentication sessions, and secure payment processing through 256-bit SSL encryption.',
        },
        {
          heading: '2. Analytical Performance',
          text: 'We use anonymized analytical cookies to understand how visitors interact with our website to optimize page speed, server response times, and checkout ease.',
        },
        {
          heading: '3. Managing Preferences',
          text: 'You can adjust or disable cookie tracking anytime within your browser settings without impacting basic site navigation.',
        },
      ],
    },
    security: {
      title: 'Security & Infrastructure Overview',
      subtitle: 'Last updated: January 2026 • Hostxeon Platform',
      icon: ShieldCheck,
      sections: [
        {
          heading: '1. 3.2 Tbps Anti-DDoS Scrubbing',
          text: 'All incoming traffic passes through hardware scrubbing centers to mitigate L3/L4/L7 volumetric attacks in real-time with zero packet drop.',
        },
        {
          heading: '2. Automated Daily Backups',
          text: 'Your website files, databases, and mailboxes are backed up daily to offsite encrypted storage with 1-click snapshot restore.',
        },
        {
          heading: '3. Free SSL & DNSSEC',
          text: 'Every domain hosted on Hostxeon receives automated Let’s Encrypt wildcard SSL certificates and optional DNSSEC cryptographic spoof protection.',
        },
      ],
    },
  };

  const active = contentMap[policyType];
  const Icon = active.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-[#fed000] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{active.title}</h3>
              <p className="text-xs text-slate-400">{active.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            id="close-legal-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700 leading-relaxed">
          {active.sections.map((sec, idx) => (
            <div key={idx} className="space-y-1.5 pb-4 border-b border-gray-100 last:border-b-0">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>{sec.heading}</span>
              </h4>
              <p className="text-xs text-gray-600 pl-6 leading-relaxed">{sec.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Hostxeon Platform Inc. • ISO 27001 Certified</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
