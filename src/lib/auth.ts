const TOKEN_KEY = "portfolio_admin_github_pat";
const PIN_KEY = "portfolio_admin_pin_ok";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token.trim());
}

export function clearStoredToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(PIN_KEY);
}

export function isPinUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(PIN_KEY) === "1";
}

export function setPinUnlocked(ok: boolean): void {
  if (ok) sessionStorage.setItem(PIN_KEY, "1");
  else sessionStorage.removeItem(PIN_KEY);
}

/** Optional UI gate only — not a security boundary. Default PIN: admin */
export function verifyLocalPin(pin: string): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PIN || "admin";
  return pin.trim() === expected;
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}
