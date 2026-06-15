import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = [
	{
		period: "Jan 2022 – Apr 2026",
		degree: "B.Sc. in Computer Science and Engineering",
		institution: "Shahjalal University of Science and Technology (SUST)",
		institutionShort: "SUST",
		cgpa: "CGPA 3.57",
		focus: "Data structures, algorithms, web development, cloud fundamentals",
		logo: "https://upload.wikimedia.org/wikipedia/en/d/d9/Shahjalal_University_of_Science_and_Technology_logo.png",
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
	const sectionRef = useRef(null);
	const lineRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (!lineRef.current) return;
			gsap.fromTo(
				lineRef.current,
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: "none",
					transformOrigin: "top center",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 65%",
						end: "bottom 75%",
						scrub: true,
					},
				}
			);
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			id="education"
			ref={sectionRef}
			className="section-padding bg-bg-primary relative overflow-hidden"
		>
			<div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center mb-16">
					<div className="inline-flex items-center px-4 py-2 glass text-accent-cyan rounded-full text-sm font-medium mb-4">
						Education
					</div>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6">
						Academic
						<span className="block text-gradient">Background</span>
					</h2>
					<p className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed">
						B.Sc. in Computer Science at SUST. Will graduate in 2026. Focus on fundamentals and modern development.
					</p>
				</div>

				<div className="relative max-w-5xl mx-auto">
					{/* Timeline track */}
					<div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
					{/* Animated glowing fill (GSAP draws this on scroll) */}
					<div
						ref={lineRef}
						className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-cyan to-accent-violet shadow-glow-cyan origin-top"
						style={{ transform: "scaleY(0)" }}
					/>

					<div className="space-y-10">
						{education.map((item, index) => {
							const isLeft = index % 2 === 0;
							return (
								<div
									key={index}
									className={`relative flex items-center ${
										isLeft ? "md:justify-start" : "md:justify-end"
									}`}
								>
									{/* Glowing dot */}
									<div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
										<div
											className={`w-4 h-4 rounded-full border-2 ${
												item.primary
													? "bg-accent-cyan border-accent-cyan shadow-glow-cyan"
													: "bg-bg-card border-accent-cyan/60 shadow-glow-cyan"
											}`}
										/>
									</div>

									{/* Card */}
									<motion.div
										initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
										className={`ml-14 md:ml-0 w-full md:w-[45%] ${
											isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
										}`}
									>
										<div
											className={`flex flex-col sm:flex-row gap-6 p-6 rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-cyan ${
												item.primary
													? "border border-accent-cyan/40"
													: "border border-white/10"
											}`}
										>
											<div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-bg-card border border-white/10 overflow-hidden">
												<img src={item.logo} alt={item.institutionShort} className="w-10 h-10 object-contain" />
											</div>
											<div className="flex-1">
												<span className="text-sm font-medium text-accent-cyan">{item.period}</span>
												<h3 className="text-xl font-bold font-syne text-content-primary mt-1">{item.degree}</h3>
												<p className="text-content-primary/80 font-medium mt-1">{item.institution}</p>
												{item.cgpa && (
													<p className="text-content-muted text-sm mt-2">{item.cgpa}</p>
												)}
												{item.focus && (
													<p className="text-content-muted text-sm mt-1">Focus: {item.focus}</p>
												)}
											</div>
										</div>
									</motion.div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Education;
