// Single source of truth for all personal data used across sections.
// Keeps no duplication between Banner, Navbar, Connect, Footer, CommandPalette.

export const personalInfo = {
  name: 'Gazi Maksudur Rahman',
  title: 'Software & Cloud Engineer',
  tagline: 'Backend · Full-Stack · AWS · CI/CD',
  email: 'gazimaksudur2@gmail.com',
  phone: '+880 1903-219313',
  location: 'Dhaka, Bangladesh',
  resumeLink: '/resume.pdf',   // self-hosted; fallback to Drive if file is absent
  resumeDriveLink: 'https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view',
  linkedIn: 'https://www.linkedin.com/in/gazimaksudur/',
  github: 'https://github.com/gazimaksudur2',
  facebook: 'https://www.facebook.com/gazi.maksudur',
};

export const navLinks = [
  { to: '#projects',       label: 'Projects' },
  { to: '#experience',     label: 'Experience' },
  { to: '#skills',         label: 'Skills' },
  { to: '#about',          label: 'About' },
  { to: '#education',      label: 'Education' },
  { to: '#contact',        label: 'Contact' },
];

export const quickFacts = {
  location: 'Dhaka-1245, Bangladesh',
  experience: '2+ Years AI Training & QA',
  availability: 'Open to opportunities',
  languages: 'English, Bengali',
};

export const highlights = [
  {
    icon: 'FiCode',
    title: 'Backend Architecture & APIs',
    description:
      'Builds RESTful APIs and full-stack applications with TypeScript, Node.js, React, PostgreSQL, MongoDB, and MVC architecture.',
  },
  {
    icon: 'FiServer',
    title: 'Cloud & DevSecOps',
    description:
      'AWS Solutions Architect certified, with hands-on Docker containerisation and automated CI/CD pipeline experience using Jenkins.',
  },
  {
    icon: 'FiUsers',
    title: 'Collaborative & Analytical',
    description:
      'Experienced in production application workflows and evaluating AI-generated code for quality, security, logic, and edge cases.',
  },
  {
    icon: 'FiAward',
    title: 'Growth-Oriented & Dedicated',
    description:
      'Combines full-stack engineering, cloud architecture, and RLHF evaluation to deliver reliable, scalable software.',
  },
];
