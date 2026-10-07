import { Suspense, lazy, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
	FiMail,
	FiPhone,
	FiMapPin,
	FiGithub,
	FiLinkedin,
	FiFacebook,
	FiSend,
	FiCheckCircle,
	FiGlobe,
	FiZap,
} from "react-icons/fi";
import Swal from "sweetalert2";
import CanvasFallback from "../../components/three/CanvasFallback";
import { getVisitorSummary } from "../../services/visitorStats";
import SectionHeader from "../../components/SectionHeader";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";

const FloatingSphere = lazy(() => import("../../components/three/FloatingSphere"));

const Connect = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [visitorSummary, setVisitorSummary] = useState({ total: 0, topCountries: [], loading: true });

	useEffect(() => {
		getVisitorSummary().then((data) => setVisitorSummary({ ...data, loading: false }));
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isSubmitting) return;

		const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
		const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
		const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

		if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
			Swal.fire({ icon: "error", title: "Email service not configured", text: "Missing EmailJS environment variables." });
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			Swal.fire({ icon: "warning", title: "Invalid email", text: "Please enter a valid email address." });
			return;
		}
		if (!formData.name || !formData.subject || !formData.message) {
			Swal.fire({ icon: "warning", title: "Missing fields", text: "Please fill in all required fields." });
			return;
		}

		setIsSubmitting(true);
		try {
			await emailjs.send(
				SERVICE_ID,
				TEMPLATE_ID,
				{
					from_name: formData.name,
					from_email: formData.email,
					subject: formData.subject,
					message: formData.message,
					reply_to: formData.email,
					website_url: window.location.origin,
					sent_at: new Date().toISOString(),
				},
				PUBLIC_KEY
			);
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Message sent successfully",
				text: "Thanks for reaching out. I'll get back to you shortly.",
				showConfirmButton: false,
				timer: 2500,
			});
			setFormData({ name: "", email: "", subject: "", message: "" });
		} catch {
			Swal.fire({
				icon: "error",
				title: "Failed to send message",
				text: "Please try again or contact me directly at gazimaksudur2@gmail.com.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactInfo = [
		{ icon: FiMapPin, title: "Location", value: "Dhaka-1245, Bangladesh" },
		{ icon: FiPhone, title: "Phone", value: "+880 1903 219313" },
		{ icon: FiMail, title: "Email", value: "gazimaksudur2@gmail.com" },
	];

	const socialLinks = [
		{ icon: FiGithub, href: "https://github.com/gazimaksudur2", label: "GitHub" },
		{ icon: FiLinkedin, href: "https://www.linkedin.com/in/gazimaksudur/", label: "LinkedIn" },
		{ icon: FiFacebook, href: "https://www.facebook.com/gazi.maksudur", label: "Facebook" },
	];

	return (
		<section id="contact" className="section-padding bg-bg-primary text-content-primary relative overflow-hidden">
			<div className="absolute inset-0 opacity-30 pointer-events-none">
				<div className="absolute top-0 left-0 w-96 h-96 bg-accent-cyan/20 rounded-full filter blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-violet/20 rounded-full filter blur-3xl" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<SectionHeader
					badge="Get In Touch"
					title="Let's Build Something"
					titleAccent="Together"
					description="Have a project in mind or want to discuss opportunities? I'm always open to new challenges."
				/>

				{/* Live visitor hint */}
				{!visitorSummary.loading && visitorSummary.total > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={viewportOnce}
						className="flex justify-center mb-10"
					>
						<div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-accent-cyan/20 text-sm text-content-muted">
							<FiGlobe className="w-4 h-4 text-accent-cyan" />
							<span>
								Visited by{" "}
								<span className="text-accent-cyan font-semibold">{visitorSummary.total}</span>{" "}
								people from{" "}
								{visitorSummary.topCountries.slice(0, 2).map((c) => c.country).join(", ")}
								{" "}and more
							</span>
						</div>
					</motion.div>
				)}

				{/* 3D globe — desktop only; hidden on tablet/mobile */}
				<div className="hidden lg:flex justify-center mb-12">
					<div className="w-64 h-64">
						<Suspense fallback={<CanvasFallback variant="sphere" className="w-full h-full" />}>
							<FloatingSphere accent="#00f5ff" globe />
						</Suspense>
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-16 items-start">
					{/* Info column */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={viewportOnce}
						variants={staggerContainer(0.15)}
						className="space-y-8"
					>
						<motion.div variants={fadeInUp}>
							<h3 className="text-2xl font-bold font-syne mb-4">Let's Connect</h3>
							<p className="text-content-muted leading-relaxed">
								I'm always open to discussing new projects, creative ideas, or opportunities.
								Reach out through any channel below — I usually reply within 24 hours.
							</p>
						</motion.div>

						{/* Contact info */}
						<motion.div variants={staggerContainer(0.1)} className="space-y-4">
							{contactInfo.map((info) => {
								const Icon = info.icon;
								return (
									<motion.div
										key={info.title}
										variants={fadeInUp}
										className="flex items-center space-x-4 p-5 glass rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300"
									>
										<div className="p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30">
											<Icon className="w-5 h-5 text-accent-cyan" />
										</div>
										<div>
											<h4 className="font-semibold text-content-primary text-sm">{info.title}</h4>
											<p className="text-content-muted text-sm mt-0.5">{info.value}</p>
										</div>
									</motion.div>
								);
							})}
						</motion.div>

						{/* Social links */}
						<motion.div variants={fadeInUp}>
							<h4 className="text-base font-semibold mb-4">Follow Me</h4>
							<div className="flex space-x-4">
								{socialLinks.map((social) => {
									const Icon = social.icon;
									return (
										<a
											key={social.label}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className="p-3 glass rounded-xl border border-white/10 text-content-primary hover:text-accent-cyan hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
											aria-label={social.label}
										>
											<Icon className="w-5 h-5" />
										</a>
									);
								})}
							</div>
						</motion.div>

						{/* Availability — live pulse */}
						<motion.div
							variants={fadeInUp}
							className="p-6 glass rounded-2xl border border-accent-green/30"
						>
							<div className="flex items-center gap-3 mb-2">
								<span className="relative flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
									<span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green shadow-glow-green" />
								</span>
								<span className="text-accent-green font-semibold">Open to opportunities</span>
							</div>
							<p className="text-content-muted text-sm leading-relaxed">
								Currently available for full-time roles and freelance projects · Dhaka, Bangladesh · Replies within 24 h
							</p>
							<div className="mt-3 flex items-center gap-2 text-xs text-content-muted/70">
								<FiZap className="w-3.5 h-3.5 text-accent-cyan" />
								Quick to onboard · Remote-friendly
							</div>
						</motion.div>
					</motion.div>

					{/* Form */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={viewportOnce}
						transition={{ duration: 0.6 }}
						className="glass glow-border rounded-3xl p-8 lg:p-10"
					>
						<h3 className="text-2xl font-bold font-syne mb-2">Send a Message</h3>
						<p className="text-content-muted mb-8 text-sm">
							Fill out the form and I'll get back to you as soon as possible.
						</p>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-content-muted mb-2">
										Full Name *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent focus:shadow-glow-cyan transition-all duration-300"
										placeholder="John Doe"
									/>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-content-muted mb-2">
										Email Address *
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent focus:shadow-glow-cyan transition-all duration-300"
										placeholder="john@example.com"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="subject" className="block text-sm font-medium text-content-muted mb-2">
									Subject *
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent focus:shadow-glow-cyan transition-all duration-300"
									placeholder="Project Discussion"
								/>
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium text-content-muted mb-2">
									Message *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={6}
									className="w-full px-4 py-3 bg-bg-card/60 border border-white/10 rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent focus:shadow-glow-cyan transition-all duration-300 resize-none"
									placeholder="Tell me about your project or opportunity…"
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="group relative w-full flex items-center justify-center px-8 py-4 font-semibold rounded-xl overflow-hidden border-2 border-accent-cyan text-accent-cyan hover:text-bg-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<span className="absolute inset-0 bg-accent-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
								<span className="relative z-10 flex items-center gap-2">
									{isSubmitting ? (
										<>
											<div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
											Sending…
										</>
									) : (
										<>
											<FiSend className="w-5 h-5" />
											Send Message
										</>
									)}
								</span>
							</button>
						</form>

						<div className="mt-6 p-4 glass rounded-xl border border-accent-cyan/20">
							<div className="flex items-center space-x-2 text-accent-cyan text-sm">
								<FiCheckCircle className="w-4 h-4" />
								<span>Your information is secure and will never be shared</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Connect;
