import { FiAward } from "react-icons/fi";

const certifications = [
    {
        title: "AWS Academy Graduate — Cloud Foundation",
        issuer: "AWS Academy",
        description: "Foundational cloud concepts and AWS services.",
    },
    {
        title: "AWS Academy Graduate — Cloud Developing",
        issuer: "AWS Academy",
        description: "Cloud application development and best practices.",
    },
];

const Certifications = () => {
    return (
        <section id="certifications" className="section-padding bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
                        Certifications & Learning
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        Growth &
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Credentials
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Ongoing learning in cloud and modern development.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex-shrink-0">
                                <FiAward className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-neutral-900">{cert.title}</h3>
                                <p className="text-primary-600 font-medium text-sm mt-1">{cert.issuer}</p>
                                <p className="text-neutral-600 text-sm mt-2">{cert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
