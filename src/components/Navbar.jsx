import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiCode } from "react-icons/fi";
// import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '#skills', label: 'Skills' },
        { to: '#projects', label: 'Projects' },
        { to: '#experience', label: 'Experience' },
        { to: '#education', label: 'Education' },
        { to: '#testimonials', label: 'Testimonials' },
        { to: '#contact', label: 'Contact' }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-neutral-200' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link 
                        to={'/'} 
                        className="flex items-center space-x-3 group"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <FiCode className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                Gazi Maksudur Rahman
                            </h1>
                            <p className="text-sm text-neutral-600 font-medium">Full Stack Developer</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.to}
                                onClick={() => scrollToSection(link.to)}
                                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </button>
                        ))}
                        <a
                            href="https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenuAlt3 className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-300 ${
                    isMobileMenuOpen 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-2 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-lg border-t border-neutral-200 rounded-b-xl shadow-lg">
                        {navLinks.map((link) => (
                            <button
                                key={link.to}
                                onClick={() => scrollToSection(link.to)}
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                            >
                                {link.label}
                            </button>
                        ))}
                        <div className="pt-2 border-t border-neutral-200">
                            <a
                                href="https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;