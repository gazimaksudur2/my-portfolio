import { m } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/motion';

/**
 * Shared section chrome: badge pill → Syne heading → optional description.
 */
const SectionHeader = ({
  badge,
  title,
  titleAccent,
  description,
  badgeColor = 'text-accent-cyan',
}) => (
  <m.div
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    variants={staggerContainer(0.15)}
    className="text-center mb-14"
  >
    <m.div
      variants={fadeInUp}
      className={`inline-flex items-center px-4 py-2 glass-card ${badgeColor} rounded-full text-sm font-medium mb-4`}
    >
      {badge}
    </m.div>

    <m.h2
      variants={fadeInUp}
      className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-5"
    >
      {title}
      {titleAccent && <span className="block text-gradient">{titleAccent}</span>}
    </m.h2>

    {description && (
      <m.p
        variants={fadeInUp}
        className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
      >
        {description}
      </m.p>
    )}
  </m.div>
);

export default SectionHeader;
