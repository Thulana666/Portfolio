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
    role: 'Intern – Data Analytics',
    type: 'Internship',
    period: 'Sep 2025 – Mar 2026',
    location: '', // e.g. 'Sri Lanka'
    summary:
      'Worked across business intelligence, enterprise application development and process automation, from SAP-integrated Power BI analytics to approval workflows and package tracking.',
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
          'A Power BI dashboard that tracks material availability across categories and customers, delivering availability KPIs for supply-chain decision-making.',
        highlights: [
          'Integrated SAP and operational data',
          'Data transformation with Power Query',
          'Optimised data models',
          'DAX measures for availability KPIs',
          'Dashboard development',
        ],
        technologies: ['Power BI', 'Power Query', 'DAX', 'SQL'],
        projectSlug: 'material-availability-dashboard',
      },
      {
        id: 'B',
        title: 'Digital Pulse',
        category: 'Enterprise Software Development',
        domain: 'software',
        description:
          'An internal web application for submitting and managing digital improvement projects through multi-level approvals.',
        highlights: [
          'Multi-level approvals: Line Manager, Finance, Digital Team and ExCo',
          'Secure login and email-based approval access',
          'Project tracking dashboards',
          'File attachments',
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
          'A Power Apps solution for tracking inbound courier packages, built to improve package visibility and reduce clearance delays.',
        highlights: [
          'Integrated SharePoint waybill data',
          'Automated notifications',
          'Automated escalation workflows',
        ],
        technologies: ['Power Apps', 'Power Automate', 'SharePoint'],
        projectSlug: 'dhl-package-tracker',
      },
    ],
  },
];
