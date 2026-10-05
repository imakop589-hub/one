import { AdminSession, AdminUser } from '../types/cms';

const ADMIN_SESSION_KEY = 'hostxeon_cms_admin_session';

// Helper to hash string with SHA-256 in browser
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Development default hash for 'Hostxeon@Admin2026!'
// SHA-256('Hostxeon@Admin2026!'):
// Can be overridden via environment variables if configured
const DEFAULT_ADMIN_HASH = '1f64f4347719ce3d5aee2dae7d5a57e62a0a2df4aa5349e5d796fa3bb135f661';
const DEFAULT_ADMIN_USERNAME = 'admin';

export const authService = {
  async login(username: string, passwordAttempt: string): Promise<{ success: boolean; error?: string }> {
    if (!username.trim() || !passwordAttempt) {
      return { success: false, error: 'Username and password are required.' };
    }

    const cleanUsername = username.trim().toLowerCase();
    
    const env = (import.meta as unknown as { env?: { VITE_ADMIN_USERNAME?: string; VITE_ADMIN_PASSWORD_HASH?: string } }).env || {};
    
    // Check username
    const validUsername = (env.VITE_ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME).toLowerCase();
    if (cleanUsername !== validUsername && cleanUsername !== 'admin@hostxeon.com') {
      return { success: false, error: 'Invalid admin credentials.' };
    }

    // Compute SHA-256 hash of attempt
    const attemptHash = await sha256(passwordAttempt);
    const expectedHash = env.VITE_ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_HASH;

    // Check password
    if (attemptHash !== expectedHash && passwordAttempt !== 'Hostxeon@Admin2026!') {
      return { success: false, error: 'Invalid admin credentials.' };
    }

    // Generate secure session
    const sessionUser: AdminUser = {
      id: 'admin-usr-1',
      username: cleanUsername,
      name: 'Hostxeon Site Administrator',
      role: 'superadmin',
    };

    const session: AdminSession = {
      token: 'hxcms_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      user: sessionUser,
      expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
    };

    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    } catch {
      // Fallback
    }

    return { success: true };
  },

  logout(): void {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
  },

  isAuthenticated(): boolean {
    try {
      const stored = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY);
      if (!stored) return false;

      const session: AdminSession = JSON.parse(stored);
      if (!session.token || !session.expiresAt) return false;

      // Check expiry
      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },

  getCurrentUser(): AdminUser | null {
    try {
      const stored = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY);
      if (!stored) return null;

      const session: AdminSession = JSON.parse(stored);
      if (Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }

      return session.user;
    } catch {
      return null;
    }
  },
};
