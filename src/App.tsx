import React, { useState } from 'react';
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
import { DomainResultsModal } from './components/DomainResultsModal';
import { LoginModal } from './components/LoginModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { LiveChatWidget } from './components/LiveChatWidget';
import { HeroSamplesPage } from './components/HeroSamplesPage';

import { CartItem, PortfolioWebsite } from './types';

export default function App() {
  // Page view state: default to 'home'
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
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

  // Cart state
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

  const handleSelectPortfolio = (site: PortfolioWebsite) => {
    setAidaPrompt({
      career: site.category,
      company: site.title,
      city: 'London',
      mode: 'example',
    });
    setIsAidaModalOpen(true);
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      <DomainResultsModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        searchQuery={domainSearchQuery}
        onAddToCart={handleAddToCart}
        onNavigateToDomains={(q) => {
          setDomainSearchQuery(q);
          setDomainTab('register');
          navigateTo('domains');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
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
