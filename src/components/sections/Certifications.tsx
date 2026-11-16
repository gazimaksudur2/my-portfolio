"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiCalendar,
  FiExternalLink,
  FiFileText,
  FiTag,
  FiX,
} from "react-icons/fi";
import SectionHeader from "@/components/ui/SectionHeader";
import type { CertificationsFile, Certification } from "@/lib/schemas";

type CertificationsProps = {
  certifications: CertificationsFile;
};

const resolveCertMedia = (url: string, typeHint?: string) => {
  if (!url) return { src: null, previewSrc: null, thumbnailSrc: null, kind: "none" as const };
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
  const driveOpenMatch = url.match(/[?&]id=([^&]+)/);
  const driveFileId =
    driveFileMatch?.[1] ??
    (url.includes("drive.google.com") ? driveOpenMatch?.[1] : null);
  const isPdf = typeHint === "pdf" || url.toLowerCase().includes(".pdf");

  if (driveFileId) {
    const thumb = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w640`;
    const fullSize = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1280`;
    if (isPdf) {
      const iframeSrc = `https://drive.google.com/file/d/${driveFileId}/preview`;
      return {
        src: iframeSrc,
        previewSrc: iframeSrc,
        thumbnailSrc: thumb,
        kind: "pdf" as const,
      };
    }
    return {
      src: fullSize,
      previewSrc: null,
      thumbnailSrc: thumb,
      kind: "image" as const,
    };
  }

  if (isPdf) {
    return { src: url, previewSrc: null, thumbnailSrc: null, kind: "pdf" as const };
  }
  return { src: url, previewSrc: null, thumbnailSrc: url, kind: "image" as const };
};

const platformColors: Record<string, string> = {
  "AWS Academy": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "AWS Certification": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  KodeKloud: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Coursera: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "Programming Hero": "bg-purple-500/15 text-purple-300 border-purple-500/30",
  ITPEC: "bg-red-500/15 text-red-300 border-red-500/30",
  "EricssonEdge Academia": "bg-teal-500/15 text-teal-300 border-teal-500/30",
};

const PlatformBadge = ({ platform }: { platform: string }) => {
  const cls =
    platformColors[platform] ?? "bg-white/10 text-content-muted border-white/20";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${cls}`}
    >
      {platform}
    </span>
  );
};

const Certifications = ({ certifications }: CertificationsProps) => {
  const { section, items } = certifications;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (cert: Certification, triggerEl: HTMLElement) => {
    triggerRef.current = triggerEl;
    setSelectedCert(cert);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = "";
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!selectedCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedCert]);

  return (
    <>
      <section
        id="certifications"
        className="section-padding bg-bg-secondary relative overflow-hidden"
      >
        <div
          className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge={section.badge}
            badgeColor="text-accent-violet"
            title={section.title}
            titleAccent={section.titleAccent}
            description={section.description}
          />

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {items.map((cert, index) => {
              const { thumbnailSrc, kind: certKind } = resolveCertMedia(
                cert.certificateUrl,
                cert.type
              );

              return (
                <m.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <button
                    onClick={(e) => openModal(cert, e.currentTarget)}
                    className="w-full text-left glass-card rounded-2xl border border-white/10 overflow-hidden hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                    aria-label={`View certificate: ${cert.title}`}
                  >
                    <div className="relative h-36 bg-bg-card flex items-center justify-center overflow-hidden">
                      {thumbnailSrc ? (
                        <img
                          src={thumbnailSrc}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 bg-gradient-to-br from-accent-cyan/10 to-bg-card w-full h-full justify-center">
                          <FiAward
                            className="w-10 h-10 text-accent-cyan"
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium text-content-muted uppercase tracking-wide">
                            Credential
                          </span>
                        </div>
                      )}
                      {certKind === "pdf" && (
                        <div
                          className="absolute bottom-2 right-2 flex items-center gap-1 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full pointer-events-none"
                          aria-label="PDF certificate"
                        >
                          <FiFileText className="w-3 h-3" aria-hidden="true" />{" "}
                          PDF
                        </div>
                      )}
                      {cert.platform && (
                        <div className="absolute top-2 left-2">
                          <PlatformBadge platform={cert.platform} />
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-content-primary line-clamp-2 mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-accent-cyan text-xs font-medium">
                        {cert.issuer}
                      </p>
                      {cert.date && (
                        <p className="text-content-muted text-xs mt-0.5 flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" aria-hidden="true" />
                          {cert.date}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {cert.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-white/5 text-content-muted text-[11px] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </m.div>
              );
            })}
          </m.div>
        </div>
      </section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert &&
              (() => {
                const { src: certSrc, kind: certKind } = resolveCertMedia(
                  selectedCert.certificateUrl,
                  selectedCert.type
                );
                return (
                  <m.div
                    key="cert-modal-portal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Certificate: ${selectedCert.title}`}
                  >
                    <m.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      ref={dialogRef}
                      className="relative w-full max-w-xl lg:max-w-5xl glass-card border border-accent-cyan/20 rounded-2xl shadow-glow-cyan overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={closeModal}
                        autoFocus
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-content-primary hover:bg-accent-cyan/20 hover:text-accent-cyan transition-colors flex items-center justify-center"
                        aria-label="Close certificate modal"
                      >
                        <FiX className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {certSrc && (
                        <div className="w-full lg:w-[60%] bg-black flex-shrink-0 flex items-center justify-center overflow-hidden max-h-56 lg:max-h-[78vh] lg:min-h-[460px]">
                          {certKind === "image" ? (
                            <img
                              src={certSrc}
                              alt={selectedCert.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <iframe
                              src={certSrc}
                              title={selectedCert.title}
                              className="w-full h-full min-h-[220px] lg:min-h-[460px] border-0"
                              allow="autoplay"
                            />
                          )}
                        </div>
                      )}

                      <div className="flex-1 overflow-y-auto p-6 sm:p-7 flex flex-col gap-4 bg-bg-card/80">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 flex-shrink-0">
                            <FiAward
                              className="w-5 h-5 text-accent-cyan"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold font-syne text-content-primary leading-tight">
                              {selectedCert.title}
                            </h3>
                            <p className="text-accent-cyan font-semibold text-sm mt-1">
                              {selectedCert.issuer}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                          {selectedCert.platform && (
                            <PlatformBadge platform={selectedCert.platform} />
                          )}
                          {selectedCert.date && (
                            <span className="inline-flex items-center gap-1 text-xs text-content-muted">
                              <FiCalendar
                                className="w-3 h-3"
                                aria-hidden="true"
                              />{" "}
                              Issued {selectedCert.date}
                            </span>
                          )}
                        </div>

                        {selectedCert.credentialId && (
                          <p className="text-sm text-content-muted">
                            Credential ID:{" "}
                            <span className="font-medium text-content-primary">
                              {selectedCert.credentialId}
                            </span>
                          </p>
                        )}

                        <hr className="border-white/10" />

                        {selectedCert.description && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-2">
                              About this certificate
                            </h4>
                            <p className="text-content-primary/90 text-sm leading-relaxed">
                              {selectedCert.description}
                            </p>
                          </div>
                        )}

                        {selectedCert.tags.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-2 flex items-center gap-1">
                              <FiTag className="w-3 h-3" aria-hidden="true" />{" "}
                              Skills &amp; tags
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedCert.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedCert.verificationUrl &&
                          selectedCert.verificationUrl !==
                            "YOUR_VERIFICATION_URL" && (
                            <div className="mt-auto pt-2">
                              <a
                                href={selectedCert.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-bg-primary text-sm font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all shadow-glow-cyan"
                              >
                                View &amp; verify credential
                                <FiExternalLink
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              </a>
                            </div>
                          )}
                      </div>
                    </m.div>
                  </m.div>
                );
              })()}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Certifications;
