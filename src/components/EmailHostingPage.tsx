import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Smartphone, 
  Lock, 
  Layers, 
  Headphones, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Inbox, 
  Send, 
  Sparkles,
  Zap,
  Server,
  Cloud,
  ShieldAlert
} from 'lucide-react';
import { CartItem } from '../types';

interface EmailHostingPageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
  onGoToDomains: () => void;
  initialCategory?: 'webmail' | 'm365' | 'security';
}

interface EmailPlan {
  id: string;
  category: 'webmail' | 'm365' | 'security';
  name: string;
  tagline: string;
  storage: string;
  monthlyPrice: number;
  annualPrice: number;
  originalPrice: number;
  popular?: boolean;
  badge?: string;
  features: string[];
}

const ALL_EMAIL_PLANS: EmailPlan[] = [
  // Webmail Category
  {
    id: 'email-starter',
    category: 'webmail',
    name: 'Business Starter',
    tagline: 'Ideal for solo entrepreneurs, freelancers & small projects',
    storage: '10 GB Cloud Mail Storage',
    monthlyPrice: 1.49,
    annualPrice: 0.99,
    originalPrice: 2.99,
    features: [
      '1 Custom Domain Email (you@brand.com)',
      '10 GB High-Speed NVMe Storage',
      'Modern Webmail Client + iOS/Android Sync',
      'Standard Spam & Virus Protection',
      'IMAP / POP3 / SMTP Access',
      'Free Unlimited Email Forwarders',
      'Automated SPF & DKIM Security Setup',
    ],
  },
  {
    id: 'email-pro',
    category: 'webmail',
    name: 'Business Pro',
    tagline: 'The ultimate professional suite for growing brands and agencies',
    storage: '50 GB Cloud Mail Storage',
    monthlyPrice: 3.49,
    annualPrice: 2.49,
    originalPrice: 5.99,
    popular: true,
    badge: 'Most Popular',
    features: [
      'Unlimited Mailboxes for your domain',
      '50 GB High-Speed NVMe Storage',
      'AI-Powered Anti-Spam & Phishing Shield',
      'Integrated Shared Calendar & Contacts',
      '100% Ad-Free, Zero Data-Mining Guarantee',
      'Auto-Responders & Custom Email Signatures',
      'DMARC 1-Click Enforcement',
      '24/7 Priority Mail Deliverability Support',
    ],
  },
  {
    id: 'email-enterprise',
    category: 'webmail',
    name: 'Enterprise Webmail',
    tagline: 'Dedicated cloud email cluster for high-volume corporate organizations',
    storage: '250 GB Cloud Mail Storage',
    monthlyPrice: 7.99,
    annualPrice: 5.99,
    originalPrice: 11.99,
    badge: 'High Capacity',
    features: [
      'Unlimited Mailboxes with 250 GB pooled NVMe',
      'Dedicated IP Address for Clean Deliverability',
      'Enterprise Anti-Phishing & Malware Filtering',
      '10-Year Automated Compliance Email Archiving',
      'Advanced Audit Logs & Admin Console',
      '24/7 Dedicated Account Manager & SLA Guarantee',
    ],
  },

  // Microsoft 365 Category
  {
    id: 'm365-basic',
    category: 'm365',
    name: 'Microsoft 365 Basic',
    tagline: 'Professional cloud business email plus web & mobile Office apps',
    storage: '50 GB Mail + 1 TB OneDrive',
    monthlyPrice: 5.99,
    annualPrice: 4.49,
    originalPrice: 8.99,
    badge: 'Official Microsoft CSP',
    features: [
      '50 GB Exchange Business Mailbox per user',
      '1 TB OneDrive Cloud Storage Included',
      'Web & Mobile versions of Word, Excel, PowerPoint',
      'Microsoft Teams for Video Calls & Chat',
      'Enterprise Exchange Online Protection (EOP)',
      'Hostxeon Concierge Setup & DNS Integration',
      'Multi-Device Sync up to 5 devices per user',
    ],
  },
  {
    id: 'm365-standard',
    category: 'm365',
    name: 'Microsoft 365 Standard',
    tagline: 'Complete suite with installable Desktop Office apps for PC and Mac',
    storage: '50 GB Mail + 1 TB OneDrive',
    monthlyPrice: 12.99,
    annualPrice: 9.99,
    originalPrice: 16.99,
    popular: true,
    badge: 'Best for Teams',
    features: [
      'Full Desktop Apps: Word, Excel, PowerPoint, Outlook, Access',
      'Install on up to 5 PCs/Macs + 5 Tablets + 5 Phones',
      '50 GB Business Class Mailbox per user',
      '1 TB Secure OneDrive for Business Storage',
      'Microsoft Teams Webinars with Attendee Registration',
      'Advanced Security: Remote Device Wipe & Zero-Day Patching',
      'Hostxeon 24/7 Microsoft Certified Support',
    ],
  },
  {
    id: 'm365-apps',
    category: 'm365',
    name: 'Microsoft 365 Apps',
    tagline: 'Office applications only for teams already using an external email system',
    storage: '1 TB OneDrive Cloud Storage',
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    originalPrice: 13.99,
    features: [
      'Fully installed desktop versions of Word, Excel, PowerPoint',
      'Install across 5 PCs or Macs per user license',
      '1 TB OneDrive for Business cloud storage',
      'Real-time collaborative editing & version history',
      'Automatic continuous feature updates from Microsoft',
      'Commercial-use license guarantee',
    ],
  },

  // Anti-Spam & Email Security Gateway Category
  {
    id: 'sec-outbound',
    category: 'security',
    name: 'Clean Outbound SMTP Relay',
    tagline: 'Protect your domain sender reputation with clean warmed IP pools',
    storage: '50,000 Outbound Relay Emails/mo',
    monthlyPrice: 2.49,
    annualPrice: 1.49,
    originalPrice: 3.99,
    badge: 'High Deliverability',
    features: [
      'Clean Warm IP Pools for 99.8% Inbox Rate',
      'Automated SPF, DKIM & DMARC Key Rotation',
      'Real-Time Blacklist Monitoring & Alerts',
      'Zero Throttling on Transactional & Order Emails',
      'Detailed Delivery & Bounce Telemetry Dashboard',
      'Compatible with any CMS, CRM, or Custom Server',
    ],
  },
  {
    id: 'sec-spamtitan',
    category: 'security',
    name: 'SpamTitan Inbound Gateway',
    tagline: 'Multi-layered AI heuristic filter blocking 99.99% of spam & malware',
    storage: 'Unlimited Inbound Email Filtering',
    monthlyPrice: 3.49,
    annualPrice: 2.49,
    originalPrice: 5.99,
    popular: true,
    badge: '99.99% Spam Block',
    features: [
      'Dual Antivirus Engines (Bitdefender & ClamAV)',
      'AI-Powered Phishing, Spear-Phishing & CEO Fraud Shield',
      'Sandboxing for Malicious URL & Attachment Inspection',
      'Self-Service Quarantine Digests for Employees',
      'Zero False Positives Guarantee',
      'Simple MX Record Cutover with 0 Downtime',
    ],
  },
  {
    id: 'sec-total',
    category: 'security',
    name: 'Total Email Defense Suite',
    tagline: 'Combined Inbound Filtering + Outbound SMTP + Automated Email Archiving',
    storage: 'Unlimited Inbound + 100K Outbound',
    monthlyPrice: 5.99,
    annualPrice: 4.49,
    originalPrice: 8.99,
    badge: 'All-in-One Shield',
    features: [
      'Both SpamTitan Inbound & Clean Outbound Relay Included',
      '10-Year Tamper-Proof Cryptographic Email Archiving',
      'DMARC Strict Enforcement Deployment Service',
      'Outbound Data Loss Prevention (DLP) & Credit Card Blocker',
      'Encrypted TLS 1.3 Mandatory Enforcement',
      '24/7 Security Operations Center (SOC) Monitoring',
    ],
  },
];

export const EmailHostingPage: React.FC<EmailHostingPageProps> = ({
  onAddToCart,
  onOpenLiveChat,
  onGoToDomains,
  initialCategory = 'webmail',
}) => {
  const [activeCategory, setActiveCategory] = useState<'webmail' | 'm365' | 'security'>(initialCategory);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [addedPlanId, setAddedPlanId] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const displayedPlans = ALL_EMAIL_PLANS.filter(p => p.category === activeCategory);

  const handleSelectPlan = (plan: EmailPlan) => {
    const isAnnual = billingCycle === 'annual';
    const price = isAnnual ? plan.annualPrice * 12 : plan.monthlyPrice;

    onAddToCart({
      id: `${plan.id}-${billingCycle}`,
      type: 'hosting',
      title: `${plan.name} Email`,
      subtitle: `${plan.storage} with Guaranteed Inbox Deliverability`,
      price: Number(price.toFixed(2)),
      period: isAnnual ? '1 year' : '1 month',
    });

    setAddedPlanId(plan.id);
    setTimeout(() => setAddedPlanId(null), 2500);
  };

  const emailFaqs = [
    {
      q: 'Why should I use a custom domain email instead of free Gmail or Yahoo?',
      a: 'A custom email address like you@yourcompany.com instantly builds trust and credibility with clients, suppliers, and partners. 74% of online shoppers state they do not trust business proposals coming from generic @gmail.com or @yahoo.com addresses.',
    },
    {
      q: 'Can I check my emails on my iPhone, iPad, Android, or Outlook?',
      a: 'Yes! Our email service is 100% compatible with all mobile and desktop mail clients including Apple Mail, Microsoft Outlook, Thunderbird, and Gmail app via standard IMAP/SMTP protocols with auto-discovery.',
    },
    {
      q: 'How does Hostxeon guarantee that my emails will not land in spam?',
      a: 'We use clean IP reputation pools, strict outgoing rate-limiting against spammers, and provide automated 1-click configuration for SPF, DKIM, and DMARC cryptographic records ensuring your emails reach the primary inbox.',
    },
    {
      q: 'Can I keep my existing domain name for email hosting?',
      a: 'Yes, you can connect any existing domain to our email hosting by simply updating your MX records, or register a new domain with us in under 2 minutes.',
    },
    {
      q: 'What is the difference between Webmail and Microsoft 365?',
      a: 'Hostxeon Webmail provides fast, clean, private email hosting with shared calendars and web/mobile access. Microsoft 365 includes native Exchange email, 1 TB OneDrive cloud storage, Microsoft Teams, and full downloadable desktop Office apps (Word, Excel, PowerPoint).',
    },
  ];

  return (
    <div className="bg-[#fcfdfd] text-[#111827] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#041d16] via-[#062c21] to-[#041d16] text-white pt-14 pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#008a45]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6">
            <Mail className="w-3.5 h-3.5 text-[#fed000]" />
            <span>Ad-Free Professional Mail with 99.9% Inbox Deliverability</span>
            <span className="bg-[#fed000] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">FROM £0.99/MO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Build Instant Credibility with <span className="text-[#fed000]">Professional Business Email</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto font-medium">
            Match your email address to your domain name (<span className="text-[#fed000] font-bold">you@yourcompany.com</span>). Complete with multi-layer spam protection, calendar sync, and mobile apps.
          </p>

          {/* Category Switcher Tabs */}
          <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mt-8 mb-2 shadow-lg flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveCategory('webmail')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === 'webmail' 
                  ? 'bg-white text-slate-950 shadow-md' 
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 text-[#008a45]" />
              <span>Custom Domain Webmail</span>
            </button>

            <button
              onClick={() => setActiveCategory('m365')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === 'm365' 
                  ? 'bg-white text-slate-950 shadow-md' 
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 text-[#008a45]" />
              <span>Microsoft 365 & Office</span>
            </button>

            <button
              onClick={() => setActiveCategory('security')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === 'security' 
                  ? 'bg-white text-slate-950 shadow-md' 
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#008a45]" />
              <span>Anti-Spam & Encryption</span>
            </button>
          </div>

          {/* Interactive Webmail Inbox Preview Card */}
          <div className="max-w-2xl mx-auto mt-8 rounded-2xl bg-white text-slate-900 shadow-2xl border border-white/20 p-5 text-left text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#008a45] text-white flex items-center justify-center font-black">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-slate-900">alex@quantumtech.co.uk</div>
                  <div className="text-[10px] text-emerald-600 font-bold">● Connected (IMAP SSL / TLS 1.3)</div>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-[#008a45] px-2.5 py-1 rounded-full">
                0 Spam Detected
              </span>
            </div>

            <div className="space-y-2 mt-3">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#008a45]" />
                  <div>
                    <span className="font-bold text-slate-900">Sarah Jenkins (Enterprise Partner)</span>
                    <p className="text-[11px] text-gray-500 truncate max-w-xs">Contract signed for Q3 European Expansion...</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold">10:42 AM</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div>
                    <span className="font-semibold text-slate-700">Stripe Billing Notifications</span>
                    <p className="text-[11px] text-gray-500 truncate max-w-xs">Payout of £4,890.00 is on the way to your account...</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold">09:15 AM</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 2. Interactive Pricing Plans */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-6 relative z-20 mb-16">
        {/* Toggle */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeCategory === 'webmail' && 'Custom Domain Webmail Plans'}
              {activeCategory === 'm365' && 'Microsoft 365 & Exchange Business Plans'}
              {activeCategory === 'security' && 'SpamTitan & Email Security Gateway Plans'}
            </h2>
            <p className="text-xs text-gray-500">Includes 30-day money-back guarantee and free migration support</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'annual' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
              }`}
            >
              Annual Billing (Save 35%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-gray-700'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* 3 Cards for Selected Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayedPlans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isAdded = addedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative ${
                  plan.popular
                    ? 'border-2 border-[#008a45] shadow-xl ring-4 ring-emerald-50'
                    : 'border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008a45] text-white text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.tagline}</p>

                  <div className="mt-4 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-[#008a45]" />
                    <span className="text-xs font-extrabold text-emerald-900">{plan.storage}</span>
                  </div>

                  <div className="mt-5 pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-gray-400 line-through">£{plan.originalPrice.toFixed(2)}</span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">£{price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 font-medium">/ user / mo</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                      {billingCycle === 'annual' ? 'Billed annually • Save 35%' : 'Billed monthly • Cancel anytime'}
                    </span>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <div className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Features included:</div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-[#008a45] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : plan.popular
                        ? 'bg-[#008a45] hover:bg-[#007338] text-white hover:shadow-lg'
                        : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <span>Choose {plan.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Features Breakdown */}
      <section className="bg-slate-50 py-16 border-y border-gray-200/80">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              BUILT FOR MODERN TEAMS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Why Professionals Choose Hostxeon Business Email
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Say goodbye to generic public mail accounts and keep full ownership of your corporate communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Sync on All Devices</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect seamlessly to your iPhone, iPad, Android, Outlook, Mac Mail, and Thunderbird with automatic IMAP sync.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">AI Spam & Phishing Shield</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Block up to 99.9% of junk mail, ransomware attachments, and spoofing attempts before they hit your team's inboxes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Shared Calendar & Contacts</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Schedule meetings with colleagues, create public contact address books, and share task lists directly within webmail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">100% Privacy & Zero Ads</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Unlike free public email providers, we never scan your inbox for advertising keywords. Your client data stays yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            COMMON INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Frequently Asked Questions About Business Email
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {emailFaqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-900 hover:text-[#008a45] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#008a45]' : 'text-gray-400'}`} />
              </button>
              {activeFaq === idx && (
                <p className="mt-2 text-xs text-gray-600 leading-relaxed animate-in fade-in duration-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Live chat helper strip */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#008a45] shrink-0" />
            <span className="font-semibold">Have existing emails at Google Workspace or cPanel to migrate?</span>
          </div>
          <button
            onClick={onOpenLiveChat}
            className="bg-[#008a45] hover:bg-[#007338] text-white font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            Chat with Migration Expert
          </button>
        </div>
      </section>
    </div>
  );
};
