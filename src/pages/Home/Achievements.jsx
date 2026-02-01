import { FiTarget, FiZap, FiUsers, FiMessageCircle } from "react-icons/fi";

const achievements = [
    {
        icon: FiTarget,
        title: "Real project contributions",
        description: "Contributed to real fintech and agri-tech platforms; participated in system architecture discussions.",
    },
    {
        icon: FiZap,
        title: "Problem-solving & production",
        description: "Solved deployment and authentication issues; delivered real production features.",
    },
    {
        icon: FiUsers,
        title: "Leadership in meetings",
        description: "Participated in requirement analysis and planning (e.g. SmartAgroConnect meetings).",
    },
    {
        icon: FiMessageCircle,
        title: "Communication & growth",
        description: "Motivated to improve English and communication; AWS-certified learner.",
    },
];

const Achievements = () => {
    return (
        <section id="achievements" className="section-padding bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
                        Achievements & Highlights
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        What I've Done
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            So Far
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Practical, growth-oriented contributions—real projects, teamwork, and continuous learning.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {achievements.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex-shrink-0">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                                    <p className="text-neutral-600 text-sm mt-2 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
