"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearStoredToken,
  getStoredToken,
  isPinUnlocked,
} from "@/lib/auth";
import LoginForm from "./LoginForm";

const NAV = [
  { href: "/admin/", label: "Dashboard" },
  { href: "/admin/site/", label: "Site / Profile" },
  { href: "/admin/projects/", label: "Projects" },
  { href: "/admin/experience/", label: "Experience" },
  { href: "/admin/education/", label: "Education" },
  { href: "/admin/skills/", label: "Skills" },
  { href: "/admin/certifications/", label: "Certifications" },
  { href: "/admin/achievements/", label: "Achievements" },
] as const;

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [pinOk, setPinOk] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [login, setLogin] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    setPinOk(isPinUnlocked() || Boolean(token));
    setAuthed(Boolean(token));
    setReady(true);
  }, []);

  function handleLogout() {
    clearStoredToken();
    setAuthed(false);
    setPinOk(false);
    setLogin(null);
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary text-content-muted">
        Loading admin…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg-primary bg-grid-glow bg-[length:48px_48px]">
        <div className="border-b border-white/5 px-4 py-4">
          <Link
            href="/"
            className="text-sm text-content-muted transition hover:text-accent-cyan"
          >
            ← Back to public site
          </Link>
        </div>
        <LoginForm
          pinUnlocked={pinOk}
          onPinUnlocked={() => setPinOk(true)}
          onAuthenticated={(userLogin) => {
            setLogin(userLogin);
            setAuthed(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-content-primary">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-bg-secondary/80 lg:flex lg:flex-col">
          <div className="border-b border-white/5 px-5 py-5">
            <p className="font-syne text-xs uppercase tracking-[0.2em] text-accent-cyan">
              Portfolio
            </p>
            <h1 className="font-syne text-xl font-bold">Admin</h1>
            {login && (
              <p className="mt-1 truncate text-xs text-content-muted">
                @{login}
              </p>
            )}
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                pathname === item.href.replace(/\/$/, "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-accent-cyan/15 text-accent-cyan"
                      : "text-content-muted hover:bg-white/5 hover:text-content-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-2 border-t border-white/5 p-4">
            <Link
              href="/"
              className="block text-sm text-content-muted hover:text-accent-cyan"
            >
              ← Public site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-content-muted hover:border-red-400/40 hover:text-red-300"
            >
              Log out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-3 lg:hidden">
            <div>
              <p className="font-syne text-xs uppercase tracking-[0.2em] text-accent-cyan">
                Admin
              </p>
              <p className="text-sm text-content-muted">
                {login ? `@${login}` : "Signed in"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-content-primary"
            >
              {mobileNavOpen ? "Close" : "Menu"}
            </button>
          </header>

          {mobileNavOpen && (
            <nav className="space-y-1 border-b border-white/5 bg-bg-secondary p-3 lg:hidden">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-content-muted hover:bg-white/5 hover:text-content-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/"
                className="block rounded-lg px-3 py-2 text-sm text-content-muted"
              >
                ← Public site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300"
              >
                Log out
              </button>
            </nav>
          )}

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
