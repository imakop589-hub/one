import { AdminSession, AdminUser } from '../types/cms';

export type AuthMode = 'production_api' | 'development_fallback';

export interface AuthAdapter {
  getMode(): AuthMode;
  login(username: string, passwordAttempt: string): Promise<{ success: boolean; error?: string }>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
  verifySession(): Promise<boolean>;
  getCurrentUser(): AdminUser | null;
  isDevCredentialsConfigured?(): boolean;
  resetDevCredentials?(): void;
}

const ADMIN_SESSION_KEY = 'hostxeon_cms_admin_session';
const DEV_CRED_KEY = 'hx_dev_admin_cred_v1';

// Helper for cryptographic hashing using native browser Web Crypto API
async function sha256Hex(dataString: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(dataString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate secure random salt hex
function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// 1. PRODUCTION SERVER-SIDE AUTHENTICATION ADAPTER (HttpOnly Cookie / Session)
// ============================================================================
export class ApiAuthAdapter implements AuthAdapter {
  private baseUrl: string;

  constructor(apiUrl: string) {
    this.baseUrl = apiUrl.replace(/\/$/, '');
  }

  getMode(): AuthMode {
    return 'production_api';
  }

  async login(username: string, passwordAttempt: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${this.baseUrl}/api/admin/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: passwordAttempt }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Invalid credentials.' }));
        return { success: false, error: err.message || 'Authentication failed.' };
      }

      const data = await res.json();
      const sessionUser: AdminUser = data.user || {
        id: data.id || 'admin-root',
        username: username.toLowerCase().trim(),
        name: data.name || 'Hostxeon Administrator',
        role: 'superadmin',
      };

      const session: AdminSession = {
        token: data.token || 'server_cookie_session',
        user: sessionUser,
        expiresAt: Date.now() + 8 * 60 * 60 * 1000,
      };

      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      return { success: true };
    } catch {
      return { success: false, error: 'Could not connect to authentication server. Check network connection.' };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/admin/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }

  isAuthenticated(): boolean {
    try {
      const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!stored) return false;
      const session: AdminSession = JSON.parse(stored);
      if (Date.now() > session.expiresAt) {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async verifySession(): Promise<boolean> {
    if (!this.isAuthenticated()) return false;
    try {
      const res = await fetch(`${this.baseUrl}/api/admin/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }
      const data = await res.json();
      if (data && data.user) {
        const current = this.getCurrentUser();
        if (current) {
          sessionStorage.setItem(
            ADMIN_SESSION_KEY,
            JSON.stringify({
              ...JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || '{}'),
              user: data.user,
            })
          );
        }
      }
      return true;
    } catch {
      // If server unreachable, retain current session if not expired
      return this.isAuthenticated();
    }
  }

  getCurrentUser(): AdminUser | null {
    try {
      const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!stored) return null;
      const session: AdminSession = JSON.parse(stored);
      return session.user;
    } catch {
      return null;
    }
  }
}

// ============================================================================
// 2. ISOLATED LOCAL DEVELOPMENT SIMULATOR FALLBACK
// (Used ONLY for local interface prototyping when no server is connected)
// Uses browser Web Crypto API (salted SHA-256) with zero hardcoded plaintext passwords.
// ============================================================================
interface DevCredentialRecord {
  username: string;
  salt: string;
  hash: string;
  createdAt: string;
}

export class DevFallbackAuthAdapter implements AuthAdapter {
  getMode(): AuthMode {
    return 'development_fallback';
  }

  isDevCredentialsConfigured(): boolean {
    try {
      const stored = localStorage.getItem(DEV_CRED_KEY);
      if (!stored) return false;
      const cred: DevCredentialRecord = JSON.parse(stored);
      return Boolean(cred && cred.hash && cred.salt);
    } catch {
      return false;
    }
  }

  resetDevCredentials(): void {
    localStorage.removeItem(DEV_CRED_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }

  async login(username: string, passwordAttempt: string): Promise<{ success: boolean; error?: string }> {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = passwordAttempt.trim();

    if (!cleanUser) {
      return { success: false, error: 'Please enter a username or email.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter a password.' };
    }
    if (cleanPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Check if dev credentials have been initialized
    let storedCred: DevCredentialRecord | null = null;
    try {
      const raw = localStorage.getItem(DEV_CRED_KEY);
      if (raw) storedCred = JSON.parse(raw);
    } catch {
      storedCred = null;
    }

    // First-run in Dev Mode: automatically initialize dev administrator credentials
    if (!storedCred || !storedCred.hash || !storedCred.salt) {
      const salt = generateSalt();
      const hash = await sha256Hex(`${salt}:${cleanUser}:${cleanPass}`);
      const newCred: DevCredentialRecord = {
        username: cleanUser,
        salt,
        hash,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(DEV_CRED_KEY, JSON.stringify(newCred));

      return this.createDevSession(cleanUser);
    }

    // Subsequent logins in Dev Mode: verify against salted Web Crypto hash
    const testHash = await sha256Hex(`${storedCred.salt}:${cleanUser}:${cleanPass}`);
    if (testHash !== storedCred.hash) {
      return {
        success: false,
        error: 'Invalid dev credentials. To start fresh, click "Reset Dev Sandbox" below.',
      };
    }

    return this.createDevSession(cleanUser);
  }

  private createDevSession(username: string): { success: boolean } {
    const sessionUser: AdminUser = {
      id: 'admin-dev-local',
      username,
      name: 'Hostxeon Local Administrator',
      role: 'superadmin',
    };

    const session: AdminSession = {
      token: 'dev_local_' + Math.random().toString(36).substring(2),
      user: sessionUser,
      expiresAt: Date.now() + 8 * 60 * 60 * 1000,
    };

    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return { success: true };
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }

  isAuthenticated(): boolean {
    try {
      const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!stored) return false;
      const session: AdminSession = JSON.parse(stored);
      if (Date.now() > session.expiresAt) {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async verifySession(): Promise<boolean> {
    return this.isAuthenticated();
  }

  getCurrentUser(): AdminUser | null {
    try {
      const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!stored) return null;
      const session: AdminSession = JSON.parse(stored);
      return session.user;
    } catch {
      return null;
    }
  }
}

// ============================================================================
// ADAPTER FACTORY
// ============================================================================
function resolveAuthAdapter(): AuthAdapter {
  const env = (import.meta as unknown as { env?: { VITE_CMS_API_URL?: string } }).env || {};
  if (env.VITE_CMS_API_URL && env.VITE_CMS_API_URL.trim() !== '') {
    return new ApiAuthAdapter(env.VITE_CMS_API_URL.trim());
  }
  return new DevFallbackAuthAdapter();
}

const authAdapter: AuthAdapter = resolveAuthAdapter();

export const authService = {
  getAuthMode(): AuthMode {
    return authAdapter.getMode();
  },

  async login(username: string, passwordAttempt: string): Promise<{ success: boolean; error?: string }> {
    return authAdapter.login(username, passwordAttempt);
  },

  async logout(): Promise<void> {
    return authAdapter.logout();
  },

  isAuthenticated(): boolean {
    return authAdapter.isAuthenticated();
  },

  async verifySession(): Promise<boolean> {
    return authAdapter.verifySession();
  },

  getCurrentUser(): AdminUser | null {
    return authAdapter.getCurrentUser();
  },

  isDevCredentialsConfigured(): boolean {
    if (authAdapter.isDevCredentialsConfigured) {
      return authAdapter.isDevCredentialsConfigured();
    }
    return true;
  },

  resetDevCredentials(): void {
    if (authAdapter.resetDevCredentials) {
      authAdapter.resetDevCredentials();
    }
  },
};
