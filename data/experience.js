/**
 * Professional experience. Leave `period` empty to hide it.
 * Each contribution can link to a project case study via `projectSlug`.
 */

export const experience = [
  {
    company: 'Bodyline (Pvt) Ltd',
    group: 'MAS Holdings',
    // Optional logo in /public, shown on a white badge. Set to null to show an icon.
    logo: {
      src: '/logos/bodyline.png',
      width: 949,
      height: 256,
      alt: 'Bodyline, a joint venture with MAS, MAST Industries and Triumph',
    },
    role: 'Intern',
    type: 'Internship',
    period: '', // e.g. 'Jan 2025 – Jul 2025'
    location: '', // e.g. 'Sri Lanka'
    summary:
      'Contributed to business intelligence, enterprise application and process-automation work across three initiatives.',
    confidentiality:
      'Descriptions are generalised. No company data, internal dashboards or proprietary information are shown on this site.',
    contributions: [
      {
        id: 'A',
        title: 'Material Availability Dashboard',
        category: 'Data Analytics / Business Intelligence',
        domain: 'data-ai',
        featured: true,
        description:
          'An analytical dashboard focused on material availability monitoring and operational insights.',
        highlights: [
          'Data transformation',
          'Data modelling',
          'Analytical measures',
          'Dashboard development',
          'Integration of operational and SAP-related data',
        ],
        technologies: ['Power BI', 'Power Query', 'DAX', 'SQL'],
        projectSlug: 'material-availability-dashboard',
      },
      {
        id: 'B',
        title: 'Digital Pulse',
        category: 'Enterprise Software Development',
        domain: 'software',
        description: 'A project submission and approval workflow application.',
        highlights: [
          'Application feature development',
          'Workflow implementation',
          'Database integration',
          'Project management functionality',
        ],
        technologies: ['React', 'Node.js', 'Express', 'SQL Server', 'Azure SQL'],
        projectSlug: 'digital-pulse',
      },
      {
        id: 'C',
        title: 'DHL Package Tracker',
        category: 'Business Process Automation',
        domain: 'automation',
        description:
          'An inbound package tracking solution with automated notifications and escalation workflows.',
        highlights: ['Package tracking app', 'Automated notifications', 'Escalation workflows'],
        technologies: ['Power Apps', 'Power Automate', 'SharePoint'],
        projectSlug: 'dhl-package-tracker',
      },
    ],
  },
];
