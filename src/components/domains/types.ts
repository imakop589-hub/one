export interface TldSearchItem {
  tld: string;
  price: number;
  regularPrice: number;
  transferPrice: number;
  discountPct: number;
  badge?: string;
  category: 'Popular' | 'Tech' | 'Business' | 'Deals';
  popular?: boolean;
}

export const EXTENSIONS_CATALOG: TldSearchItem[] = [
  { tld: '.com', price: 6.99, regularPrice: 15.99, transferPrice: 8.49, discountPct: 56, popular: true, badge: 'Best Seller', category: 'Popular' },
  { tld: '.co.uk', price: 0.99, regularPrice: 8.99, transferPrice: 7.49, discountPct: 89, popular: true, badge: 'Flash Sale', category: 'Deals' },
  { tld: '.uk', price: 0.99, regularPrice: 9.99, transferPrice: 7.49, discountPct: 90, popular: true, badge: '89% OFF', category: 'Deals' },
  { tld: '.one', price: 1.49, regularPrice: 18.99, transferPrice: 12.99, discountPct: 92, badge: 'Special Offer', category: 'Deals' },
  { tld: '.ai', price: 54.99, regularPrice: 89.99, transferPrice: 59.99, discountPct: 39, popular: true, badge: 'AI Trend', category: 'Tech' },
  { tld: '.io', price: 29.99, regularPrice: 49.99, transferPrice: 34.99, discountPct: 40, popular: true, badge: 'Developer Choice', category: 'Tech' },
  { tld: '.store', price: 1.99, regularPrice: 29.99, transferPrice: 19.99, discountPct: 93, popular: true, badge: 'Hot Deal', category: 'Business' },
  { tld: '.online', price: 1.49, regularPrice: 28.99, transferPrice: 18.99, discountPct: 95, badge: '95% OFF', category: 'Deals' },
  { tld: '.net', price: 9.49, regularPrice: 17.99, transferPrice: 11.99, discountPct: 47, category: 'Popular' },
  { tld: '.org', price: 8.99, regularPrice: 16.99, transferPrice: 10.99, discountPct: 47, popular: true, category: 'Popular' },
  { tld: '.tech', price: 2.99, regularPrice: 34.99, transferPrice: 21.99, discountPct: 91, category: 'Tech' },
  { tld: '.dev', price: 11.99, regularPrice: 19.99, transferPrice: 13.99, discountPct: 40, category: 'Tech' },
  { tld: '.app', price: 12.49, regularPrice: 18.99, transferPrice: 14.49, discountPct: 34, category: 'Tech' },
  { tld: '.co', price: 7.99, regularPrice: 24.99, transferPrice: 16.99, discountPct: 68, category: 'Business' },
  { tld: '.agency', price: 4.99, regularPrice: 32.99, transferPrice: 22.99, discountPct: 85, category: 'Business' },
  { tld: '.shop', price: 2.49, regularPrice: 34.99, transferPrice: 23.99, discountPct: 93, category: 'Business' },
];

export async function checkLiveDnsAvailability(domain: string): Promise<boolean> {
  const clean = domain.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
  const base = clean.split('.')[0];
  
  // Known list of major registered brand domains & popular single-word domains
  const takenKnown = [
    'google', 'apple', 'facebook', 'amazon', 'microsoft', 'hostxeon', 'openai',
    'netflix', 'twitter', 'instagram', 'github', 'godaddy', 'namecheap', 'youtube',
    'yahoo', 'linkedin', 'tiktok', 'spotify', 'cloudflare', 'adobe', 'meta', 'x',
    'chatgpt', 'whatsapp', 'reddit', 'wikipedia', 'ebay', 'cnn', 'bbc', 'walmart',
    'target', 'nike', 'adidas', 'tesla', 'paypal', 'stripe', 'uber', 'airbnb',
    'shopify', 'wordpress', 'wix', 'squarespace', 'hostinger', 'bluehost', 'siteground',
    'ibm', 'intel', 'dell', 'hp', 'cisco', 'oracle', 'salesforce', 'slack', 'zoom',
    'dropbox', 'pinterest', 'snapchat', 'twitch', 'flickr', 'medium', 'quora', 'tumblr',
    'pakistan', 'india', 'london', 'newyork', 'paris', 'dubai', 'tokyo', 'berlin',
    'bmw', 'mercedes', 'audi', 'toyota', 'honda', 'ford', 'ferrari', 'porsche',
    'hosting', 'domain', 'server', 'cloud', 'website', 'security', 'tech', 'online',
    'shop', 'store', 'news', 'bank', 'crypto', 'travel', 'hotel', 'food', 'mail'
  ];
  if (takenKnown.includes(base)) return false;

  try {
    // 1. Check Google DNS over HTTPS with SOA record (Authoritative start of zone)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(clean)}&type=SOA`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      // Status 3 is NXDOMAIN (domain does NOT exist in global DNS -> Available)
      if (data.Status === 3) {
        return true; // Available
      }
      // Status 0 (NOERROR) means domain is registered in the registry
      if (data.Status === 0) {
        return false; // Taken
      }
    }
  } catch {
    // Attempt Cloudflare DoH fallback
  }

  try {
    const controllerCf = new AbortController();
    const timeoutIdCf = setTimeout(() => controllerCf.abort(), 2500);
    const cfRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(clean)}&type=SOA`, {
      headers: { Accept: 'application/dns-json' },
      signal: controllerCf.signal,
    });
    clearTimeout(timeoutIdCf);
    if (cfRes.ok) {
      const cfData = await cfRes.json();
      if (cfData.Status === 3) {
        return true; // Available
      }
      if (cfData.Status === 0) {
        return false; // Taken
      }
    }
  } catch {
    // Offline or network error
  }

  // Short 1-3 letter names on .com/.net are virtually all taken
  if ((clean.endsWith('.com') || clean.endsWith('.net') || clean.endsWith('.org')) && base.length <= 3) {
    return false;
  }

  return true;
}
