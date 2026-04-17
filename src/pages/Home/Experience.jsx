import { FiCode, FiBriefcase } from "react-icons/fi";

const experiences = [
    {
        period: "Jul 2025 – Jan 2026",
        title: "Jr. Full Stack Developer",
        org: "Digital Way Business LTD",
        icon: FiCode,
        color: "from-primary-500 to-secondary-500",
        points: [
            "Contributed to the end-to-end development and commercial deployment of 'SyloTea,' an e-commerce product.",
            "Maintained and optimized the web server environment utilizing Node.js and Express.js.",
            "Designed and implemented database architecture using PostgreSQL and Prisma ORM.",
            "Enhanced UX by applying UI design principles and developing frontend components with React.js.",
        ],
    },
    {
        period: "Mar 2024 – Present",
        title: "AI Software Trainer & QA Specialist",
        org: "Outlier AI (Freelance)",
        icon: FiBriefcase,
        color: "from-secondary-500 to-primary-500",
        points: [
            "Executed rigorous SQA by debugging AI-generated code across Python, JavaScript, and C++.",
            "Led multiple RLHF projects, training machine learning models based on technical evaluations.",
            "Identified edge cases and security vulnerabilities.",
            "Provided feedback on Git workflows and industry SDLC standards.",
        ],
    },
];

const Experience = () => {
    return (
        <section id="experience" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        Experience
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        Professional
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Experience
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        My experience balances building scalable, production-grade applications with 
                        rigorous quality assurance, system optimization, and training robust machine learning models.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {experiences.map((exp, index) => {
                        const IconComponent = exp.icon;
                        return (
                            <div
                                key={index}
                                className="p-6 lg:p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${exp.color} mb-4`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-medium text-primary-600">{exp.period}</span>
                                <h3 className="text-xl font-bold text-neutral-900 mt-1">{exp.title}</h3>
                                <p className="text-neutral-600 font-medium mb-4">{exp.org}</p>
                                <ul className="space-y-2">
                                    {exp.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-neutral-600 text-sm">
                                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
