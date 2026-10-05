import React, { useState, useEffect } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { WordPressHostingPage } from './components/WordPressHostingPage';
import { WebHostingPage } from './components/WebHostingPage';
import { DomainsPage } from './components/DomainsPage';
import { CloudHostingPage } from './components/CloudHostingPage';
import { VpsHostingPage } from './components/VpsHostingPage';
import { EmailHostingPage } from './components/EmailHostingPage';
import { Footer } from './components/Footer';

import { AidaGeneratorModal } from './components/AidaGeneratorModal';
import { LoginModal } from './components/LoginModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { LiveChatWidget } from './components/LiveChatWidget';
import { HeroSamplesPage } from './components/HeroSamplesPage';
import { AdminRoot } from './components/admin/AdminRoot';
import { CmsPageResolver } from './components/CmsPageResolver';

import { CartItem, PortfolioWebsite } from './types';

const VALID_VIEWS: AppView[] = ['home', 'domains', 'webhosting', 'wordpress', 'cloud', 'vps', 'email', 'checkout', 'hero-samples', 'admin'];

export default function App() {
  // Read initial view from URL hash to support direct link & refresh
  const getInitialView = (): AppView => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '') as AppView;
      if (hash) {
        return hash;
      }
    }
    return 'home';
  };

  // Page view state: defaults to URL hash or 'home'
  const [currentView, setCurrentView] = useState<AppView>(getInitialView);

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [domainSearchQuery, setDomainSearchQuery] = useState('');
  const [domainTab, setDomainTab] = useState<'register' | 'transfer' | 'whois'>('register');
  const [emailCategory, setEmailCategory] = useState<'webmail' | 'm365' | 'security'>('webmail');
  
  // Aida Builder modal
  const [isAidaModalOpen, setIsAidaModalOpen] = useState(false);
  const [aidaPrompt, setAidaPrompt] = useState({
    career: 'Japanese restaurant',
    company: 'Kaysuki',
    city: 'Amsterdam',
    mode: 'example',
  });

  // Cart state: starts clean and empty for new visitors
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Synchronize route changes with browser Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') as AppView;
      if (hash) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if already exists
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSearchDomain = (query: string) => {
    setDomainSearchQuery(query);
    setDomainTab('register');
    navigateTo('domains');
  };

  const handleGenerateWebsite = (promptData: {
    career: string;
    company: string;
    city: string;
    mode: string;
  }) => {
    setAidaPrompt(promptData);
    setIsAidaModalOpen(true);
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    const targetHash = view === 'home' ? '' : `#${view}`;
    if (window.location.hash !== targetHash) {
      if (window.history.pushState) {
        window.history.pushState(null, '', targetHash || window.location.pathname);
      } else {
        window.location.hash = targetHash;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin') {
    return (
      <AdminRoot
        onBackToPublicSite={() => navigateTo('home')}
        onNavigatePublicPage={(slug) => navigateTo(slug as AppView)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-[#1a1a1a] relative">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLiveChat={() => setIsChatOpen(true)}
        onOpenBuilder={() => setIsAidaModalOpen(true)}
        onOpenDomainTransfer={() => {
          setDomainTab('transfer');
          navigateTo('domains');
        }}
        onOpenDomainSearch={() => {
          setDomainSearchQuery('');
          setDomainTab('register');
          navigateTo('domains');
        }}
        onOpenWhoisLookup={() => {
          setDomainTab('whois');
          navigateTo('domains');
        }}
        onOpenEmailCategory={(cat) => {
          setEmailCategory(cat);
          navigateTo('email');
        }}
        cartCount={cartItems.length}
        currentView={currentView}
        onChangeView={navigateTo}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'domains' && (
          <DomainsPage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onGoToHosting={() => navigateTo('webhosting')}
            initialTab={domainTab}
            initialQuery={domainSearchQuery}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
        {currentView === 'webhosting' && (
          <WebHostingPage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onOpenBuilder={() => setIsAidaModalOpen(true)}
            onGoToWordPress={() => navigateTo('wordpress')}
          />
        )}
        {currentView === 'wordpress' && (
          <WordPressHostingPage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onOpenBuilder={() => setIsAidaModalOpen(true)}
            onGoToWebHosting={() => navigateTo('webhosting')}
          />
        )}
        {currentView === 'cloud' && (
          <CloudHostingPage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onGoToWebHosting={() => navigateTo('webhosting')}
          />
        )}
        {currentView === 'vps' && (
          <VpsHostingPage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
          />
        )}
        {currentView === 'email' && (
          <EmailHostingPage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onGoToDomains={() => navigateTo('domains')}
            initialCategory={emailCategory}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onNavigate={navigateTo}
            onOpenLiveChat={() => setIsChatOpen(true)}
          />
        )}
        {currentView === 'home' && (
          <HomePage
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onOpenBuilder={() => setIsAidaModalOpen(true)}
            onNavigate={navigateTo}
            onSearchDomain={handleSearchDomain}
          />
        )}
        {currentView === 'hero-samples' && (
          <HeroSamplesPage
            onNavigate={navigateTo}
            onOpenPricing={() => navigateTo('webhosting')}
            onSearchDomain={handleSearchDomain}
          />
        )}
        {!['home', 'domains', 'webhosting', 'wordpress', 'cloud', 'vps', 'email', 'checkout', 'hero-samples'].includes(currentView) && (
          <CmsPageResolver
            slug={currentView}
            onAddToCart={handleAddToCart}
            onOpenLiveChat={() => setIsChatOpen(true)}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Synchronized Footer: Strictly matches Header services & working modals */}
      <Footer 
        onChangeView={navigateTo}
        onOpenLiveChat={() => setIsChatOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDomainTransfer={() => {
          setDomainTab('transfer');
          navigateTo('domains');
        }}
        onOpenDomainSearch={() => {
          setDomainSearchQuery('');
          setDomainTab('register');
          navigateTo('domains');
        }}
        onOpenWhoisLookup={() => {
          setDomainTab('whois');
          navigateTo('domains');
        }}
      />

      {/* Modals & Interactive Overlays */}
      <AidaGeneratorModal
        isOpen={isAidaModalOpen}
        onClose={() => setIsAidaModalOpen(false)}
        promptData={aidaPrompt}
        onAddToCart={handleAddToCart}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenBuilder={() => setIsAidaModalOpen(true)}
      />

      {/* Cart Drawer: Right-side popup */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
      />

      {/* Live Chat Widget: Shifts to opposite side (left) when cart is open so it never blocks buttons */}
      <LiveChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        isCartOpen={isCartOpen}
      />
    </div>
  );
}
