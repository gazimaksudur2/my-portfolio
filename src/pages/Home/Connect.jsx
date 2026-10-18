import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiSend,
  FiCheckCircle,
  FiZap,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';
import SectionHeader from '../../components/SectionHeader';
import { m } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '../../utils/motion';
import { personalInfo } from '../../constants';

const Connect = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _honey: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error' | 'invalid'
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    // Honeypot check
    if (formData._honey) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { setStatus('invalid'); return; }
    if (!formData.name || !formData.subject || !formData.message) { setStatus('invalid'); return; }

    const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback if EmailJS is not configured
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name:   formData.name,
        from_email:  formData.email,
        subject:     formData.subject,
        message:     formData.message,
        reply_to:    formData.email,
        website_url: window.location.origin,
        sent_at:     new Date().toISOString(),
      }, PUBLIC_KEY);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', _honey: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Location',
      value: personalInfo.location,
      href: null,
    },
    {
      icon: FiMail,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/[\s-]/g, '')}`,
    },
  ];

  const socialLinks = [
    { icon: FiGithub,   href: personalInfo.github,   label: 'GitHub' },
    { icon: FiLinkedin, href: personalInfo.linkedIn,  label: 'LinkedIn' },
    { icon: FiFacebook, href: personalInfo.facebook,  label: 'Facebook' },
  ];

  return (
    <section id="contact" className="section-padding bg-bg-primary text-content-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-80 h-80 bg-accent-cyan/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-violet/20 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something"
          titleAccent="Together"
          description="Have a project in mind or want to discuss opportunities? I'm always open to new challenges."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Info column ── */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.15)}
            className="space-y-8"
          >
            <m.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold font-syne mb-3">Let&apos;s Connect</h3>
              <p className="text-content-muted leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities.
                Reach out through any channel — I usually reply within 24 hours.
              </p>
            </m.div>

            {/* Contact info */}
            <m.div variants={staggerContainer(0.1)} className="space-y-3">
              {contactInfo.map((info) => {
                const Ic = info.icon;
                const inner = (
                  <>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30">
                      <Ic className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-content-primary text-sm">{info.title}</h4>
                      <p className="text-content-muted text-sm mt-0.5">{info.value}</p>
                    </div>
                  </>
                );
                return (
                  <m.div
                    key={info.title}
                    variants={fadeInUp}
                    className="flex items-center space-x-4 p-4 glass-card rounded-2xl border border-white/10 hover:border-accent-cyan/30 transition-colors duration-300"
                  >
                    {info.href ? (
                      <a href={info.href} className="flex items-center space-x-4 w-full">{inner}</a>
                    ) : inner}
                  </m.div>
                );
              })}
            </m.div>

            {/* Social */}
            <m.div variants={fadeInUp}>
              <h4 className="text-base font-semibold mb-3">Follow Me</h4>
              <div className="flex space-x-3">
                {socialLinks.map((s) => {
                  const Ic = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="p-3 glass-card rounded-xl border border-white/10 text-content-primary hover:text-accent-cyan hover:border-accent-cyan/30 hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
                    >
                      <Ic className="w-5 h-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </m.div>

            {/* Availability */}
            <m.div
              variants={fadeInUp}
              className="p-5 glass-card rounded-2xl border border-accent-green/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green" />
                </span>
                <span className="text-accent-green font-semibold">Open to opportunities</span>
              </div>
              <p className="text-content-muted text-sm leading-relaxed">
                Available for full-time roles and freelance projects · Dhaka, Bangladesh · Replies within 24 h
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-content-muted/70">
                <FiZap className="w-3.5 h-3.5 text-accent-cyan" aria-hidden="true" />
                Quick to onboard · Remote-friendly
              </div>
            </m.div>
          </m.div>

          {/* ── Form ── */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-3xl p-8 lg:p-10 border border-accent-cyan/15"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold font-syne">Send a Message</h3>
                <p className="text-content-muted text-sm mt-1">I&apos;ll reply as soon as possible.</p>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-2 glass-card rounded-lg text-xs font-medium text-content-muted hover:text-accent-cyan border border-white/10 hover:border-accent-cyan/30 transition-all"
                aria-label="Copy email address"
              >
                {emailCopied ? <FiCheck className="w-3.5 h-3.5 text-accent-green" /> : <FiCopy className="w-3.5 h-3.5" />}
                {emailCopied ? 'Copied!' : 'Copy email'}
              </button>
            </div>

            {/* Inline status messages */}
            {status === 'success' && (
              <div role="status" aria-live="polite" className="mb-6 p-4 rounded-xl bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Message sent! I&apos;ll get back to you within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div role="alert" aria-live="assertive" className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                Failed to send. Please email me directly at{' '}
                <a href={`mailto:${personalInfo.email}`} className="underline hover:text-red-300">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {status === 'invalid' && (
              <div role="alert" aria-live="assertive" className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                Please fill in all required fields with a valid email address.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <input type="text" name="_honey" value={formData._honey} onChange={handleChange} className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-content-muted mb-1.5">Full Name *</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange} required
                    autoComplete="name"
                    className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-content-muted mb-1.5">Email Address *</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange} required
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-content-muted mb-1.5">Subject *</label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-content-muted mb-1.5">Message *</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange} required
                  rows={5}
                  className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full flex items-center justify-center px-8 py-4 font-semibold rounded-xl overflow-hidden border-2 border-accent-cyan text-accent-cyan hover:text-bg-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-accent-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>

            <p className="mt-4 text-xs text-content-muted/60 text-center">
              Your information is secure and will never be shared.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
