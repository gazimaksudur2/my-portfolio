"use client";

import { FormEvent, useState } from "react";
import {
  setPinUnlocked,
  setStoredToken,
  verifyLocalPin,
} from "@/lib/auth";
import { verifyToken } from "@/lib/github";

type LoginFormProps = {
  pinUnlocked: boolean;
  onPinUnlocked: () => void;
  onAuthenticated: (login: string) => void;
};

export default function LoginForm({
  pinUnlocked,
  onPinUnlocked,
  onAuthenticated,
}: LoginFormProps) {
  const [pin, setPin] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handlePinSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!verifyLocalPin(pin)) {
      setError("Incorrect PIN.");
      return;
    }
    setPinUnlocked(true);
    onPinUnlocked();
  }

  async function handlePatSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await verifyToken(token);
      setStoredToken(token);
      onAuthenticated(user.login);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Token verification failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4">
      <div className="glass-card rounded-2xl p-8">
        <p className="mb-2 font-syne text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Admin Access
        </p>
        <h1 className="mb-2 font-syne text-2xl font-bold text-content-primary">
          {pinUnlocked ? "Connect GitHub" : "Enter PIN"}
        </h1>
        <p className="mb-6 text-sm text-content-muted">
          {pinUnlocked
            ? "Paste a fine-grained personal access token with Contents: Read and write on this repository."
            : "Local gate only — not a security boundary. Default PIN is admin."}
        </p>

        {!pinUnlocked ? (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <label className="block text-sm text-content-muted">
              PIN
              <input
                type="password"
                autoComplete="current-password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2.5 text-content-primary outline-none focus:border-accent-cyan"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-accent-cyan/20 px-4 py-2.5 font-medium text-accent-cyan transition hover:bg-accent-cyan/30"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handlePatSubmit} className="space-y-4">
            <label className="block text-sm text-content-muted">
              GitHub fine-grained PAT
              <input
                type="password"
                autoComplete="off"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="github_pat_…"
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2.5 font-mono text-sm text-content-primary outline-none focus:border-accent-cyan"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent-cyan/20 px-4 py-2.5 font-medium text-accent-cyan transition hover:bg-accent-cyan/30 disabled:opacity-50"
            >
              {loading ? "Verifying…" : "Verify & sign in"}
            </button>
          </form>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
