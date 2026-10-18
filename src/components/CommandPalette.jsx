import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiUser, FiCode, FiBriefcase,
  FiMail, FiDownload, FiGithub, FiLinkedin,
  FiAward, FiBook, FiHome, FiX, FiZap,
} from 'react-icons/fi';
import { scrollToSection } from '../hooks/useLenis';
import { personalInfo } from '../constants';

// Detect platform for keyboard hint
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const COMMANDS = [
  { id: 'home',     label: 'Go to Home',           icon: FiHome,     section: '#home',           category: 'Navigate' },
  { id: 'projects', label: 'Go to Projects',        icon: FiBriefcase, section: '#projects',       category: 'Navigate' },
  { id: 'exp',      label: 'Go to Experience',      icon: FiBriefcase, section: '#experience',     category: 'Navigate' },
  { id: 'skills',   label: 'Go to Skills',          icon: FiCode,     section: '#skills',          category: 'Navigate' },
  { id: 'about',    label: 'Go to About',           icon: FiUser,     section: '#about',           category: 'Navigate' },
  { id: 'edu',      label: 'Go to Education',       icon: FiBook,     section: '#education',       category: 'Navigate' },
  { id: 'certs',    label: 'Go to Certifications',  icon: FiAward,    section: '#certifications',  category: 'Navigate' },
  { id: 'contact',  label: 'Go to Contact',         icon: FiMail,     section: '#contact',         category: 'Navigate' },
  {
    id: 'resume',
    label: 'Open Resume',
    icon: FiDownload,
    href: personalInfo.resumeDriveLink,
    category: 'Actions',
  },
  {
    id: 'github',
    label: 'View GitHub Profile',
    icon: FiGithub,
    href: personalInfo.github,
    category: 'Actions',
  },
  {
    id: 'linkedin',
    label: 'View LinkedIn Profile',
    icon: FiLinkedin,
    href: personalInfo.linkedIn,
    category: 'Actions',
  },
  {
    id: 'email',
    label: 'Copy Email Address',
    icon: FiMail,
    action: () => navigator.clipboard.writeText(personalInfo.email).catch(() => {}),
    category: 'Actions',
    feedback: 'Email copied!',
  },
];

const CommandPalette = () => {
  const [open, setOpen]         = useState(false);
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const run = (cmd) => {
    if (cmd.action) {
      cmd.action();
      if (cmd.feedback) {
        setFeedback(cmd.feedback);
        setTimeout(() => setFeedback(null), 1800);
      }
    } else if (cmd.href) {
      window.open(cmd.href, '_blank', 'noopener,noreferrer');
    } else if (cmd.section) {
      scrollToSection(cmd.section);
    }
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) run(filtered[selected]);
  };

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  let flatIndex = 0;

  return (
    <>
      <AnimatePresence>
        {feedback && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 z-[300] glass-card border border-accent-cyan/30 text-accent-cyan text-sm font-medium px-4 py-2 rounded-xl shadow-glow-cyan flex items-center gap-2"
            role="status"
            aria-live="polite"
          >
            <FiZap className="w-4 h-4" aria-hidden="true" /> {feedback}
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg px-4"
            >
              <div className="glass-card border border-accent-cyan/30 shadow-glow-cyan rounded-2xl overflow-hidden">
                <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
                  <FiSearch className="w-4 h-4 text-content-muted flex-shrink-0" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                    onKeyDown={onKeyDown}
                    placeholder="Search commands…"
                    className="flex-1 bg-transparent text-content-primary placeholder-content-muted focus:outline-none text-sm"
                    aria-label="Search commands"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 text-content-muted hover:text-accent-cyan transition-colors"
                    aria-label="Close command palette"
                  >
                    <FiX className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto py-2" role="listbox">
                  {filtered.length === 0 ? (
                    <p className="text-content-muted text-sm text-center py-10">No commands found for &quot;{query}&quot;</p>
                  ) : (
                    Object.entries(grouped).map(([category, cmds]) => (
                      <div key={category}>
                        <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-content-muted/60">
                          {category}
                        </p>
                        {cmds.map((cmd) => {
                          const i = flatIndex++;
                          const Ic = cmd.icon;
                          const isSelected = selected === i;
                          return (
                            <button
                              key={cmd.id}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => run(cmd)}
                              onMouseEnter={() => setSelected(i)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                                isSelected ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-content-primary hover:bg-white/5'
                              }`}
                            >
                              <Ic className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                              <span className="text-sm">{cmd.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                <div className="px-4 py-2.5 border-t border-white/10 flex items-center gap-4 text-xs text-content-muted/70">
                  <span><kbd className="px-1.5 py-0.5 rounded text-accent-cyan bg-white/10 font-mono">↑↓</kbd> navigate</span>
                  <span><kbd className="px-1.5 py-0.5 rounded text-accent-cyan bg-white/10 font-mono">↵</kbd> select</span>
                  <span><kbd className="px-1.5 py-0.5 rounded text-accent-cyan bg-white/10 font-mono">esc</kbd> close</span>
                  <span className="ml-auto">
                    <kbd className="px-1.5 py-0.5 rounded text-accent-cyan bg-white/10 font-mono">
                      {isMac ? '⌘' : 'Ctrl'} K
                    </kbd>
                  </span>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
