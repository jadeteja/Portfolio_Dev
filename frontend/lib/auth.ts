'use client';

const TOKEN_KEY = 'jade_admin_jwt';
const USER_KEY = 'jade_admin_user';

export interface AdminUserSession {
  email: string;
  role: string;
  token: string;
}

export function saveAdminSession(token: string, email: string, role: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify({ email, role, token }));
}

export function getAdminSession(): AdminUserSession | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getAdminAuthHeader(): Record<string, string> {
  const session = getAdminSession();
  if (session && session.token) {
    return { Authorization: `Bearer ${session.token}` };
  }
  return {};
}
