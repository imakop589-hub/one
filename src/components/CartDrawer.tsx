import React from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, ArrowRight, Lock, Globe, Server, Mail, Sparkles } from 'lucide-react';
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
      className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 relative z-[101] animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Always on top, clearly visible */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#008a45] flex items-center justify-center border border-emerald-100">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-slate-900 leading-none">Your Basket</h3>
                <span className="bg-emerald-100 text-[#008a45] text-[11px] font-black px-2 py-0.5 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">Review items & proceed to order</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-semibold text-gray-400 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title="Clear all items"
              >
                Clear all
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-slate-950 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              id="close-cart-drawer"
              aria-label="Close basket"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3 divide-y divide-gray-100">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-gray-500 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 mx-auto">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <div className="space-y-1">
                <div className="font-extrabold text-base text-slate-900">Your basket is currently empty</div>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Search for a domain name or select a high-speed web hosting plan to get started.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#008a45] hover:bg-[#007038] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Products</span>
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const ItemIcon = getItemIcon(item.type);
              return (
                <div key={item.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-emerald-50 text-gray-600 group-hover:text-[#008a45] flex items-center justify-center shrink-0 transition-colors mt-0.5 border border-gray-200/60">
                      <ItemIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-slate-900 truncate leading-snug">{item.title}</h4>
                      {item.subtitle && (
                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{item.subtitle}</p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] bg-emerald-50 text-[#008a45] font-bold px-2 py-0.5 rounded-md border border-emerald-200/60">
                          {item.period}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-200/60">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-black text-sm text-slate-950">
                      {item.price === 0 ? 'FREE' : `£${item.price.toFixed(2)}`}
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
          <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4 shrink-0">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20% UK Standard)</span>
                <span className="font-bold text-slate-900">£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 pt-2.5 border-t border-gray-200">
                <span>Total Due Today</span>
                <span className="text-[#008a45] text-lg">£{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full bg-[#fed000] hover:bg-[#ebbe00] text-slate-950 font-black py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              id="cart-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008a45]" />
              <span>15-Day Money-Back Guarantee • 256-bit SSL Encrypted</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

