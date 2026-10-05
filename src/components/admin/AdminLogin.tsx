import React, { useState } from 'react';
import { Lock, User, ArrowRight, Sparkles, AlertCircle, ArrowLeft, Shield, RotateCcw, KeyRound } from 'lucide-react';
import { authService } from '../../services/authService';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToPublicSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToPublicSite }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(() => authService.isDevCredentialsConfigured());

  const authMode = authService.getAuthMode();
  const isDevMode = authMode === 'development_fallback';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);

    try {
      const res = await authService.login(username, password);
      if (res.success) {
        onSuccess();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify your admin credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during admin authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDevSandbox = () => {
    authService.resetDevCredentials();
    setIsConfigured(false);
    setPassword('');
    setInfoMessage('Local development credentials have been reset. Enter a new username and password to initialize.');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif] text-slate-100 relative">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Return to public site link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between z-10">
        <button
          type="button"
          onClick={onBackToPublicSite}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Hostxeon Website</span>
        </button>
        <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          CMS v2.0
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative z-10">
        {/* Brand header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#008a45] to-[#041d16] flex items-center justify-center text-white shadow-md relative">
            <Sparkles className="w-5 h-5 text-[#fed000]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-white tracking-tight">
                Host<span className="text-emerald-400">xeon</span>
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase">
                Admin CMS
              </span>
            </div>
            <p className="text-xs text-slate-400">Management & Content Control</p>
          </div>
        </div>

        {/* Boundary Notice */}
        <div className="mb-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Administrator Access Only</span>
            </div>
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
              authMode === 'production_api'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-amber-950 text-amber-300 border border-amber-800'
            }`}>
              {authMode === 'production_api' ? 'Production Server API' : 'Dev Simulator (Local)'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            This panel manages public website pages, navigation, media, and site settings. Customer billing, invoices, and service tickets are handled in the separate WHMCS portal.
          </p>
        </div>

        {/* Isolated Development Sandbox Label */}
        {isDevMode && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200/90 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <KeyRound className="w-3.5 h-3.5 shrink-0" />
              <span>Development Sandbox Active</span>
            </div>
            <p className="text-[11px] text-amber-300/80 leading-normal">
              {!isConfigured
                ? 'First-run setup: Enter your desired admin username and password (min 6 chars). They will be encrypted with salted WebCrypto SHA-256 in local storage.'
                : 'Local prototype mode. Enter your configured admin credentials to access the CMS.'}
            </p>
          </div>
        )}

        {/* Info Alert */}
        {infoMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-200 text-xs font-medium animate-in fade-in">
            {infoMessage}
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div role="alert" className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs font-medium flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="admin-username">
              Admin Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="admin-username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="admin-password">
              Password {isDevMode && !isConfigured && <span className="text-slate-500 font-normal">(min 6 characters)</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            id="admin-login-submit"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <>
                <span>{isDevMode && !isConfigured ? 'Initialize Credentials & Sign In' : 'Sign In to Admin CMS'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Development Reset Option */}
        {isDevMode && isConfigured && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={handleResetDevSandbox}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Local Dev Sandbox Credentials</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
