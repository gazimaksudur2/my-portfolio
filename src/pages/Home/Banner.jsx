import { useEffect, useState } from "react";
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const roles = [
        'MERN Stack Developer',
        'React & Next.js Developer',
        'CSE Student at SUST',
        'Cloud & AWS Learner'
    ];

    const stats = [
        { number: "10+", label: "Projects Completed" },
        { number: "2+", label: "Years Project-Based Experience" },
        { number: "15+", label: "Technologies" },
        { number: "—", label: "Open to Opportunities" }
    ];

    const highlights = [
        { label: "Bangladesh 🇧🇩", key: "location" },
        { label: "CSE Student at SUST", key: "sust" },
        { label: "AWS Academy Graduate", key: "aws" },
    ];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-primary-600 font-medium">
                                <div className="w-8 h-px bg-primary-500"></div>
                                <span>Hello, I'm</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                                <span className="block">Gazi Maksudur</span>
                                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                    Rahman
                                </span>
                            </h1>

                            <div className="text-xl sm:text-2xl lg:text-3xl text-neutral-600 font-medium h-16 flex items-center">
                                <span className="mr-3">I'm a</span>
                                <span className="text-primary-600 font-semibold">
                                    <Typewriter
                                        words={roles}
                                        loop={0}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={100}
                                        deleteSpeed={50}
                                        delaySpeed={2000}
                                    />
                                </span>
                            </div>

                            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
                                I'm a MERN Stack Developer specializing in React, Next.js, and modern web technologies. 
                                I build scalable, user-focused web applications and actively work on real-world projects 
                                including fintech and agricultural e-commerce platforms.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {highlights.map((h) => (
                                    <span
                                        key={h.key}
                                        className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100"
                                    >
                                        {h.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                            >
                                <FiDownload className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                Download Resume
                                <FiExternalLink className="ml-2 w-4 h-4 opacity-70" />
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-600 font-semibold rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 group"
                            >
                                <FiMail className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                Let's Talk
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-6 pt-4">
                            <span className="text-neutral-600 font-medium">Follow me:</span>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/gazimaksudur2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 rounded-full transition-all duration-300 hover:scale-110"
                                >
                                    <FiGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/gazi-maksudur-rahman"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-600 rounded-full transition-all duration-300 hover:scale-110"
                                >
                                    <FiLinkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className={`relative ${mounted ? 'animate-fade-in-right' : 'opacity-0'}`}>
                        <div className="relative">
                            <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl rotate-6 transform transition-transform duration-700 hover:rotate-12"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-3xl -rotate-6 transform transition-transform duration-700 hover:-rotate-12 opacity-80"></div>
                                <img
                                    src="https://i.ibb.co/nk2X4F0/selfie-png.png"
                                    alt="Gazi Maksudur Rahman"
                                    className="relative w-full h-full object-cover rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 z-10"
                                />
                            </div>
                            
                            {/* Floating elements */}
                            <div className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float animation-delay-2000">
                                <span className="text-2xl">🚀</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className={`mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 ${mounted ? 'animate-fade-in-up animation-delay-1000' : 'opacity-0'}`}>
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-neutral-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default Banner;