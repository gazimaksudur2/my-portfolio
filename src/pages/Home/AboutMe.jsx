import { FiCode, FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";

const AboutMe = () => {
    const highlights = [
        {
            icon: FiCode,
            title: "Clean Code",
            description: "Writing maintainable, scalable, and efficient code following best practices"
        },
        {
            icon: FiUsers,
            title: "Team Player", 
            description: "Collaborative approach with excellent communication and project management skills"
        },
        {
            icon: FiTrendingUp,
            title: "Continuous Learning",
            description: "Always staying updated with latest technologies and industry trends"
        },
        {
            icon: FiAward,
            title: "Quality Focused",
            description: "Committed to delivering high-quality solutions that exceed expectations"
        }
    ];

    const personalInfo = [
        { label: "Location", value: "Dhaka, Bangladesh" },
        { label: "Experience", value: "2+ Years" },
        { label: "Availability", value: "Open to opportunities" },
        { label: "Languages", value: "English, Bengali" }
    ];

    return (
        <section id="about" className="section-padding bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        About Me
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        Passionate Developer &
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Problem Solver
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        I'm a dedicated Full Stack Developer with a passion for creating innovative 
                        digital solutions. My journey in web development has been driven by curiosity, 
                        continuous learning, and a commitment to excellence.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-neutral-900">
                                Building Digital Experiences
                            </h3>
                            <div className="space-y-4 text-neutral-600 leading-relaxed">
                                <p>
                                    With over 2 years of experience in web development, I specialize in the 
                                    MERN stack and have a strong foundation in both frontend and backend 
                                    technologies. My approach combines technical expertise with creative 
                                    problem-solving to deliver exceptional user experiences.
                                </p>
                                <p>
                                    I believe in writing clean, maintainable code and following industry 
                                    best practices. Whether it's building responsive user interfaces, 
                                    developing robust APIs, or optimizing application performance, 
                                    I'm committed to delivering quality solutions.
                                </p>
                                <p>
                                    When I'm not coding, you'll find me exploring new technologies, 
                                    contributing to open-source projects, or sharing knowledge with 
                                    the developer community.
                                </p>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <h4 className="text-lg font-semibold text-neutral-900 mb-4">Quick Facts</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {personalInfo.map((info, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="text-sm text-neutral-500 font-medium">
                                            {info.label}
                                        </div>
                                        <div className="text-neutral-900 font-semibold">
                                            {info.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-neutral-900 text-center lg:text-left">
                            What Sets Me Apart
                        </h3>
                        <div className="grid gap-6">
                            {highlights.map((highlight, index) => {
                                const IconComponent = highlight.icon;
                                return (
                                    <div 
                                        key={index}
                                        className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                                                {highlight.title}
                                            </h4>
                                            <p className="text-neutral-600 leading-relaxed">
                                                {highlight.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 lg:p-12">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            Ready to Work Together?
                        </h3>
                        <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                            I'm always excited to take on new challenges and collaborate on 
                            innovative projects. Let's create something amazing together!
                        </p>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Let's Connect
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;