# Hostxeon Website Audit

Comprehensive audit of the existing Hostxeon web project, conducted across architecture, routing, domain/WHOIS, cart/checkout, mobile layout, dependencies, TypeScript, accessibility, and SEO.

---

## 1. Critical Issues

### Issue 1.1: Native Browser `alert()` Used in Checkout Flow
* **File path:** `/src/components/CheckoutPage.tsx`
* **Component/function name:** `CheckoutPage` -> `handleCompletePayment` (line 149)
* **Exact problem:** When the user attempts to submit the payment order without ticking the agreement checkbox, the code calls `alert('Please agree to the Terms of Service and Money-Back policy to proceed.');`.
* **Why it is a problem:** Native `alert()` modals freeze the JavaScript execution thread, violate sandboxed iframe execution guidelines, degrade user experience, and look unstyled compared to the Hostxeon design system.
* **Recommended fix:** Replace `alert()` with an inline error message banner displayed directly above the submit button and checkbox with high contrast, auto-scroll, and red icon alert badge.
* **Priority:** Critical

### Issue 1.2: Cart Automatically Populated With Default Starter Plan For New Visitors
* **File path:** `/src/App.tsx`
* **Component/function name:** `App` -> `cartItems` state (lines 45-54)
* **Exact problem:** The cart state initializes with a pre-added item:
  ```ts
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'default-starter',
      type: 'hosting',
      title: 'Starter Web Hosting Plan',
      subtitle: '100 GB NVMe Storage + Free Domain Voucher + SSL',
      price: 1.99,
      period: '12 months prepaid',
    },
  ]);
  ```
* **Why it is a problem:** Visitors arriving on the homepage unexpectedly find a £1.99 item already in their shopping basket with the badge showing "(1)". This creates distrust and confusion unless the user explicitly chose the plan.
* **Recommended fix:** Initialize `cartItems` with an empty array `[]`. The existing `CartDrawer` already contains an empty basket state with an "Explore Products" button.
* **Priority:** Critical

---

## 2. High Priority Issues

### Issue 2.1: Navigation Relies Exclusively on Ephemeral React State Without URL Synchronization
* **File path:** `/src/App.tsx`
* **Component/function name:** `App` -> `currentView`, `navigateTo`
* **Exact problem:** The current active view (`home`, `domains`, `webhosting`, `wordpress`, `cloud`, `vps`, `email`, `checkout`) is stored solely in memory via `useState<AppView>('home')`.
* **Why it is a problem:**
  1. If a visitor refreshes the page on `/` while browsing VPS or WordPress hosting, they are thrown back to the homepage.
  2. The browser Back and Forward buttons do not work between visited views.
  3. Visitors cannot bookmark or share links to specific services (e.g. `hostxeon.com/#domains` or `hostxeon.com/#vps`).
* **Recommended fix:** Synchronize `currentView` with `window.location.hash` and a `hashchange` event listener in `App.tsx`. This preserves the existing architecture 100% (zero extra router libraries needed), while instantly enabling browser back/forward, deep linking, and page refresh persistence.
* **Priority:** High

### Issue 2.2: WHOIS Inspector Uses DNS Records & Heuristics Rather Than True RDAP/WHOIS Protocol
* **File path:** `/src/components/domains/DomainWhoisView.tsx`
* **Component/function name:** `DomainWhoisView` -> `deduceRegistrar`, `executeWhoisLookup` (lines 74-88)
* **Exact problem:** The WHOIS lookup queries Google DNS (`dns.google/resolve`) for NS and A records, then runs string pattern matching (`deduceRegistrar`) to guess the registrar name (e.g. checking if nameservers contain "cloudflare", "godaddy", etc.) and simulates creation dates.
* **Why it is a problem:** DNS records verify zone nameservers and IP routing, but they do NOT provide authoritative WHOIS/RDAP registrar information, true domain owner privacy status, or official creation/expiration timestamps. Presenting heuristic DNS data as certified WHOIS data is misleading.
* **Recommended fix:**
  1. Clearly label the feature in the UI as **"Live DNS & Domain Inspector"** with an informative disclosure badge: *"Authoritative registry data powered by DNS-over-HTTPS. Connect a dedicated ICANN RDAP/WHOIS registrar API key via environment variables for full registry ownership audits."*
  2. Structure the lookup logic to support an optional real RDAP/WHOIS endpoint (via `import.meta.env.VITE_WHOIS_API_URL` or `/api/whois`) while keeping the DNS inspector as a fallback.
* **Priority:** High

---

## 3. Medium Priority Issues

### Issue 3.1: Dead / Unreachable Component: `DomainResultsModal`
* **File path:** `/src/components/DomainResultsModal.tsx` & `/src/App.tsx`
* **Component/function name:** `App` -> `DomainResultsModal`, `isDomainModalOpen`
* **Exact problem:** `DomainResultsModal` is imported and mounted in `App.tsx` with `isOpen={isDomainModalOpen}`, but `setIsDomainModalOpen(true)` is never invoked anywhere in the codebase. All domain search forms redirect directly to `DomainsPage` (`DomainResultsView`).
* **Why it is a problem:** Dead component code that increases bundle weight and creates confusion during maintenance.
* **Recommended fix:** Document this dead modal in the audit. Either safely remove its orphan instance from `App.tsx` or retain it strictly if pop-up search results are requested.
* **Priority:** Medium

### Issue 3.2: Floating Hero Samples Quick Jump Button Left Over from Previous Turn
* **File path:** `/src/App.tsx`
* **Component/function name:** Floating button lines 278-287
* **Exact problem:** A floating fixed button labeled `✨ View 15 Hero Samples` was persisting in the lower left corner.
* **Why it is a problem:** Distracts from production hosting sales funnel and was previously requested to be removed.
* **Recommended fix:** Remove the floating button from `App.tsx`.
* **Priority:** Medium

### Issue 3.3: Inconsistent Guarantee Period Across Marketing Sections
* **File path:** `/src/components/HomePage.tsx`, `/src/components/HeroSection.tsx`, `/src/components/Footer.tsx`
* **Component/function name:** Money-back guarantee badges
* **Exact problem:** `HeroSection.tsx` states "30-Day Money-Back Guarantee", whereas `HomePage.tsx` (lines 244, 863) and `Footer.tsx` (line 51) state "15-day money-back guarantee".
* **Why it is a problem:** Conflicting terms erode trust at checkout.
* **Recommended fix:** Standardize to a 30-day money-back guarantee across all components to match the Hero guarantee and industry standards.
* **Priority:** Medium

---

## 4. Low Priority Issues

### Issue 4.1: Broken In-Page Hash Links (`#forgot`, `#builder`, `#features`)
* **File path:** `/src/components/LoginModal.tsx`, `/src/components/Navbar.tsx`, `/src/components/TestimonialQuote.tsx`
* **Component/function name:** Anchor tags with `#` targets
* **Exact problem:**
  - `LoginModal.tsx:89`: `<a href="#forgot">Forgot password?</a>` does nothing except alter browser URL.
  - `LoginModal.tsx:119`: `<a href="#builder">` closes the modal without opening the builder.
  - `Navbar.tsx:234`: `<a href="#builder">` in top announcement does not invoke `onOpenBuilder`.
  - `TestimonialQuote.tsx:36`: `<a href="#features">` points to an anchor ID that does not exist in the DOM.
* **Why it is a problem:** Users clicking these links experience no action or unexpected jumps.
* **Recommended fix:**
  1. Add an interactive "Forgot password" view toggle inside `LoginModal.tsx` that lets users input their email and receive simulated password reset instructions.
  2. Wire `onOpenBuilder` to the builder links.
  3. Change `#features` to `#why-choose-us` which matches the actual section ID in `HomePage.tsx`.
* **Priority:** Low

### Issue 4.2: Duplicate and Unused Package Declarations in `package.json`
* **File path:** `/package.json`
* **Component/function name:** `dependencies` vs `devDependencies`
* **Exact problem:**
  1. `"vite": "^6.2.3"` is declared twice (in `dependencies` line 20 and `devDependencies` line 32).
  2. `"express": "^4.21.2"` and `"dotenv": "^17.2.3"` are declared in `dependencies`, but there is no `server.ts` or Node backend; the app runs as a pure Vite SPA.
* **Why it is a problem:** Redundant dependencies enlarge `package.json` and slow down `npm install`.
* **Recommended fix:** Remove duplicate `"vite"` from `dependencies` (keep in `devDependencies`), remove unused backend dependencies if not running an Express server.
* **Priority:** Low

---

## 5. UI/UX Issues

* **File path:** `/src/components/LiveChatWidget.tsx` & `/src/components/CartDrawer.tsx`
* **Component/function name:** Floating action buttons layout
* **Exact problem:** Fixed floating widgets (Live Chat on right, Cart Drawer on right) previously risked visual collision.
* **Why it is a problem:** If both the cart drawer and live chat window open, the user cannot easily reach the chat or checkout CTA.
* **Recommended fix:** `LiveChatWidget` is dynamically shifted to `bottom-5 left-5` whenever `isCartOpen` is true. Ensure this transition remains smooth and never overlaps with mobile viewport edges.
* **Priority:** Medium

---

## 6. Responsive/Mobile Issues

* **File path:** `/src/components/domains/DomainLandingView.tsx` & `/src/components/DomainsPage.tsx`
* **Component/function name:** Mobile horizontal sub-navigation
* **Exact problem:** On 375px/390px mobile screens, the sticky domain navigation pill bar (`Register`, `Transfer`, `WHOIS`) requires horizontal scrolling without a visible scroll indicator.
* **Why it is a problem:** Mobile users may not realize there are 3 tabs available unless scroll indicators are clear.
* **Recommended fix:** Add `scrollbar-none overflow-x-auto` with gentle gradient fade hints on mobile to indicate scrollability.
* **Priority:** Low

---

## 7. Routing Issues

* **File path:** `/src/App.tsx`
* **Component/function name:** URL Hash Synchronization
* **Exact problem:** Full URL routing was omitted in favor of local `useState`.
* **Why it is a problem:** Breaks standard browser history, bookmarking, and refresh behavior.
* **Recommended fix:** Add hash-based routing synchronizer:
  ```ts
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      const validViews: AppView[] = ['home', 'domains', 'webhosting', 'wordpress', 'cloud', 'vps', 'email', 'checkout'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  ```
* **Priority:** High

---

## 8. Domain/WHOIS Issues

* **File path:** `/src/components/domains/DomainWhoisView.tsx` & `src/components/domains/types.ts`
* **Component/function name:** Live DNS vs WHOIS disclosure
* **Exact problem:** Public DNS-over-HTTPS queries are utilized to find NameServers and A records. Registrar data is heuristically inferred.
* **Why it is a problem:** Can mislead users looking for certified registrar ownership documents.
* **Recommended fix:** Keep the fast, real Google DoH DNS resolution, but accurately label it as DNS record lookup with a disclaimer and provide an API bridge pattern for real RDAP.
* **Priority:** High

---

## 9. Cart/Checkout Issues

* **File path:** `/src/components/CheckoutPage.tsx`
* **Component/function name:** Form validation and alert replacement
* **Exact problem:** Step 3 uses `alert()` when terms are unchecked; Step 2 customer form fields lack inline required validation feedback before advancing to Step 3.
* **Why it is a problem:** User can advance to Step 3 with empty customer details.
* **Recommended fix:** Enforce step validation so First Name, Last Name, and valid Email are checked before proceeding to payment, showing accessible error notices.
* **Priority:** High

---

## 10. TypeScript/Code Issues

* **File path:** `/tsconfig.json`
* **Component/function name:** `compilerOptions`
* **Exact problem:** `strict: true` is not enabled in `tsconfig.json`.
* **Why it is a problem:** Allows implicit `any` types and unchecked null pointers.
* **Recommended fix:** Do NOT blindly enable `strict: true` immediately as it could trigger hundreds of cascaded typing errors across all pages; instead, enforce strict type safety incrementally in domain, cart, and checkout components.
* **Priority:** Medium

---

## 11. Dependency Issues

* **File path:** `/package.json`
* **Component/function name:** `dependencies`
* **Exact problem:** Duplicate `"vite"` dependency listed in both `dependencies` and `devDependencies`.
* **Why it is a problem:** Potential version mismatch and unnecessary clutter.
* **Recommended fix:** Remove `"vite"` from `dependencies` so it remains exclusively in `devDependencies`.
* **Priority:** Low

---

## 12. Performance Issues

* **File path:** `/src/components/domains/types.ts`
* **Component/function name:** `checkLiveDnsAvailability`
* **Exact problem:** DNS fetch calls had an AbortController with a 2500ms timeout, which is good, but without an in-memory cache for repeated lookups of the same domain in a single session.
* **Why it is a problem:** Typing and re-searching causes unnecessary redundant network queries.
* **Recommended fix:** Introduce a simple lightweight session map cache for verified domains.
* **Priority:** Low

---

## 13. Accessibility Issues

* **File path:** `/src/components/Navbar.tsx`, `/src/components/Footer.tsx`, `/src/components/CartDrawer.tsx`
* **Component/function name:** Icon buttons without `aria-label`
* **Exact problem:** Several icon-only buttons (close drawer, mobile hamburger, live chat toggle) lacked descriptive `aria-label` tags.
* **Why it is a problem:** Screen readers announce unlabelled buttons.
* **Recommended fix:** Add descriptive `aria-label` attributes to all icon-only buttons.
* **Priority:** Medium

---

## 14. SEO Issues

* **File path:** `/index.html`
* **Component/function name:** Meta tags & Structured Data
* **Exact problem:** Meta tags and OpenGraph tags are present, but canonical URL and JSON-LD organization schema were missing.
* **Why it is a problem:** Search engines benefit from rich snippet structured data for web hosting services.
* **Recommended fix:** Add basic Organization/WebSite JSON-LD structured data to `<head>`.
* **Priority:** Low

---

## 15. Recommended Fix Order

1. **Phase 1 Fixes (Critical & High Priority):**
   - Initialize `cartItems` as `[]` in `App.tsx` (remove unwanted default product).
   - Implement hash-based URL routing in `App.tsx` to support refresh, deep-linking, and browser back/forward buttons.
   - Replace `alert()` in `CheckoutPage.tsx` with Hostxeon inline error banner and enforce customer form field validation.
   - Add transparent disclosure and RDAP API readiness to `DomainWhoisView.tsx`.
2. **Phase 2 Fixes (Medium & UI/UX Priority):**
   - Remove dead `DomainResultsModal` instance and leftover floating hero button.
   - Standardize 30-day money-back guarantee messaging across HomePage, HeroSection, and Footer.
   - Add interactive Forgot Password flow in `LoginModal.tsx`.
3. **Phase 3 Fixes (Code & Maintenance):**
   - Clean up duplicate `vite` in `package.json`.
   - Fix broken in-page hash links (`#features` -> `#why-choose-us`, `#builder` -> `onOpenBuilder`).
   - Add missing `aria-label` attributes for accessibility.
   - Verify with `tsc --noEmit` and `npm run build`.
