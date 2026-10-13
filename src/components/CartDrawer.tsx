import React from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, ArrowRight, Globe, Server, Mail } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  const handleCheckoutClick = () => {
    onClose();
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'domain':
        return Globe;
      case 'email':
        return Mail;
      default:
        return Server;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8F0] relative z-[101] animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center border border-emerald-100">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-[#0F172A] leading-none">Your Basket</h3>
                <span className="bg-emerald-50 text-[#008744] border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs text-[#475569] mt-0.5">Review items & proceed to order</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-medium text-slate-400 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                title="Clear all items"
              >
                Clear all
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              id="close-cart-drawer"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3 divide-y divide-[#E2E8F0]">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-[#475569] space-y-4">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-base text-[#0F172A]">Your basket is currently empty</div>
                <p className="text-xs text-[#475569] max-w-xs mx-auto leading-relaxed">
                  Search for a domain name or select a high-speed web hosting plan to get started.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#008744] hover:bg-[#006E37] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Browse Hosting Plans</span>
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const ItemIcon = getItemIcon(item.type);
              return (
                <div key={item.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-50 text-[#475569] group-hover:text-[#008744] flex items-center justify-center shrink-0 transition-colors mt-0.5 border border-[#E2E8F0]">
                      <ItemIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-[#0F172A] truncate leading-snug">{item.title}</h4>
                      {item.subtitle && (
                        <p className="text-xs text-[#475569] line-clamp-2 mt-0.5 leading-relaxed">{item.subtitle}</p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="text-xs bg-emerald-50 text-[#008744] font-medium px-2 py-0.5 rounded border border-emerald-200">
                          {item.period}
                        </span>
                        {item.badge && (
                          <span className="text-xs bg-amber-50 text-amber-800 font-medium px-2 py-0.5 rounded border border-amber-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-bold text-sm text-[#0F172A] tabular-nums">
                      {item.price === 0 ? 'FREE' : `£${item.price.toFixed(2)}`}
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Checkout Summary Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4 shrink-0">
            <div className="space-y-1.5 text-xs text-[#475569]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#0F172A] tabular-nums">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20% UK Standard)</span>
                <span className="font-semibold text-[#0F172A] tabular-nums">£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#0F172A] pt-2.5 border-t border-[#E2E8F0]">
                <span>Total Due Today</span>
                <span className="text-[#008744] text-lg tabular-nums">£{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full bg-[#008744] hover:bg-[#006E37] text-white font-semibold py-3 rounded-lg text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              id="cart-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#475569]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008744]" />
              <span>30-Day Money-Back Guarantee • 256-bit Encrypted Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
