import { FiCode, FiGithub, FiLinkedin, FiFacebook, FiMail, FiHeart } from 'react-icons/fi';
import { personalInfo, navLinks } from '../constants';
import { scrollToSection } from '../hooks/useLenis';

const Footer = () => {
  const socialLinks = [
    { icon: FiGithub,   href: personalInfo.github,   label: 'GitHub' },
    { icon: FiLinkedin, href: personalInfo.linkedIn,  label: 'LinkedIn' },
    { icon: FiFacebook, href: personalInfo.facebook,  label: 'Facebook' },
  ];

  return (
    <footer className="bg-bg-secondary text-content-primary relative overflow-hidden border-t border-accent-cyan/20">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30" aria-hidden="true">
              <FiCode className="w-5 h-5 text-accent-cyan" />
            </div>
            <span className="font-bold font-syne text-gradient">{personalInfo.name}</span>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-content-muted">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.to); }}
                className="hover:text-accent-cyan transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socialLinks.map((s) => {
              const Ic = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  className="p-2 glass-card rounded-lg text-content-muted hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent-cyan"
                >
                  <Ic className="w-4 h-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-content-muted/70">
          <span className="flex items-center gap-1">
            © {new Date().getFullYear()} {personalInfo.name}. Made with
            <FiHeart className="w-3.5 h-3.5 text-red-400 mx-0.5" aria-hidden="true" />
            in Bangladesh
          </span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-1 hover:text-accent-cyan transition-colors"
          >
            <FiMail className="w-3.5 h-3.5" aria-hidden="true" />
            {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
