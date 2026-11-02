/**
 * Personal information, links and global site settings.
 * Edit this file to update your introduction, contact details, photo and CV.
 */

export const site = {
  // Logo text (nav, footer, social images) and page-title suffix.
  // The first word is shown in the main colour, the rest in the accent colour.
  brand: 'Thulana De Silva',
  name: 'Thulana De Silva',
  firstName: 'Thulana',
  initials: 'TD',

  role: 'Aspiring Data Analyst & AI Enthusiast',
  secondaryRole: 'Software Engineering & Development',

  headline: 'Turning Data Into Intelligence.',
  subheadline: 'Data. AI. Innovation.',
  altHeadline: 'Exploring the intersection of Data, AI and Technology.',

  heroIntro:
    "I'm Thulana, an IT undergraduate passionate about Data Analytics, Artificial Intelligence and Machine Learning. I explore how data and intelligent technologies can solve meaningful real-world problems.",

  introduction:
    "I'm Thulana, an Information Technology undergraduate passionate about Data Analytics, Artificial Intelligence and Machine Learning. I enjoy transforming complex data into meaningful insights and exploring intelligent solutions to real-world problems, supported by my experience in software development and enterprise technologies.",

  location: 'Colombo, Sri Lanka',

  // Short availability label shown in the hero. Set to '' to hide it.
  availability: 'Open to Data Analytics & AI opportunities',

  // Profile photo inside /public. Leave the file out (or set to null) and a
  // monogram is shown instead. Recommended: 4:5 portrait, at least 800x1000px.
  // Use a new file name when replacing it so cached copies aren't reused.
  photo: '/images/thulana-de-silva-portrait.jpg',

  // CV inside /public. If the file doesn't exist, CV buttons become
  // "Request CV" and link to the contact section instead.
  cv: '/cv/Thulana-De-Silva-CV.pdf',

  email: 'thulanads@gmail.com',

  socials: {
    github: 'https://github.com/Thulana666',
    linkedin: 'https://www.linkedin.com/in/thulana-de-silva',
  },

  seo: {
    title: 'Thulana De Silva — Data Analytics & AI',
    description:
      'Portfolio of Thulana De Silva, an IT undergraduate at SLIIT focused on Data Analytics, Business Intelligence, Artificial Intelligence and Machine Learning, with a supporting background in software engineering.',
    keywords: [
      'Thulana De Silva',
      'Data Analyst',
      'Data Analytics',
      'Business Intelligence',
      'Power BI',
      'Artificial Intelligence',
      'Machine Learning',
      'Python',
      'SLIIT',
      'Sri Lanka',
      'Portfolio',
    ],
  },
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/**
 * About section. `focus` items come from your stated interests.
 * `personalInterests` is the small "Beyond the screen" area: each item has a
 * `label` and an optional `detail`. It stays hidden while empty.
 */
export const about = {
  statement:
    'I am most interested in the point where raw data becomes a decision — and in building the intelligent systems that get it there.',
  paragraphs: [
    'I am an Information Technology undergraduate at the Sri Lanka Institute of Information Technology (SLIIT), focusing on Data Analytics, Artificial Intelligence and Machine Learning.',
    'During my data analytics internship at Bodyline (Pvt) Ltd, part of MAS Holdings, I worked on business intelligence and enterprise solutions — from Power BI analytics to workflow applications and process automation. That experience shaped how I think about data: it is only valuable when it helps people solve practical business problems.',
    'My final-year research explores how an AI-driven digital twin could make pharmaceutical supply chains more resilient.',
  ],
  facts: [
    { label: 'Studying', value: 'BSc (Hons) in Information Technology', detail: 'SLIIT · Undergraduate' },
    { label: 'Focus', value: 'Data Analytics, AI & Machine Learning', detail: 'Supported by software engineering' },
    { label: 'Industry', value: 'Data Analytics Intern', detail: 'MAS Bodyline · Sep 2025 – Mar 2026' },
  ],
  focus: [
    'Business Intelligence',
    'Predictive Analytics',
    'Data-Driven Decision Making',
    'Intelligent Automation',
    'Pharmaceutical Supply-Chain Intelligence',
  ],
  personalInterests: [
    {
      label: 'Bodybuilding',
      detail:
        'Training since 2020: at home until 2023, in the gym since. A personal passion built on discipline, consistency and steady progress.',
    },
    {
      label: 'Community service',
      detail: 'Committee Member, Club Service Avenue, Rotaract Club of Colombo Port City (2025 – Present)',
    },
    {
      label: 'Badminton',
      detail: 'Zonal Championship 2nd runner-up (2016) and 1st runner-up (2017); selected to junior nationals (2018)',
    },
  ],
};
