import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiCode } from 'react-icons/fi';
import { navLinks, personalInfo } from '../constants';
import { scrollToSection } from '../hooks/useLenis';

const NAVBAR_SECTIONS = navLinks.map((l) => l.to.slice(1)); // strip leading '#'

const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 90;
      for (let i = NAVBAR_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAVBAR_SECTIONS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAVBAR_SECTIONS[i]);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape or outside click
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/40 border-b border-accent-cyan/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
          : 'backdrop-blur-md bg-black/20 border-b border-white/5'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a
            href="/"
            onClick={scrollToTop}
            className="flex items-center space-x-3 group"
            aria-label="Back to top"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 shadow-glow-cyan group-hover:shadow-glow-cyan-lg transition-all duration-300 group-hover:scale-105">
              <FiCode className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
            </div>
            <span className="flex lg:hidden xl:flex text-lg font-bold font-syne text-content-primary group-hover:text-accent-cyan transition-colors duration-200">
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.to.slice(1);
              return (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group ${
                    isActive ? 'text-accent-cyan' : 'text-content-muted hover:text-content-primary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-300 ${
                      isActive ? 'w-2/3' : 'w-0 group-hover:w-2/3'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}

            {/* ⌘K hint */}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))}
              className="ml-2 hidden xl:flex items-center gap-1 px-2 py-1 glass-card rounded-lg border border-white/10 text-content-muted hover:border-accent-cyan/30 hover:text-accent-cyan transition-all text-[13px] font-mono"
              aria-label="Open command palette (Ctrl K)"
              title="Command palette"
            >
              Ctrl K
            </button>

            <a
              href={personalInfo.resumeDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 text-sm font-semibold rounded-lg text-accent-cyan border border-accent-cyan/40 bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-0.5"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-content-primary hover:text-accent-cyan rounded-lg border border-white/5 hover:border-accent-cyan/30 transition-all"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 backdrop-blur-xl bg-black/60 border-t border-accent-cyan/15 rounded-b-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.to.slice(1);
              return (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20'
                      : 'text-content-muted hover:text-content-primary hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-white/10">
              <a
                href={personalInfo.resumeDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 font-semibold rounded-lg text-accent-cyan border border-accent-cyan/40 bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:shadow-glow-cyan transition-all"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
