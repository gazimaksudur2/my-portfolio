import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "TechStart Inc.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            content: "Gazi delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and ability to understand our business requirements made the entire process smooth and efficient.",
            rating: 5,
            project: "E-commerce Platform"
        },
        {
            name: "Michael Chen",
            role: "Startup Founder",
            company: "InnovateLab",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            content: "Working with Gazi was a game-changer for our startup. He built a robust full-stack application that helped us secure our first round of funding. His technical expertise and communication skills are outstanding.",
            rating: 5,
            project: "Full Stack Web App"
        },
        {
            name: "Emily Rodriguez",
            role: "Marketing Director",
            company: "Creative Agency",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            content: "The portfolio website Gazi created for our agency has significantly improved our client acquisition. The design is modern, responsive, and perfectly represents our brand. Highly recommended!",
            rating: 5,
            project: "Portfolio Website"
        },
        {
            name: "David Kumar",
            role: "CTO",
            company: "DataFlow Solutions",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            content: "Gazi's expertise in the MERN stack helped us modernize our legacy system. His clean code practices and thorough documentation made the handover seamless. A true professional!",
            rating: 5,
            project: "System Modernization"
        },
        {
            name: "Lisa Thompson",
            role: "Educational Coordinator",
            company: "Learn Plus Academy",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            content: "The learning management system Gazi developed has transformed how we deliver education. The user experience is intuitive, and the admin panel makes content management effortless.",
            rating: 5,
            project: "Learning Management System"
        }
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id="testimonials" className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-white/70 text-primary-700 rounded-full text-sm font-medium mb-4">
                        Testimonials
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        What Clients Say
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            About My Work
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Don't just take my word for it. Here's what clients and collaborators 
                        have to say about working with me.
                    </p>
                </div>

                {/* Main Testimonial */}
                <div className="relative max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform transition-all duration-500">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Client Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-primary-200"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left">
                                {/* Stars */}
                                <div className="flex justify-center lg:justify-start mb-4">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-6 italic">
                                    "{testimonials[currentIndex].content}"
                                </blockquote>

                                {/* Client Info */}
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-neutral-900">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-neutral-600">
                                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                                    </p>
                                    <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mt-2">
                                        {testimonials[currentIndex].project}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-neutral-600 hover:text-primary-600"
                        aria-label="Previous testimonial"
                    >
                        <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-neutral-600 hover:text-primary-600"
                        aria-label="Next testimonial"
                    >
                        <FiChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center space-x-3 mb-16">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'bg-primary-500 scale-125'
                                    : 'bg-neutral-300 hover:bg-neutral-400'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { number: "15+", label: "Happy Clients" },
                        { number: "20+", label: "Projects Completed" },
                        { number: "100%", label: "Satisfaction Rate" },
                        { number: "24/7", label: "Support Available" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center bg-white/70 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-neutral-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Ready to Join These Success Stories?
                    </h3>
                    <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Let's work together to create something amazing that your users will love
                        and that drives real business results.
                    </p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Get Started Today
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 