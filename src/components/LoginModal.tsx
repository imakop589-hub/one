import React, { useState } from 'react';
import { X, Sparkles, Lock, ArrowRight, Mail } from 'lucide-react';
import { FormField, Input } from './ui/Form';
import { Button } from './ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      onClose();
      setLoggedIn(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100">
        
        {/* Header */}
        <div className="bg-[#041d16] text-white p-6 sm:p-7 relative border-b border-emerald-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            id="close-login-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#008a45] to-emerald-700 flex items-center justify-center text-white font-black text-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#fed000]" />
            </div>
            <span className="font-black text-lg text-white">
              Host<span className="text-emerald-400">xeon</span>
            </span>
          </div>

          <h3 className="font-['Baloo_2',cursive,sans-serif] text-2xl font-black text-white">
            Log in to Control Panel
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            Access your websites, Aida AI builder, mailboxes and domain management.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {loggedIn ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h4 className="font-['Baloo_2',cursive,sans-serif] font-bold text-gray-900 text-xl">
                Welcome back!
              </h4>
              <p className="text-xs text-gray-500">Redirecting to your Control Panel...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <FormField label="Email address" required htmlFor="login-email-input">
                <Input
                  id="login-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourdomain.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                />
              </FormField>

              <FormField
                label="Password"
                required
                htmlFor="login-password-input"
                action={
                  <a href="#forgot" className="text-xs text-[#008a45] font-semibold hover:underline">
                    Forgot password?
                  </a>
                }
              >
                <Input
                  id="login-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                />
              </FormField>

              <Button
                type="submit"
                variant="accent"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
                id="login-submit-btn"
              >
                Log in
              </Button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-gray-500">
            Don't have an account yet?{' '}
            <a href="#builder" onClick={onClose} className="text-[#008a45] font-bold hover:underline">
              Start building for free
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

