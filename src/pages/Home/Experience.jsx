import { FiCode, FiBriefcase } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";
import SectionHeader from "../../components/SectionHeader";

const experiences = [
    {
        period: "Sept 2026 – Present",
        title: "Software Engineer Intern",
        org: "W3 Engineers LTD. · Dhaka, Bangladesh",
        icon: FiCode,
        current: true,
        points: [
            "Completed intensive full-stack training in HTML, CSS, Tailwind CSS, JavaScript, React, Next.js, Go, Beego, Python, and Flask.",
            "Studied modern AI and automation techniques, including web scraping, LLMs, AI agents, and MCP.",
            "Transitioned to a live project team, contributing to backend API development and production application workflows.",
        ],
    },
    {
        period: "Mar 2024 – Feb 2026",
        title: "AI Software Trainer & QA Specialist",
        org: "Outlier AI · Remote",
        icon: FiBriefcase,
        points: [
            "Contributed to large-scale RLHF pipelines by evaluating code quality, security, and logic in AI-generated solutions.",
            "Reviewed Python, JavaScript, and C++ code to identify anti-patterns, logic flaws, and security vulnerabilities.",
            "Provided qualitative feedback and comparative rankings to improve model reasoning and accuracy.",
        ],
    },
];

const Experience = () => {
    return (
        <section id="experience" className="section-padding bg-bg-secondary relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader
                    badge="Experience"
                    title="Professional"
                    titleAccent="Experience"
                    description="A mix of production software engineering and rigorous AI quality evaluation."
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={staggerContainer(0.15)}
                    className="grid md:grid-cols-2 gap-6 lg:gap-8"
                >
                    {experiences.map((exp, index) => {
                        const IconComponent = exp.icon;
                        return (
                            <motion.article
                                key={index}
                                variants={fadeInUp}
                                className="group h-full p-6 lg:p-8 glass rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between gap-4 mb-5">
                                    <div className="inline-flex p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                                        <IconComponent className="w-6 h-6 text-accent-cyan" />
                                    </div>
                                    {exp.current && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-green/25 bg-accent-green/10 text-accent-green text-xs font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                                            Current
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-accent-cyan">{exp.period}</p>
                                <h3 className="text-xl lg:text-2xl font-bold font-syne text-content-primary mt-1">{exp.title}</h3>
                                <p className="text-content-muted font-medium mt-1 mb-6">{exp.org}</p>
                                <ul className="space-y-3">
                                    {exp.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-content-muted text-sm leading-relaxed">
                                            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 mr-3 flex-shrink-0 shadow-glow-cyan" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
