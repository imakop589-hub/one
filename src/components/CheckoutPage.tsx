import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Building, 
  User, 
  ChevronRight, 
  ShoppingBag, 
  Zap,
  AlertCircle 
} from 'lucide-react';
import { CartItem } from '../types';
import { AppView } from './Navbar';
import { PageContainer } from './ui/PageContainer';
import { Heading, Text } from './ui/Typography';
import { Button } from './ui/Button';
import { FormField, FormGroup, Input, Select, Checkbox } from './ui/Form';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (view: AppView) => void;
  onOpenLiveChat?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  // Steps: 1: Basket & Addons, 2: Customer Info, 3: Payment, 4: Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Billing Cycle (1 year recommended vs 2 years vs monthly)
  const [billingCycle, setBillingCycle] = useState<'1yr' | '2yr' | 'monthly'>('1yr');

  // Customer Type
  const [customerType, setCustomerType] = useState<'individual' | 'company'>('individual');

  // Customer form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    vatNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
  });

  // Payment form fields
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'klarna' | 'direct_debit'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvc: '',
  });

  // Terms agreement
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeAutoRenew, setAgreeAutoRenew] = useState(true);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Inline Validation states (replacing alert())
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Add-ons selected
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    'domain-privacy': true,
    'backup-restore': false,
    'spam-shield': false,
  });

  const availableAddons = [
    {
      id: 'domain-privacy',
      title: 'Domain WHOIS Privacy & DNSSEC',
      desc: 'Mask your personal contact details from public WHOIS registry and prevent DNS spoofing hijacking.',
      price: 0.99,
      badge: 'Recommended',
    },
    {
      id: 'backup-restore',
      title: 'Automated Daily Snapshot & 1-Click Restore',
      desc: 'Automatic daily cloud backup of website files, MySQL databases and mailboxes with 30-day snapshot history.',
      price: 1.49,
      badge: 'Popular',
    },
    {
      id: 'spam-shield',
      title: 'AI Spam Filter & Outgoing Email Guard',
      desc: 'Zero-spam incoming mail filter plus SPF/DKIM delivery reputation protection.',
      price: 0.89,
    },
  ];

  // Processing simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('HX-98241');

  // Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const cycleFactor = billingCycle === '2yr' ? 1.8 : billingCycle === 'monthly' ? 0.2 : 1;
  const itemsSubtotal = rawSubtotal * cycleFactor;

  const addonsTotal = Object.entries(selectedAddons).reduce((acc, [id, selected]) => {
    if (!selected) return acc;
    const addon = availableAddons.find(a => a.id === id);
    return acc + (addon ? addon.price * (billingCycle === 'monthly' ? 1 : 12) : 0);
  }, 0);

  const subtotalBeforeDiscount = itemsSubtotal + addonsTotal;
  const discountAmount = (subtotalBeforeDiscount * discountPercent) / 100;
  const subtotal = Math.max(0, subtotalBeforeDiscount - discountAmount);
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'HXSAVE' || clean === 'SAVE20' || clean === 'ONECOM') {
      setDiscountPercent(20);
      setPromoMessage('Promo code applied: 20% Extra Discount!');
    } else if (clean === 'FREE') {
      setDiscountPercent(10);
      setPromoMessage('Promo code applied: 10% Extra Discount!');
    } else {
      setPromoMessage('Invalid coupon code. Try code: HXSAVE');
    }
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setPaymentError('Please agree to the Terms of Service and 30-Day Money-Back policy to proceed.');
      return;
    }
    setPaymentError(null);
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder = `HX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-8 sm:py-12" id="checkout-page">
      <PageContainer>
        
        {/* Top Progress & Trust Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-slate-900">Checkout</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Heading level={1} className="text-2xl sm:text-3xl">
                Secure Order Checkout
              </Heading>
              <span className="text-xs font-bold bg-[#e6f4ea] text-[#008a45] px-3 py-1 rounded-full border border-emerald-200">
                30-Day Money-Back Guarantee
              </span>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold bg-white p-1.5 sm:p-2 rounded-xl border border-gray-200/90 shadow-2xs">
            <button
              onClick={() => step > 1 && setStep(1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                step === 1 
                  ? 'bg-[#008a45] text-white shadow-xs' 
                  : step > 1 
                  ? 'text-emerald-700 hover:bg-emerald-50 cursor-pointer' 
                  : 'text-gray-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span>Basket</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

            <button
              onClick={() => step > 2 && setStep(2)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                step === 2 
                  ? 'bg-[#008a45] text-white shadow-xs' 
                  : step > 2 
                  ? 'text-emerald-700 hover:bg-emerald-50 cursor-pointer' 
                  : 'text-gray-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span>Details</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

            <button
              onClick={() => step > 3 && setStep(3)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                step === 3 
                  ? 'bg-[#008a45] text-white shadow-xs' 
                  : step > 3 
                  ? 'text-emerald-700 hover:bg-emerald-50 cursor-pointer' 
                  : 'text-gray-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main Form Column (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-8">
            
            {/* ================= STEP 1: BASKET & CONFIGURATION ================= */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <Heading level={2} className="text-xl sm:text-2xl">
                      1. Review Selected Packages
                    </Heading>
                    <Text variant="small" className="mt-1">
                      Configure your billing terms and tailor your security & performance add-ons.
                    </Text>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('webhosting')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Service</span>
                  </button>
                </div>

                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.length === 0 ? (
                    <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 space-y-4">
                      <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto stroke-1" />
                      <div className="font-bold text-gray-800">Your basket is currently empty</div>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Select one of our high-speed NVMe hosting packages or search for a custom domain.
                      </p>
                      <Button
                        onClick={() => onNavigate('webhosting')}
                        variant="primary"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Explore Web Hosting Plans
                      </Button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-5 rounded-2xl bg-[#fafdfb] border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center shrink-0 font-black">
                            <Zap className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm sm:text-base text-slate-900">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.subtitle || 'Tier-3 European Cloud NVMe + Free SSL'}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                                {billingCycle === '2yr' ? '2-Year Contract (Best Value)' : billingCycle === 'monthly' ? 'Monthly Flexible' : '1-Year Contract (Save 75%)'}
                              </span>
                              <span className="text-[11px] text-gray-400">• Free Setup</span>
                              <span className="text-[11px] text-emerald-700 font-semibold">• 15-day refund</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <div className="text-right">
                            <div className="font-['Baloo_2',cursive,sans-serif] text-2xl font-black text-slate-900">
                              £{(item.price * cycleFactor).toFixed(2)}
                            </div>
                            <div className="text-[10px] text-emerald-700 font-bold">Introductory Discount</div>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove from basket"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Term Period Selector */}
                {cartItems.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[#f8faf9] border border-gray-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Choose Subscription Term</span>
                      <span className="text-xs text-gray-500">Transparent renewals, cancel anytime</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('1yr')}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          billingCycle === '1yr' 
                            ? 'border-emerald-600 bg-white ring-2 ring-[#008a45]/20 shadow-xs' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900">1 Year (Annual)</span>
                          <span className="text-[10px] bg-[#fed000] text-slate-950 font-black px-2 py-0.5 rounded-full">POPULAR</span>
                        </div>
                        <p className="text-xs text-emerald-800 font-bold">Save up to 75% upfront</p>
                        <p className="text-[11px] text-gray-400 mt-1">Recommended for blogs & business</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBillingCycle('2yr')}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          billingCycle === '2yr' 
                            ? 'border-emerald-600 bg-white ring-2 ring-[#008a45]/20 shadow-xs' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900">2 Years (Best Value)</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">EXTRA 10%</span>
                        </div>
                        <p className="text-xs text-emerald-800 font-bold">Lock in lowest rate for 24 mo.</p>
                        <p className="text-[11px] text-gray-400 mt-1">Protection against price increases</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          billingCycle === 'monthly' 
                            ? 'border-emerald-600 bg-white ring-2 ring-[#008a45]/20 shadow-xs' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900">Monthly Flexible</span>
                          <span className="text-[10px] text-gray-400 font-semibold">Cancel anytime</span>
                        </div>
                        <p className="text-xs text-gray-600 font-bold">Pay per month</p>
                        <p className="text-[11px] text-gray-400 mt-1">No long-term commitment</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Popular Add-ons */}
                {cartItems.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Heading level={4} className="text-sm uppercase tracking-wider">
                          Recommended Security & Speed Enhancements
                        </Heading>
                        <Text variant="small" className="text-xs text-gray-500">
                          Toggle on with 1-click to protect your domain and data
                        </Text>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Instant Activation
                      </span>
                    </div>

                    <div className="space-y-3">
                      {availableAddons.map(addon => {
                        const isSelected = selectedAddons[addon.id] || false;
                        return (
                          <div 
                            key={addon.id}
                            onClick={() => setSelectedAddons(prev => ({ ...prev, [addon.id]: !prev[addon.id] }))}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                              isSelected 
                                ? 'border-[#008a45] bg-[#f7fbf8] shadow-2xs ring-1 ring-[#008a45]/30' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-[#008a45] text-white' : 'border border-gray-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs sm:text-sm text-slate-900">{addon.title}</span>
                                  {addon.badge && (
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">
                                      {addon.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{addon.desc}</p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-sm text-slate-900">£{addon.price.toFixed(2)}</span>
                              <span className="text-[11px] text-gray-500 font-medium">/mo.</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 1 Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="text-xs font-bold text-gray-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Store</span>
                  </button>

                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={cartItems.length === 0}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    id="checkout-step1-next-btn"
                  >
                    Continue to Customer Details
                  </Button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: CUSTOMER DETAILS ================= */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Heading level={2} className="text-xl sm:text-2xl">
                      2. Customer & Billing Details
                    </Heading>
                    <Text variant="small" className="mt-1">
                      Your hosting instance, invoices, and nameserver delegation will be registered to this identity.
                    </Text>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">* Required fields</span>
                </div>

                {/* Customer Type Toggle */}
                <div className="inline-flex p-1 bg-gray-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setCustomerType('individual')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      customerType === 'individual' ? 'bg-white text-slate-900 shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Private Person</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerType('company')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      customerType === 'company' ? 'bg-white text-slate-900 shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Company / Business</span>
                  </button>
                </div>

                {/* Inputs Grid (Standard 50px height, 8px radius) */}
                <FormGroup cols={2}>
                  <FormField label="First Name" required htmlFor="checkout-fn">
                    <Input
                      id="checkout-fn"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Sarah"
                    />
                  </FormField>

                  <FormField label="Last Name" required htmlFor="checkout-ln">
                    <Input
                      id="checkout-ln"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Jenkins"
                    />
                  </FormField>

                  <FormField 
                    label="Email Address" 
                    required 
                    htmlFor="checkout-email"
                    hint="Account login credentials and invoices will be sent here"
                  >
                    <Input
                      id="checkout-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                    />
                  </FormField>

                  <FormField 
                    label="Mobile Phone" 
                    required 
                    htmlFor="checkout-phone"
                    hint="For 2-factor authentication & urgent security notifications"
                  >
                    <Input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7911 123456"
                    />
                  </FormField>

                  {customerType === 'company' && (
                    <>
                      <FormField label="Company Registered Name" required htmlFor="checkout-company">
                        <Input
                          id="checkout-company"
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Acme Enterprises Ltd"
                        />
                      </FormField>

                      <FormField label="VAT / Tax ID (Optional)" htmlFor="checkout-vat">
                        <Input
                          id="checkout-vat"
                          type="text"
                          value={formData.vatNumber}
                          onChange={e => setFormData({ ...formData, vatNumber: e.target.value })}
                          placeholder="GB123456789"
                        />
                      </FormField>
                    </>
                  )}
                </FormGroup>

                <FormGroup cols={1}>
                  <FormField label="Billing Street Address" required htmlFor="checkout-address">
                    <Input
                      id="checkout-address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="124 High Street, Suite 4"
                    />
                  </FormField>
                </FormGroup>

                <FormGroup cols={2}>
                  <FormField label="City" required htmlFor="checkout-city">
                    <Input
                      id="checkout-city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="London"
                    />
                  </FormField>

                  <FormField label="Postal Code" required htmlFor="checkout-postal">
                    <Input
                      id="checkout-postal"
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="EC1A 1BB"
                    />
                  </FormField>
                </FormGroup>

                <FormGroup cols={1}>
                  <FormField label="Country" required htmlFor="checkout-country">
                    <Select
                      id="checkout-country"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                    >
                      <option value="United Kingdom">United Kingdom (£ GBP)</option>
                      <option value="United States">United States ($ USD)</option>
                      <option value="Denmark">Denmark (kr DKK)</option>
                      <option value="Sweden">Sweden (kr SEK)</option>
                      <option value="Norway">Norway (kr NOK)</option>
                      <option value="Germany">Germany (€ EUR)</option>
                      <option value="Netherlands">Netherlands (€ EUR)</option>
                      <option value="France">France (€ EUR)</option>
                      <option value="Spain">Spain (€ EUR)</option>
                      <option value="Ireland">Ireland (€ EUR)</option>
                    </Select>
                  </FormField>
                </FormGroup>

                {step2Error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{step2Error}</span>
                  </div>
                )}

                {/* Step 2 Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Basket</span>
                  </button>

                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    onClick={() => {
                      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
                        setStep2Error('Please enter your First Name, Last Name, and Email Address to proceed.');
                        return;
                      }
                      if (customerType === 'company' && !formData.companyName.trim()) {
                        setStep2Error('Please enter your Company Name to proceed.');
                        return;
                      }
                      setStep2Error(null);
                      setStep(3);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    id="checkout-step2-next-btn"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: PAYMENT METHOD ================= */}
            {step === 3 && (
              <form onSubmit={handleCompletePayment} className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <Heading level={2} className="text-xl sm:text-2xl">
                    3. Select Payment Method
                  </Heading>
                  <Text variant="small" className="mt-1">
                    All payment processing happens over 256-bit encrypted SSL. Backed by 15-day money-back guarantee.
                  </Text>
                </div>

                {/* 4 Payment Methods */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'card' 
                        ? 'border-[#008a45] bg-[#f7fbf8] ring-2 ring-[#008a45]/20 shadow-xs' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-[#008a45]" />
                    <span className="text-xs font-bold text-slate-900">Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'paypal' 
                        ? 'border-[#008a45] bg-[#f7fbf8] ring-2 ring-[#008a45]/20 shadow-xs' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-base font-black text-[#003087]">PayPal</span>
                    <span className="text-xs font-bold text-slate-900">1-Click Checkout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'klarna' 
                        ? 'border-[#008a45] bg-[#f7fbf8] ring-2 ring-[#008a45]/20 shadow-xs' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs font-black bg-pink-100 text-pink-700 px-2 py-0.5 rounded">Klarna.</span>
                    <span className="text-xs font-bold text-slate-900">Pay in 30 Days</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('direct_debit')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'direct_debit' 
                        ? 'border-[#008a45] bg-[#f7fbf8] ring-2 ring-[#008a45]/20 shadow-xs' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Building className="w-6 h-6 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">Direct Debit</span>
                  </button>
                </div>

                {/* Card Fields Form */}
                {paymentMethod === 'card' && (
                  <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
                    <FormField label="Card Number" required htmlFor="checkout-cardnum">
                      <Input
                        id="checkout-cardnum"
                        type="text"
                        required
                        value={cardData.cardNumber}
                        onChange={e => setCardData({ ...cardData, cardNumber: e.target.value })}
                        placeholder="4532 •••• •••• 8901"
                        rightIcon={
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black bg-blue-900 text-white px-1.5 py-0.5 rounded">VISA</span>
                            <span className="text-[10px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded">MC</span>
                          </div>
                        }
                      />
                    </FormField>

                    <FormGroup cols={2}>
                      <FormField label="Expiration (MM/YY)" required htmlFor="checkout-cardexpiry">
                        <Input
                          id="checkout-cardexpiry"
                          type="text"
                          required
                          value={cardData.expiry}
                          onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="08/28"
                        />
                      </FormField>

                      <FormField label="Security Code (CVC)" required htmlFor="checkout-cardcvc">
                        <Input
                          id="checkout-cardcvc"
                          type="text"
                          required
                          value={cardData.cvc}
                          onChange={e => setCardData({ ...cardData, cvc: e.target.value })}
                          placeholder="849"
                          maxLength={4}
                        />
                      </FormField>
                    </FormGroup>

                    <FormField label="Cardholder Name" required htmlFor="checkout-cardname">
                      <Input
                        id="checkout-cardname"
                        type="text"
                        required
                        value={cardData.cardHolder}
                        onChange={e => setCardData({ ...cardData, cardHolder: e.target.value })}
                        placeholder="SARAH JENKINS"
                      />
                    </FormField>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-8 rounded-xl bg-blue-50/60 border border-blue-200 text-center space-y-3">
                    <p className="text-xs text-blue-950 font-medium">
                      You will be directed to PayPal to complete your purchase securely. You will return to Hostxeon immediately afterward.
                    </p>
                    <div className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#ffc439] text-[#003087] font-black text-sm shadow-xs">
                      <span>Continue to PayPal</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'klarna' && (
                  <div className="p-8 rounded-xl bg-pink-50/60 border border-pink-200 text-center space-y-3">
                    <p className="text-xs text-pink-950 font-medium">
                      Get your website setup immediately today. Pay in full in 30 days or split into 3 interest-free payments via Klarna.
                    </p>
                  </div>
                )}

                {paymentMethod === 'direct_debit' && (
                  <div className="p-8 rounded-xl bg-gray-50 border border-gray-200 text-center space-y-2">
                    <p className="text-xs text-gray-700 font-medium">
                      Instant Bacs & SEPA Direct Debit. Safe, simple, and protected under the UK Direct Debit Guarantee.
                    </p>
                  </div>
                )}

                {/* Transparency Agreements */}
                <div className="space-y-3 pt-2">
                  <Checkbox
                    checked={agreeTerms}
                    onChange={e => {
                      setAgreeTerms(e.target.checked);
                      if (e.target.checked) setPaymentError(null);
                    }}
                    label={
                      <span>
                        I accept the Hostxeon Terms of Service and Privacy Policy, and I understand my <strong>30-day money-back guarantee</strong> applies from today.
                      </span>
                    }
                  />

                  <Checkbox
                    checked={agreeAutoRenew}
                    onChange={e => setAgreeAutoRenew(e.target.checked)}
                    label={
                      <span>
                        I agree to transparent automatic renewal. I can cancel anytime before the renewal date with 1 click from the Control Panel.
                      </span>
                    }
                  />
                </div>

                {paymentError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Step 3 Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Details</span>
                  </button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isProcessing}
                    leftIcon={<Lock className="w-4 h-4" />}
                    id="checkout-complete-pay-btn"
                  >
                    Pay £{total.toFixed(2)} & Activate Account
                  </Button>
                </div>
              </form>
            )}

            {/* ================= STEP 4: ORDER CONFIRMATION / SUCCESS ================= */}
            {step === 4 && (
              <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#008a45] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Payment Succeeded
                  </span>
                  <Heading level={2} className="text-3xl sm:text-4xl mt-3">
                    Welcome to Hostxeon!
                  </Heading>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
                    Your order <strong className="text-slate-900 font-black">#{orderNumber}</strong> is confirmed and your server instance is now being deployed in Europe.
                  </p>
                </div>

                {/* Real-time Provisioning Status Box */}
                <div className="max-w-lg mx-auto p-5 rounded-xl bg-[#fafdfb] border border-emerald-200 text-left space-y-3 text-xs">
                  <div className="flex items-center justify-between text-emerald-800 font-bold">
                    <span className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#008a45]" />
                      <span>Tier-3 NVMe Cloud Server Provisioned</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 px-2.5 py-0.5 rounded-full text-emerald-800">Done</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-800 font-bold">
                    <span className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#008a45]" />
                      <span>Free Wildcard SSL Certificate Generated</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 px-2.5 py-0.5 rounded-full text-emerald-800">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 font-semibold">
                    <span className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#008a45]" />
                      <span>Control Panel login details dispatched to {formData.email || 'your email'}</span>
                    </span>
                    <span className="text-[10px] bg-gray-200 px-2.5 py-0.5 rounded-full text-slate-700">Sent</span>
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="max-w-lg mx-auto p-5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-left space-y-2">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Total Paid Today (incl. 20% VAT):</span>
                    <span className="text-[#008a45] font-black text-sm">£{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Payment Method:</span>
                    <span className="uppercase font-semibold text-slate-800">{paymentMethod.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Risk-Free Guarantee:</span>
                    <span className="text-emerald-700 font-semibold">15-Day Unconditional Money-Back</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      onClearCart();
                      onNavigate('home');
                    }}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Go to Client Control Panel
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      onClearCart();
                      onNavigate('home');
                    }}
                  >
                    Return to Homepage
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Right Sticky Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-6 lg:sticky lg:top-24">
            <div className="border-b border-gray-100 pb-4">
              <Heading level={3} className="text-lg">Order Summary</Heading>
              <span className="text-xs text-gray-500">
                {cartItems.length} {cartItems.length === 1 ? 'Package' : 'Packages'} in basket
              </span>
            </div>

            {/* Items mini list */}
            <div className="space-y-3 text-xs">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-slate-800 font-semibold truncate">{item.title}</p>
                    <span className="text-[10px] text-gray-400">{billingCycle === 'monthly' ? 'Monthly renewal' : 'Annual prepaid'}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    £{(item.price * cycleFactor).toFixed(2)}
                  </span>
                </div>
              ))}

              {/* Active Addons */}
              {Object.entries(selectedAddons).map(([id, selected]) => {
                if (!selected) return null;
                const addon = availableAddons.find(a => a.id === id);
                if (!addon) return null;
                const cost = addon.price * (billingCycle === 'monthly' ? 1 : 12);
                return (
                  <div key={id} className="flex items-center justify-between gap-3 text-emerald-800">
                    <span className="truncate text-[11px]">+ {addon.title}</span>
                    <span className="font-bold shrink-0">£{cost.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Coupon (e.g. HXSAVE)"
                  className="flex-1 h-[42px] bg-gray-50 border border-gray-200 rounded-lg px-3 text-xs text-slate-900 uppercase focus:outline-hidden focus:ring-2 focus:ring-[#008a45]"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                >
                  Apply
                </Button>
              </div>
              {promoMessage && (
                <div className={`text-[10px] mt-1.5 font-bold ${discountPercent > 0 ? 'text-[#008a45]' : 'text-rose-500'}`}>
                  {promoMessage}
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">£{subtotalBeforeDiscount.toFixed(2)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-[#008a45] font-bold">
                  <span>Special Discount ({discountPercent}%)</span>
                  <span>-£{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>20% VAT</span>
                <span className="font-semibold text-slate-900">£{vat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-black text-slate-950 pt-3 border-t border-gray-200">
                <span>Total Due Today</span>
                <span className="text-[#008a45]">£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="p-3.5 bg-[#f6faf7] rounded-xl border border-emerald-200/80 text-[11px] text-gray-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#008a45]" />
                <span>Renewal Price Transparency</span>
              </div>
              <p className="leading-relaxed">
                Pay £{total.toFixed(2)} today. Renews automatically in {billingCycle === 'monthly' ? '1 month' : '1 year'} at standard price. You can cancel renewal anytime in 1 click before renewal.
              </p>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>15-Day Unconditional Money-Back</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>256-bit SSL Protected Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>Zero Hidden Fees or Setup Surcharges</span>
              </div>
            </div>

          </div>

        </div>

      </PageContainer>
    </div>
  );
};
