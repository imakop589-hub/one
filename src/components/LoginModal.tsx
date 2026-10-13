import React, { useState } from 'react';
import { X, Lock, ArrowRight, Mail, Server } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-[#E2E8F0]">
        
        {/* Header */}
        <div className="bg-[#061913] text-white p-6 relative border-b border-[#133025]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            id="close-login-modal"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#008744] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Server className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              Host<span className="text-[#008744]">xeon</span>
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold text-white">
            {mode === 'forgot' ? 'Reset Password' : 'Sign in to Control Panel'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-normal">
            {mode === 'forgot' 
              ? 'Enter your verified account email to receive instant reset instructions.'
              : 'Access your cloud hosting accounts, domains, and mailboxes.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {loggedIn ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#008744] flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h4 className="font-heading font-bold text-[#0F172A] text-lg">
                Welcome back!
              </h4>
              <p className="text-xs text-[#475569]">Redirecting to your Control Panel...</p>
            </div>
          ) : mode === 'forgot' ? (
            resetSent ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#008744] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-heading font-bold text-[#0F172A] text-base">
                  Reset link dispatched
                </h4>
                <p className="text-xs text-[#475569]">
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
                  variant="primary"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  id="forgot-submit-btn"
                >
                  Send Reset Link
                </Button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-[#008744] font-semibold hover:underline cursor-pointer"
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
                    className="text-xs text-[#008744] font-medium hover:underline cursor-pointer"
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
                variant="primary"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
                id="login-submit-btn"
              >
                Sign In
              </Button>
            </form>
          )}

          {mode === 'login' && !loggedIn && (
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-center text-xs text-[#475569]">
              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] text-left">
                <span className="font-semibold text-[#0F172A] block mb-0.5">WHMCS Client Portal Notice:</span>
                Live customer billing, invoices, server control, and support tickets connect to your WHMCS instance.
              </div>
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.location.hash = '#admin';
                  }}
                  className="text-[#008744] hover:text-[#006E37] font-semibold cursor-pointer"
                >
                  Staff? Open CMS Admin →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBuilder?.();
                  }}
                  className="text-[#475569] hover:text-[#0F172A] font-medium hover:underline cursor-pointer"
                >
                  Create account
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
