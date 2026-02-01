const education = [
    {
        period: "2022 – 2026",
        degree: "B.Sc. in Computer Science",
        institution: "Shahjalal University of Science and Technology (SUST)",
        institutionShort: "SUST",
        cgpa: "CGPA 3.55 (till 7th semester)",
        focus: "Data structures, algorithms, web development, cloud fundamentals",
        logo: "https://sust.edu/public/img/sust_logo_big.png",
        primary: true,
    },
    {
        period: "2018 – 2020",
        degree: "Higher Secondary School Certificate",
        institution: "Major General Mahmudul Hasan Adarsha College, Tangail",
        institutionShort: "Science Department",
        logo: "https://i.ibb.co.com/q3JyVKCJ/347778677-1265633041011051-2411880285562199077-n.jpg",
        primary: false,
    },
    {
        period: "2016 – 2018",
        degree: "Secondary School Certificate",
        institution: "Jamurky N.S.A.G High School, Tangail",
        institutionShort: "Science Department",
        logo: "https://i.ibb.co/bXJ5kmH/jamuky-Logo.png",
        primary: false,
    },
];

const Education = () => {
    return (
        <section id="education" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        Education
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        Academic
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Background
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        B.Sc. in Computer Science at SUST. Will graduate in 2026. Focus on fundamentals and modern development.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {education.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                                item.primary
                                    ? "bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200"
                                    : "bg-neutral-50 border-neutral-100"
                            }`}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white border border-neutral-200 shadow-sm overflow-hidden">
                                <img src={item.logo} alt={item.institutionShort} className="w-10 h-10 object-contain" />
                            </div>
                            <div className="flex-1">
                                <span className="text-sm font-medium text-primary-600">{item.period}</span>
                                <h3 className="text-xl font-bold text-neutral-900 mt-1">{item.degree}</h3>
                                <p className="text-neutral-700 font-medium mt-1">{item.institution}</p>
                                {item.cgpa && (
                                    <p className="text-neutral-600 text-sm mt-2">{item.cgpa}</p>
                                )}
                                {item.focus && (
                                    <p className="text-neutral-600 text-sm mt-1">Focus: {item.focus}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
