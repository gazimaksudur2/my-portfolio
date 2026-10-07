import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import SectionHeader from "../../components/SectionHeader";

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
		return { src: url, previewSrc: null, thumbnailSrc: null, kind: "pdf" };
	}

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
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedCert, setSelectedCert] = useState(null);
	const scrollRef = useRef(null);

	const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));
	const next = () => setActiveIndex((i) => Math.min(i + 1, certifications.length - 1));

	const openModal = (cert) => {
		setSelectedCert(cert);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedCert(null);
		document.body.style.overflow = "";
	};

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") closeModal();
			if (e.key === "ArrowLeft" && !selectedCert) prev();
			if (e.key === "ArrowRight" && !selectedCert) next();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [selectedCert]);

	// Scroll the active card into view
	useEffect(() => {
		if (!scrollRef.current) return;
		const card = scrollRef.current.children[activeIndex];
		if (card) {
			card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
		}
	}, [activeIndex]);

	return (
		<section id="certifications" className="section-padding bg-bg-secondary relative overflow-hidden">
			<div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<SectionHeader
					badge="Certifications & Learning"
					badgeColor="text-accent-violet"
					title="Growth &"
					titleAccent="Credentials"
					description="Ongoing learning in cloud architecture, DevOps, and modern development — starting with AWS as a differentiator."
				/>

				<div className="relative max-w-6xl mx-auto">
					{/* Controls */}
					<div className="flex justify-between items-center mb-6">
						<span className="text-sm text-content-muted">
							<span className="text-accent-cyan font-semibold">{activeIndex + 1}</span>
							{" / "}
							{certifications.length} credentials
						</span>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={prev}
								disabled={activeIndex === 0}
								className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-accent-cyan/20 bg-white/5 text-content-muted hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-glow-cyan transition-all disabled:opacity-30 disabled:cursor-not-allowed"
								aria-label="Previous"
							>
								<FiChevronLeft className="w-4 h-4" />
							</button>
							<button
								type="button"
								onClick={next}
								disabled={activeIndex === certifications.length - 1}
								className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-accent-cyan/20 bg-white/5 text-content-muted hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-glow-cyan transition-all disabled:opacity-30 disabled:cursor-not-allowed"
								aria-label="Next"
							>
								<FiChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Card track */}
					<div
						ref={scrollRef}
						className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
						style={{ scrollbarWidth: "none" }}
					>
						{certifications.map((cert, index) => {
							const isActive = index === activeIndex;
							const { previewSrc, thumbnailSrc, kind: certKind } = resolveCertMedia(
								cert.certificateUrl,
								cert.type
							);
							return (
								<motion.article
									key={cert.id}
									layout
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.4, delay: index * 0.06 }}
									animate={{
										scale: isActive ? 1 : 0.93,
										opacity: isActive ? 1 : 0.55,
									}}
									onClick={() => {
										setActiveIndex(index);
										openModal(cert);
									}}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => e.key === "Enter" && openModal(cert)}
									className={`min-w-[272px] sm:min-w-[300px] md:min-w-[320px] glass rounded-2xl border flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 transition-all duration-400 ${
										isActive
											? "border-accent-cyan/50 shadow-glow-cyan"
											: "border-white/10 hover:border-accent-cyan/30"
									}`}
								>
									<div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-bg-card flex-shrink-0">
										{previewSrc ? (
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
											<div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-cyan/10 to-bg-card">
												<FiAward className="w-10 h-10 text-accent-cyan" />
												<span className="text-xs font-medium text-content-muted uppercase tracking-wide">
													Credential record
												</span>
											</div>
										)}
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
										{isActive && (
											<div className="absolute inset-0 bg-accent-cyan/5 pointer-events-none" />
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
											onClick={(e) => {
												e.stopPropagation();
												setActiveIndex(index);
												openModal(cert);
											}}
											className="mt-4 inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-accent-cyan border border-accent-cyan/40 bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:shadow-glow-cyan transition-all"
										>
											<FiAward className="w-3.5 h-3.5" /> View Certificate
										</button>
									</div>
								</motion.article>
							);
						})}
					</div>

					{/* Dot indicator row */}
					<div className="flex justify-center gap-2 mt-6">
						{certifications.map((_, i) => (
							<button
								key={i}
								onClick={() => setActiveIndex(i)}
								className="transition-all duration-250 rounded-full focus:outline-none"
								aria-label={`Go to cert ${i + 1}`}
							>
								<motion.span
									animate={
										i === activeIndex
											? { width: 20, backgroundColor: "#00f5ff" }
											: { width: 8, backgroundColor: "rgba(255,255,255,0.2)" }
									}
									transition={{ duration: 0.25 }}
									className="block h-2 rounded-full"
								/>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Modal */}
			<AnimatePresence>
				{selectedCert && (() => {
					const { src: certSrc, kind: certKind } = resolveCertMedia(
						selectedCert.certificateUrl,
						selectedCert.type
					);
					return (
						<motion.div
							key="cert-modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
							onClick={closeModal}
						>
							<motion.div
								initial={{ scale: 0.95, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.95, opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="relative w-full max-w-xl lg:max-w-5xl xl:max-w-6xl glass border border-accent-cyan/20 rounded-2xl shadow-glow-cyan-lg overflow-hidden flex flex-col lg:flex-row max-h-[92vh]"
								onClick={(e) => e.stopPropagation()}
							>
									<button
										type="button"
										onClick={closeModal}
										className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-content-primary hover:bg-accent-cyan/20 hover:text-accent-cyan transition-colors"
										aria-label="Close"
									>
										<FiX className="w-4 h-4" />
									</button>

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

									<div className="flex-1 overflow-y-auto p-6 sm:p-7 lg:p-8 flex flex-col gap-4 bg-bg-card/80">
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

										<div className="flex flex-wrap gap-3 items-center">
											{selectedCert.platform && <PlatformBadge platform={selectedCert.platform} />}
											{selectedCert.date && (
												<span className="inline-flex items-center gap-1 text-xs text-content-muted">
													<FiCalendar className="w-3 h-3" />
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
												<p className="text-content-primary/90 text-sm lg:text-base leading-relaxed">
													{selectedCert.description}
												</p>
											</div>
										)}

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
								</motion.div>
							</motion.div>
					);
				})()}
			</AnimatePresence>
		</section>
	);
};

export default Certifications;
