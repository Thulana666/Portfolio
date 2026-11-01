/**
 * Areas of expertise, in priority order. `visual` picks the abstract
 * illustration drawn on the card: 'analytics' | 'intelligence' | 'engineering'.
 */

export const expertise = [
  {
    priority: '01',
    level: 'Primary focus',
    title: 'Data Analytics & Business Intelligence',
    description:
      'Transforming raw and complex datasets into meaningful insights that support better business decisions.',
    technologies: ['Power BI', 'Power Query', 'DAX', 'Python', 'Pandas', 'NumPy', 'SQL', 'Matplotlib', 'Seaborn'],
    visual: 'analytics',
    tone: 'lime',
  },
  {
    priority: '02',
    level: 'Primary focus',
    title: 'Artificial Intelligence & Machine Learning',
    description:
      'Exploring intelligent systems, predictive analytics and machine learning approaches to address real-world challenges.',
    technologies: ['Python', 'Scikit-learn', 'Machine Learning', 'Predictive Analytics', 'Data Preprocessing', 'Model Evaluation'],
    visual: 'intelligence',
    tone: 'violet',
  },
  {
    priority: '03',
    level: 'Supporting strength',
    title: 'Software Engineering & Development',
    description:
      'Developing practical applications and technical systems that support digital transformation and intelligent solutions.',
    technologies: ['JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'Java', 'SQL', 'MongoDB'],
    visual: 'engineering',
    tone: 'blue',
  },
];
