import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';

const education = [
  {
    period: 'Jan 2022 – Aug 2026',
    degree: 'B.Sc. in Computer Science and Engineering',
    institution: 'Shahjalal University of Science and Technology (SUST)',
    institutionShort: 'SUST',
    cgpa: 'CGPA 3.58',
    focus: 'Data structures, algorithms, web development, cloud fundamentals',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d9/Shahjalal_University_of_Science_and_Technology_logo.png',
    primary: true,
  },
  {
    period: '2018 – 2020',
    degree: 'Higher Secondary Certificate (HSC) — Science',
    institution: 'Major General Mahmudul Hasan Adarsha College, Tangail',
    institutionShort: 'Science Dept.',
    logo: 'https://i.ibb.co.com/q3JyVKCJ/347778677-1265633041011051-2411880285562199077-n.jpg',
    primary: false,
  },
  {
    period: '2016 – 2018',
    degree: 'Secondary School Certificate (SSC) — Science',
    institution: 'Jamurky N.S.A.G High School, Tangail',
    institutionShort: 'Science Dept.',
    logo: 'https://i.ibb.co/bXJ5kmH/jamuky-Logo.png',
    primary: false,
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 65%', 'end 75%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Education"
          title="Academic"
          titleAccent="Background"
          description="B.Sc. graduate in Computer Science and Engineering from SUST, with a focus on software engineering and cloud technologies."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline track */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
          {/* Animated glowing fill */}
          <m.div
            style={{ scaleY: lineScaleY, transformOrigin: 'top center' }}
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-cyan to-accent-violet origin-top"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {education.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        item.primary
                          ? 'bg-accent-cyan border-accent-cyan shadow-glow-cyan'
                          : 'bg-bg-card border-accent-cyan/60'
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <m.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-14 md:ml-0 w-full md:w-[45%] ${
                      isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div
                      className={`flex flex-col sm:flex-row gap-5 p-6 rounded-2xl glass-card hover:-translate-y-0.5 hover:shadow-glow-cyan transition-all duration-300 ${
                        item.primary ? 'border border-accent-cyan/40' : 'border border-white/10'
                      }`}
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-bg-card border border-white/10 overflow-hidden">
                        <img
                          src={item.logo}
                          alt={item.institutionShort}
                          width="40"
                          height="40"
                          loading="lazy"
                          decoding="async"
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-accent-cyan">{item.period}</span>
                        <h3 className="text-lg font-bold font-syne text-content-primary mt-1">{item.degree}</h3>
                        <p className="text-content-primary/80 font-medium mt-1 text-sm">{item.institution}</p>
                        {item.cgpa && <p className="text-content-muted text-sm mt-1">{item.cgpa}</p>}
                        {item.focus && <p className="text-content-muted text-sm mt-1">Focus: {item.focus}</p>}
                      </div>
                    </div>
                  </m.div>
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
