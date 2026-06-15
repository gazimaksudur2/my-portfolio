import { Suspense, lazy, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiFacebook, FiSend, FiCheckCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { useIsMobile } from "../../hooks/useIsMobile";
import CanvasFallback from "../../components/three/CanvasFallback";

const FloatingSphere = lazy(() => import("../../components/three/FloatingSphere"));

const Connect = () => {
    const isMobile = useIsMobile();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            Swal.fire({
                icon: "error",
                title: "Email service not configured",
                text: "Missing EmailJS environment variables. Please add them to your .env and restart the dev server.",
            });
            return;
        }

        // lightweight validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: "warning",
                title: "Invalid email",
                text: "Please enter a valid email address.",
            });
            return;
        }
        if (!formData.name || !formData.subject || !formData.message) {
            Swal.fire({
                icon: "warning",
                title: "Missing fields",
                text: "Please fill in all required fields.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email,
                website_url: window.location.origin,
                sent_at: new Date().toISOString(),
            };

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Message sent successfully",
                text: "Thanks for reaching out. I’ll get back to you shortly.",
                showConfirmButton: false,
                timer: 2500,
            });

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Failed to send message",
                text: "Please try again in a moment or contact me directly at gazimaksudur2@gmail.com.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FiMapPin,
            title: "Location",
            value: "Akhalia, Sylhet, Bangladesh",
            color: "text-green-500"
        },
        {
            icon: FiPhone,
            title: "Phone",
            value: "+880 1903-219313",
            color: "text-blue-500"
        },
        {
            icon: FiMail,
            title: "Email",
            value: "gazimaksudur2@gmail.com",
            color: "text-purple-500"
        }
    ];

    const socialLinks = [
        {
            icon: FiGithub,
            href: "https://github.com/gazimaksudur2",
            label: "GitHub",
            color: "hover:bg-gray-800"
        },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/gazimaksudur/",
            label: "LinkedIn",
            color: "hover:bg-blue-600"
        },
        {
            icon: FiFacebook,
            href: "https://www.facebook.com/gazi.maksudur",
            label: "Facebook",
            color: "hover:bg-blue-500"
        }
    ];

    return (
        <section id="contact" className="section-padding bg-bg-primary text-content-primary relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent-cyan/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-violet/20 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 glass text-accent-cyan rounded-full text-sm font-medium mb-4">
                        Get In Touch
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne mb-6">
                        <span className="animate-gradient-text">Let's Build Something Together</span>
                    </h2>
                    <p className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed">
                        Have a project in mind or want to discuss opportunities?
                        I'd love to hear from you. Let's create something amazing together!
                    </p>
                </div>

                {/* 3D globe with Bangladesh highlighted */}
                <div className="flex justify-center mb-12">
                    <div className="w-56 h-56 sm:w-64 sm:h-64">
                        {isMobile ? (
                            <CanvasFallback variant="sphere" className="w-full h-full" />
                        ) : (
                            <Suspense fallback={<CanvasFallback variant="sphere" className="w-full h-full" />}>
                                <FloatingSphere accent="#00f5ff" globe />
                            </Suspense>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold font-syne mb-6">Let's Connect</h3>
                            <p className="text-content-muted leading-relaxed mb-8">
                                I'm always open to discussing new projects, creative ideas, or
                                opportunities to be part of your vision. Feel free to reach out
                                through any of the channels below.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => {
                                const IconComponent = info.icon;
                                return (
                                    <div key={index} className="flex items-center space-x-4 p-6 glass rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30">
                                            <IconComponent className="w-6 h-6 text-accent-cyan" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-content-primary mb-1">{info.title}</h4>
                                            <p className="text-content-muted">{info.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 glass rounded-xl border border-white/10 text-content-primary hover:text-accent-cyan hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 transform hover:scale-110"
                                            aria-label={social.label}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="p-6 glass rounded-2xl border border-accent-green/30">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse shadow-glow-green"></div>
                                <span className="text-accent-green font-medium">Available for new projects</span>
                            </div>
                            <p className="text-content-muted text-sm mt-2">
                                Currently accepting new freelance projects and full-time opportunities
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass glow-border rounded-3xl p-8 lg:p-10">
                        <h3 className="text-2xl font-bold font-syne mb-2">Send a Message</h3>
                        <p className="text-content-muted mb-8">
                            Fill out the form below and I'll get back to you as soon as possible.
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
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full flex items-center justify-center px-8 py-4 font-semibold rounded-xl overflow-hidden border-2 border-accent-cyan text-accent-cyan hover:text-bg-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 bg-accent-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10 flex items-center">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="w-5 h-5 mr-2" />
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Connect;
