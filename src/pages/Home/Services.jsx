import { FiCode, FiSmartphone, FiDatabase, FiTool, FiCloud, FiUsers } from "react-icons/fi";

const Services = () => {
    const services = [
        {
            icon: FiCode,
            title: "Frontend Development",
            description: "Creating responsive, interactive user interfaces using React, TypeScript, and modern CSS frameworks.",
            features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: FiDatabase,
            title: "Backend Development", 
            description: "Building robust APIs and server-side applications with Node.js, Express, and database integration.",
            features: ["Node.js/Express", "RESTful APIs", "MongoDB/MySQL", "Authentication"],
            color: "from-green-500 to-green-600"
        },
        {
            icon: FiSmartphone,
            title: "Full Stack Solutions",
            description: "End-to-end web application development from concept to deployment with modern tech stacks.",
            features: ["MERN Stack", "MEAN Stack", "Database Design", "API Integration"],
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: FiCloud,
            title: "Deployment & DevOps",
            description: "Deploying applications to cloud platforms with CI/CD pipelines and performance optimization.",
            features: ["Firebase", "Vercel", "Netlify", "Docker"],
            color: "from-orange-500 to-orange-600"
        },
        {
            icon: FiTool,
            title: "Code Review & Optimization",
            description: "Analyzing existing codebases for performance improvements, security, and best practices.",
            features: ["Performance Audit", "Code Refactoring", "Security Review", "Documentation"],
            color: "from-red-500 to-red-600"
        },
        {
            icon: FiUsers,
            title: "Consultation & Mentoring",
            description: "Providing technical guidance, code reviews, and mentoring for development teams and individuals.",
            features: ["Technical Consulting", "Code Mentoring", "Architecture Planning", "Best Practices"],
            color: "from-indigo-500 to-indigo-600"
        }
    ];

    return (
        <section id="services" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
                        Services
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        What I Can Do
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            For You
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        I offer comprehensive web development services to help bring your ideas to life. 
                        From concept to deployment, I ensure quality, performance, and user satisfaction.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div 
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="text-neutral-600 leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-neutral-800 uppercase tracking-wide">
                                            Key Features
                                        </h4>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center text-sm text-neutral-600">
                                                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Process Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                            My Development Process
                        </h3>
                        <p className="text-neutral-600 max-w-2xl mx-auto">
                            A systematic approach to ensure project success and client satisfaction
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Discovery", description: "Understanding your requirements and goals" },
                            { step: "02", title: "Planning", description: "Creating detailed project roadmap and timeline" },
                            { step: "03", title: "Development", description: "Building your solution with regular updates" },
                            { step: "04", title: "Delivery", description: "Testing, deployment, and ongoing support" }
                        ].map((process, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <span className="text-white font-bold text-lg">{process.step}</span>
                                    </div>
                                    {index < 3 && (
                                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200 -z-10"></div>
                                    )}
                                </div>
                                <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                                    {process.title}
                                </h4>
                                <p className="text-neutral-600 text-sm">
                                    {process.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-neutral-50 to-primary-50 rounded-3xl p-8 lg:p-12 border border-neutral-200">
                        <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
                            Let's discuss your ideas and create something amazing together. 
                            I'm here to help turn your vision into reality.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Start a Project
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center px-8 py-4 border-2 border-primary-500 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300"
                            >
                                View My Work
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services; 