import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiSend, FiCheckCircle } from "react-icons/fi";
import Swal from "sweetalert2";

const Connect = () => {
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
        },
        {
            icon: FiInstagram,
            href: "#",
            label: "Instagram",
            color: "hover:bg-pink-500"
        }
    ];

    return (
        <section id="contact" className="section-padding bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                        Get In Touch
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        Let's Work
                        <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                            Together
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                        Have a project in mind or want to discuss opportunities? 
                        I'd love to hear from you. Let's create something amazing together!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                            <p className="text-neutral-300 leading-relaxed mb-8">
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
                                    <div key={index} className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                                            <p className="text-neutral-300">{info.value}</p>
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
                                            className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                                            aria-label={social.label}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="p-6 bg-gradient-to-r from-green-500/20 to-primary-500/20 rounded-2xl border border-green-500/30">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-300 font-medium">Available for new projects</span>
                            </div>
                            <p className="text-neutral-300 text-sm mt-2">
                                Currently accepting new freelance projects and full-time opportunities
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10">
                        <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                        <p className="text-neutral-300 mb-8">
                            Fill out the form below and I'll get back to you as soon as possible.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Project Discussion"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-5 h-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                            <div className="flex items-center space-x-2 text-primary-300 text-sm">
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