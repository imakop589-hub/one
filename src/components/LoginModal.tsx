import React, { useState } from 'react';
import { X, Sparkles, Lock, ArrowRight, Mail } from 'lucide-react';
import { FormField, Input } from './ui/Form';
import { Button } from './ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBuilder?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenBuilder }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [resetSent, setResetSent] = useState(false);
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

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setMode('login');
    }, 2800);
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
            {mode === 'forgot' ? 'Reset Password' : 'Log in to Control Panel'}
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            {mode === 'forgot' 
              ? 'Enter your verified account email to receive instant reset instructions.'
              : 'Access your websites, Aida AI builder, mailboxes and domain management.'}
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
          ) : mode === 'forgot' ? (
            resetSent ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Reset link dispatched!
                </h4>
                <p className="text-xs text-gray-500">
                  We've sent password reset instructions to <strong>{email}</strong>.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMode('login')}
                  className="mt-2"
                >
                  Back to Log in
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <FormField label="Registered Email" required htmlFor="forgot-email-input">
                  <Input
                    id="forgot-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourdomain.com"
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                </FormField>

                <Button
                  type="submit"
                  variant="accent"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  id="forgot-submit-btn"
                >
                  Send Reset Link
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-[#008a45] font-bold hover:underline cursor-pointer"
                  >
                    ← Back to Log in
                  </button>
                </div>
              </form>
            )
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
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#008a45] font-semibold hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
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

          {mode === 'login' && !loggedIn && (
            <div className="pt-3 border-t border-gray-100 space-y-2 text-center text-xs text-gray-500">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 text-left">
                <span className="font-bold text-slate-800 block mb-0.5">WHMCS Portal Notice:</span>
                Live customer billing, invoices, server control, and support tickets will be routed to your separate WHMCS installation.
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.location.hash = '#admin';
                  }}
                  className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                >
                  Hostxeon Staff? Open CMS Admin →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBuilder?.();
                  }}
                  className="text-[#008a45] font-bold hover:underline cursor-pointer"
                >
                  Start free trial
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

