import { FiCode, FiServer, FiDatabase, FiCloud, FiTool } from "react-icons/fi";

const skillCategories = [
    {
        id: "frontend",
        title: "Frontend",
        icon: FiCode,
        color: "from-primary-500 to-primary-600",
        skills: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind / CSS", "Responsive UI"],
    },
    {
        id: "backend",
        title: "Backend",
        icon: FiServer,
        color: "from-secondary-500 to-secondary-600",
        skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    },
    {
        id: "database",
        title: "Database",
        icon: FiDatabase,
        color: "from-green-500 to-green-600",
        skills: ["MongoDB", "Firebase", "MySQL", "PostgreSQL"],
    },
    {
        id: "cloud",
        title: "Cloud & DevOps",
        icon: FiCloud,
        color: "from-orange-500 to-orange-600",
        skills: ["AWS (Academy Graduate)", "Docker", "Deployment (Vercel, Netlify, etc.)"],
    },
    {
        id: "tools",
        title: "Tools",
        icon: FiTool,
        color: "from-neutral-600 to-neutral-700",
        skills: ["Git & GitHub", "Postman", "Figma"],
    },
];

const MySkills = () => {
    return (
        <section id="skills" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        Technical Skills
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        What I Work With
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            By Category
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        My continuous learning mindset keeps me updated with the latest trends and technologies 
                        in web development, enabling me to deliver cutting-edge solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                    {skillCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={category.id}
                                className="group bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden flex flex-col justify-between"
                            >
                                <div className="p-6">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-4 mt-4">
                                        {category.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {category.skills.map((skill, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-neutral-600">
                                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`h-1 w-full bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MySkills;
