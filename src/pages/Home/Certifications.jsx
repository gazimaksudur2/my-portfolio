import { useEffect, useRef, useState } from "react";
import {
    FiAward,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiExternalLink,
    FiFileText,
    FiTag,
    FiX,
} from "react-icons/fi";
import certifications from "../../data/certifications.json";

/**
 * Resolves any certificateUrl into:
 *   { src, thumbnailSrc, kind }
 *
 *   src         — used in the modal  (iframe URL for PDFs, image URL for images)
 *   previewSrc  — used on the card as a scaled iframe preview (Drive PDFs only)
 *   thumbnailSrc — used on the card as a plain <img> (images, or Drive images)
 *   kind        — "image" | "pdf" | "none"
 *
 * Card rendering priority:
 *   1. previewSrc  → scaled-down <iframe>  (Drive PDFs — guaranteed first-page render)
 *   2. thumbnailSrc → <img>               (images)
 *   3. fallback placeholder
 */
const resolveCertMedia = (url, typeHint) => {
    if (!url) return { src: null, previewSrc: null, thumbnailSrc: null, kind: "none" };

    const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
    const driveOpenMatch = url.match(/[?&]id=([^&]+)/);
    const driveFileId =
        driveFileMatch?.[1] ??
        (url.includes("drive.google.com") ? driveOpenMatch?.[1] : null);

    const isPdf = typeHint === "pdf" || url.toLowerCase().includes(".pdf");

    if (isPdf) {
        if (driveFileId) {
            const iframeSrc = `https://drive.google.com/file/d/${driveFileId}/preview`;
            return { src: iframeSrc, previewSrc: iframeSrc, thumbnailSrc: null, kind: "pdf" };
        }
        // Non-Drive PDF — direct URL goes into iframe, no card thumbnail
        return { src: url, previewSrc: null, thumbnailSrc: null, kind: "pdf" };
    }

    // Google Drive image
    if (driveFileId) {
        const thumb = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w640`;
        return {
            src: `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1280`,
            previewSrc: null,
            thumbnailSrc: thumb,
            kind: "image",
        };
    }

    return { src: url, previewSrc: null, thumbnailSrc: url, kind: "image" };
};

const PlatformBadge = ({ platform }) => {
    const colors = {
        "AWS Academy": "bg-amber-500/15 text-amber-300 border-amber-500/30",
        KodeKloud: "bg-blue-500/15 text-blue-300 border-blue-500/30",
        Coursera: "bg-sky-500/15 text-sky-300 border-sky-500/30",
        "Programming Hero": "bg-purple-500/15 text-purple-300 border-purple-500/30",
    };
    const cls = colors[platform] ?? "bg-white/10 text-content-muted border-white/20";
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${cls}`}>
            {platform}
        </span>
    );
};

const Certifications = () => {
    const scrollRef = useRef(null);
    const [selectedCert, setSelectedCert] = useState(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.firstChild?.getBoundingClientRect().width || 320;
        const offset = direction === "left" ? -(cardWidth + 24) : cardWidth + 24;
        scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    const openModal = (cert) => {
        setSelectedCert(cert);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedCert(null);
        document.body.style.overflow = "";
    };

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") closeModal(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section id="certifications" className="section-padding bg-bg-secondary relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 glass text-accent-violet rounded-full text-sm font-medium mb-4">
                        Certifications &amp; Learning
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6">
                        Growth &amp;
                        <span className="block text-gradient">
                            Credentials
                        </span>
                    </h2>
                    <p className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed">
                        Ongoing learning in cloud, DevOps, and modern development.
                    </p>
                </div>

                {/* Slider */}
                <div className="relative max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-content-muted">{certifications.length} credentials</span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => scroll("left")}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-accent-cyan/20 bg-white/5 text-content-muted hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-glow-cyan transition-all"
                                aria-label="Previous certifications"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scroll("right")}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-accent-cyan/20 bg-white/5 text-content-muted hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-glow-cyan transition-all"
                                aria-label="Next certifications"
                            >
                                <FiChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#7c3aed transparent" }}
                    >
                        {certifications.map((cert, index) => {
                            const { previewSrc, thumbnailSrc, kind: certKind } = resolveCertMedia(cert.certificateUrl, cert.type);
                            return (
                                <article
                                    key={cert.id}
                                    onClick={() => openModal(cert)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === "Enter" && openModal(cert)}
                                    style={{ animationDelay: `${(index % 4) * 0.6}s` }}
                                    className="animate-floaty min-w-[272px] sm:min-w-[300px] md:min-w-[320px] glass rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 focus:ring-offset-2 focus:ring-offset-bg-secondary"
                                >
                                    <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-bg-card flex-shrink-0">
                                        {previewSrc ? (
                                            /* Scaled-down iframe — guaranteed first-page render for Drive PDFs */
                                            <iframe
                                                src={previewSrc}
                                                title={cert.title}
                                                loading="lazy"
                                                className="absolute top-0 left-0 border-0 pointer-events-none"
                                                style={{
                                                    width: "250%",
                                                    height: "250%",
                                                    transform: "scale(0.4)",
                                                    transformOrigin: "top left",
                                                }}
                                            />
                                        ) : thumbnailSrc ? (
                                            <>
                                                <img
                                                    src={thumbnailSrc}
                                                    alt={cert.title}
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                        e.currentTarget.nextSibling.style.display = "flex";
                                                    }}
                                                />
                                                <div className="h-full w-full hidden flex-col items-center justify-center">
                                                    <FiAward className="w-10 h-10 text-content-muted" />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-red-500/10 to-bg-card">
                                                <FiFileText className="w-10 h-10 text-red-400" />
                                                <span className="text-xs font-medium text-red-400 uppercase tracking-wide">PDF Certificate</span>
                                            </div>
                                        )}
                                        {/* PDF badge overlay */}
                                        {certKind === "pdf" && (
                                            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full pointer-events-none">
                                                <FiFileText className="w-3 h-3" /> PDF
                                            </div>
                                        )}
                                        {cert.platform && (
                                            <div className="absolute top-2 left-2">
                                                <PlatformBadge platform={cert.platform} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-sm font-semibold text-content-primary line-clamp-2 mb-1">
                                            {cert.title}
                                        </h3>
                                        <p className="text-accent-cyan text-xs font-medium">{cert.issuer}</p>
                                        {cert.date && (
                                            <p className="text-content-muted text-xs mt-0.5 flex items-center gap-1">
                                                <FiCalendar className="w-3 h-3" />
                                                {cert.date}
                                            </p>
                                        )}
                                        <p className="text-content-muted text-xs mt-2 line-clamp-2 flex-1">
                                            {cert.description}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {cert.tags?.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 text-content-muted text-[11px] border border-white/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); openModal(cert); }}
                                            className="mt-4 inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-accent-cyan border border-accent-cyan/40 bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:shadow-glow-cyan transition-all"
                                        >
                                            <FiAward className="w-3.5 h-3.5" /> View Certificate
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedCert && (() => {
                const { src: certSrc, kind: certKind } = resolveCertMedia(selectedCert.certificateUrl, selectedCert.type);
                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        {/* Panel — stacked on mobile, side-by-side on lg+ */}
                        <div
                            className="relative w-full max-w-xl lg:max-w-5xl xl:max-w-6xl glass border border-accent-cyan/20 rounded-2xl shadow-glow-cyan-lg overflow-hidden flex flex-col lg:flex-row max-h-[92vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={closeModal}
                                className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-content-primary hover:bg-accent-cyan/20 hover:text-accent-cyan transition-colors"
                                aria-label="Close"
                            >
                                <FiX className="w-4 h-4" />
                            </button>

                            {/* Left — certificate image or PDF embed */}
                            {certSrc && certKind !== "none" && (
                                <div className="w-full lg:w-[62%] xl:w-[65%] bg-black flex-shrink-0 flex items-center justify-center overflow-hidden max-h-72 lg:max-h-full">
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
                                            className="w-full h-full min-h-[300px] lg:min-h-0 border-0"
                                            allow="autoplay"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Right — details */}
                            <div className="flex-1 overflow-y-auto p-6 sm:p-7 lg:p-8 flex flex-col gap-4 bg-bg-card/80">

                                {/* Header */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 flex-shrink-0">
                                        <FiAward className="w-5 h-5 lg:w-6 lg:h-6 text-accent-cyan" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-syne text-content-primary leading-tight">
                                            {selectedCert.title}
                                        </h3>
                                        <p className="text-accent-cyan font-semibold text-sm lg:text-base mt-1">
                                            {selectedCert.issuer}
                                        </p>
                                        {selectedCert.platform && selectedCert.platform !== selectedCert.issuer && (
                                            <p className="text-content-muted text-sm mt-0.5">
                                                Platform: {selectedCert.platform}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Meta row */}
                                <div className="flex flex-wrap gap-3 items-center">
                                    {selectedCert.platform && <PlatformBadge platform={selectedCert.platform} />}
                                    {selectedCert.date && (
                                        <span className="inline-flex items-center gap-1 text-xs text-content-muted">
                                            <FiCalendar className="w-3 h-3" />
                                            Issued {selectedCert.date}
                                        </span>
                                    )}
                                </div>

                                {/* Divider */}
                                <hr className="border-white/10" />

                                {/* Description */}
                                {selectedCert.description && (
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-2">
                                            About this certificate
                                        </h4>
                                        <p className="text-content-primary/90 text-sm lg:text-base leading-relaxed">
                                            {selectedCert.description}
                                        </p>
                                    </div>
                                )}

                                {/* Topics */}
                                {Array.isArray(selectedCert.topics) && selectedCert.topics.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-2">
                                            Key topics covered
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                            {selectedCert.topics.map((topic) => (
                                                <li
                                                    key={topic}
                                                    className="flex items-start gap-2 text-content-primary/90 text-sm lg:text-base"
                                                >
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0 shadow-glow-cyan" />
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tags */}
                                {Array.isArray(selectedCert.tags) && selectedCert.tags.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-2 flex items-center gap-1">
                                            <FiTag className="w-3 h-3" /> Skills &amp; tags
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCert.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs lg:text-sm font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                {selectedCert.verificationUrl && (
                                    <div className="mt-auto pt-2">
                                        <a
                                            href={selectedCert.verificationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-bg-primary text-sm lg:text-base font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all shadow-glow-cyan hover:shadow-glow-cyan-lg"
                                        >
                                            View &amp; verify credential
                                            <FiExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}
        </section>
    );
};

export default Certifications;
