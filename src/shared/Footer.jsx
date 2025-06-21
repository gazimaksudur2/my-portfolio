import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin, FiHeart, FiArrowUp } from "react-icons/fi";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' }
    ];

    const services = [
        'Frontend Development',
        'Backend Development',
        'Full Stack Solutions',
        'API Development',
        'Database Design',
        'Code Review & Optimization'
    ];

    const socialLinks = [
        {
            icon: FiGithub,
            href: "https://github.com/gazimaksudur2",
            label: "GitHub",
            color: "hover:text-gray-300"
        },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/gazimaksudur/",
            label: "LinkedIn",
            color: "hover:text-blue-400"
        },
        {
            icon: FiFacebook,
            href: "https://www.facebook.com/gazi.maksudur",
            label: "Facebook",
            color: "hover:text-blue-300"
        },
        {
            icon: FiInstagram,
            href: "#",
            label: "Instagram",
            color: "hover:text-pink-400"
        }
    ];

    return (
        <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m-4 4l4 4-4 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                Gazi's Portfolio
                            </h3>
                        </div>
                        <p className="text-neutral-300 leading-relaxed mb-6">
                            Passionate Full Stack Developer creating exceptional digital experiences 
                            with modern technologies and clean, efficient code.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 bg-white/10 rounded-lg text-neutral-400 transition-all duration-300 transform hover:scale-110 hover:bg-white/20 ${social.color}`}
                                        aria-label={social.label}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 text-left"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index} className="text-neutral-300 text-sm">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-neutral-300">
                                <FiMail className="w-4 h-4 text-primary-400" />
                                <span className="text-sm">gazimaksudur2@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-neutral-300">
                                <FiPhone className="w-4 h-4 text-primary-400" />
                                <span className="text-sm">+880 1903-219313</span>
                            </div>
                            <div className="flex items-center space-x-3 text-neutral-300">
                                <FiMapPin className="w-4 h-4 text-primary-400" />
                                <span className="text-sm">Akhalia, Sylhet, Bangladesh</span>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="mt-6">
                            <h5 className="font-medium mb-3">Stay Updated</h5>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-r-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
                                    <FiMail className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8 mt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-neutral-300 text-sm">
                            <span>© {new Date().getFullYear()} Gazi Maksudur Rahman. Made with</span>
                            <FiHeart className="w-4 h-4 text-red-400" />
                            <span>in Bangladesh</span>
                        </div>
                        <div className="flex items-center space-x-6 text-neutral-300 text-sm">
                            <button 
                                onClick={() => scrollToSection('#about')}
                                className="hover:text-primary-400 transition-colors duration-300"
                            >
                                Privacy Policy
                            </button>
                            <button 
                                onClick={() => scrollToSection('#contact')}
                                className="hover:text-primary-400 transition-colors duration-300"
                            >
                                Terms of Service
                            </button>
                            <button 
                                onClick={() => scrollToSection('#contact')}
                                className="hover:text-primary-400 transition-colors duration-300"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute bottom-8 right-8 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                aria-label="Scroll to top"
            >
                <FiArrowUp className="w-5 h-5" />
            </button>

            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl"></div>
            </div>
        </footer>
    );
};

export default Footer;