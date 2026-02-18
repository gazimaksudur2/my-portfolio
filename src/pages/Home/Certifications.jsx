import { useRef } from "react";
import { FiAward, FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import certifications from "../../data/certifications.json";

const Certifications = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.firstChild?.getBoundingClientRect().width || 320;
        const offset = direction === "left" ? -cardWidth - 16 : cardWidth + 16;
        scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    return (
        <section id="certifications" className="section-padding bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
                        Certifications & Learning
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        Growth &
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Credentials
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Ongoing learning in cloud and modern development.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="flex justify-end mb-4 gap-2">
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 shadow-sm transition-colors"
                            aria-label="Previous certifications"
                        >
                            <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 shadow-sm transition-colors"
                            aria-label="Next certifications"
                        >
                            <FiChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent"
                    >
                        {certifications.map((cert) => (
                            <article
                                key={cert.id}
                                className="min-w-[280px] max-w-sm md:min-w-[320px] bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                            >
                                {cert.certificateUrl && (
                                    <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-neutral-100">
                                        <img
                                            src={cert.certificateUrl}
                                            alt={cert.title}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex-shrink-0">
                                            <FiAward className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-neutral-900">
                                                {cert.title}
                                            </h3>
                                            <p className="text-primary-600 font-medium text-xs mt-1">
                                                {cert.issuer}
                                                {cert.platform ? ` · ${cert.platform}` : ""}
                                            </p>
                                            {cert.date && (
                                                <p className="text-neutral-400 text-xs mt-0.5">
                                                    {cert.date}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-neutral-600 text-sm flex-1">
                                        {cert.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        {Array.isArray(cert.tags) && cert.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {cert.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {cert.verificationUrl && (
                                            <a
                                                href={cert.verificationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium text-primary-600 inline-flex items-center gap-1 hover:text-primary-700"
                                            >
                                                Verify
                                                <FiExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
