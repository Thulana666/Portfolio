/**
 * Projects, in display order (Data & AI first).
 *
 * Field guide
 * - slug:        URL of the case study → /projects/<slug>
 * - domain:      'data-ai' | 'software' | 'automation' (drives filters and styling)
 * - status:      'in-progress' | 'completed' | null (null shows no badge)
 * - visual:      abstract cover art used until you add real screenshots:
 *                'twin' | 'dashboard' | 'ml' | 'workflow' | 'platform' | 'automation'
 * - cover:       optional image path in /public to replace the abstract cover
 * - links:       github / demo — leave empty to hide the button
 * - caseStudy:   every list or text field is optional; empty fields are hidden.
 *                `results` should only contain verified outcomes.
 */

export const projects = [
  {
    slug: 'pharmaceutical-supply-chain-digital-twin',
    title: 'Pharmaceutical Supply-Chain Digital Twin',
    codename: 'PharmaTwin',
    category: 'Artificial Intelligence · Final-Year Project',
    domain: 'data-ai',
    status: 'in-progress',
    featured: true,
    context: 'SLIIT final-year research project · J26-IT-353',
    summary:
      'An AI-driven digital-twin framework for resilient pharmaceutical supply-chain optimization, integrating multi-source data, market intelligence, predictive analytics and intelligent warehouse management.',
    components: [
      'Digital-twin architecture and simulation',
      'Multi-source data integration and market intelligence',
      'Demand forecasting and predictive analytics',
      'Intelligent warehouse FEFO and QR spatial management',
    ],
    tech: ['Python', 'Machine Learning', 'NLP', 'FastAPI', 'Next.js', 'Node.js', 'Supabase'],
    visual: 'twin',
    cover: null,
    links: {
      github: 'https://github.com/Thulana666/J26-IT-353',
      demo: '',
    },
    caseStudy: {
      statusNote:
        'This is my ongoing final-year research project. The framework is still being designed and developed, so the content below describes its goals and proposed approach rather than finished results.',
      overview:
        'PharmaTwin is a research project that proposes an AI-driven digital twin of the pharmaceutical supply chain — a connected, data-driven model that aims to help the supply chain anticipate disruptions, plan demand and manage expiry-sensitive stock more intelligently.',
      problem:
        'Pharmaceutical supply chains have to balance strict shelf-life and storage requirements against uncertain demand and external disruptions. When signals about global events, stock levels, expiry dates and demand sit in separate places, it becomes difficult to anticipate shortages and act early.',
      objectives: [
        'Design a digital-twin architecture that represents the state of the supply chain and supports simulation.',
        'Integrate multi-source data, including market and event intelligence.',
        'Explore demand forecasting and predictive analytics to support planning decisions.',
        'Support warehouse operations through First-Expiry-First-Out (FEFO) dispatch and QR-based spatial management.',
      ],
      dataSourcesTitle: 'Planned data sources',
      dataSources: [
        'Global health and disruption feeds (for example WHO, ReliefWeb and GDACS)',
        'News and market-intelligence sources',
        'Inventory, batch and expiry records',
        'Historical demand and order data',
      ],
      methodology: [
        { title: 'Architecture', text: 'Design the digital-twin architecture that links data, models and decision dashboards.' },
        { title: 'Integration', text: 'Build pipelines that collect and normalise data from multiple external and internal sources.' },
        { title: 'Intelligence', text: 'Apply NLP and predictive models to surface disruption signals and forecast demand.' },
        { title: 'Operations', text: 'Translate insights into warehouse actions such as FEFO dispatch and QR-based location management.' },
      ],
      architectureTitle: 'Proposed architecture',
      architectureNote: 'Subject to change as the research progresses.',
      architecture: [
        { layer: 'Sources', items: ['Event & news feeds', 'Market signals', 'Inventory & orders'] },
        { layer: 'Ingestion & API', items: ['Node.js / Express', 'Validation', 'Schedulers'] },
        { layer: 'AI services', items: ['FastAPI', 'Classification', 'Forecasting'] },
        { layer: 'Data layer', items: ['Supabase', 'PostgreSQL'] },
        { layer: 'Interface', items: ['Next.js dashboards'] },
      ],
      implementation: [],
      progress: [], // e.g. { label: 'Literature review', state: 'done' | 'active' | 'next' }
      resultsNote: 'Results will be shared here once the framework has been evaluated.',
      results: [],
      challengesTitle: 'Key research challenges',
      challenges: [
        'Combining heterogeneous data sources that differ in format, reliability and update frequency.',
        'Keeping forecasts and recommendations explainable enough to support real operational decisions.',
        'Representing expiry-sensitive inventory accurately within a digital twin.',
      ],
      screenshots: [],
    },
  },
  {
    slug: 'material-availability-dashboard',
    title: 'Material Availability Dashboard',
    category: 'Data Analytics · Business Intelligence',
    domain: 'data-ai',
    status: null,
    context: 'Internship · Bodyline (Pvt) Ltd — MAS Holdings',
    summary:
      'An enterprise analytics dashboard focused on monitoring material availability and transforming operational data into useful insights.',
    tech: ['Power BI', 'Power Query', 'DAX', 'SQL'],
    visual: 'dashboard',
    cover: null,
    links: { github: '', demo: '' },
    caseStudy: {
      confidentiality:
        'Built for an internal business context. The visuals on this site are illustrative — no company data, internal dashboards or proprietary information are shown.',
      overview:
        'An analytics dashboard developed during my internship to monitor material availability and turn operational data into insights that support day-to-day decisions.',
      problem:
        'Monitoring material availability means bringing together data from several operational and SAP-related sources. Without a consolidated analytical view, it takes more effort to understand availability and act on it.',
      objectives: [
        'Consolidate operational and SAP-related data into a single analytical model.',
        'Provide a clear, interactive view of material availability.',
        'Create reusable analytical measures for consistent reporting.',
      ],
      dataSources: ['Operational data', 'SAP-related data'],
      methodology: [
        { title: 'Transform', text: 'Cleaned and shaped source data with Power Query.' },
        { title: 'Model', text: 'Built a data model relating operational and SAP-related tables.' },
        { title: 'Measure', text: 'Wrote analytical measures in DAX.' },
        { title: 'Visualise', text: 'Developed the Power BI dashboard for availability monitoring.' },
      ],
      implementation: [
        'Data transformation',
        'Data modelling',
        'Analytical measures',
        'Dashboard development',
        'Integration of operational and SAP-related data',
      ],
      results: [],
      challenges: [],
      screenshots: [],
    },
  },
  {
    slug: 'student-performance-predictor',
    title: 'Student Performance Predictor',
    category: 'Machine Learning',
    domain: 'data-ai',
    status: null,
    context: 'Individual project',
    summary:
      'A machine learning project involving student data analysis and academic performance prediction.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    visual: 'ml',
    cover: null,
    links: {
      github: 'https://github.com/Thulana666/student-performance-predictor',
      demo: '',
    },
    caseStudy: {
      overview:
        'A machine learning project that analyses student data and predicts whether a student will pass or fail based on exam scores and background information.',
      problem:
        'Understanding which factors relate to academic performance can help identify students who may benefit from support. This project explores those relationships and whether a model can predict pass/fail outcomes from them.',
      objectives: [
        'Explore and visualise how student attributes relate to performance.',
        'Prepare the data for machine learning.',
        'Train a classification model to predict pass/fail outcomes.',
        'Evaluate the model with standard classification metrics.',
      ],
      dataSources: [
        {
          label: 'Students Performance in Exams (Kaggle)',
          href: 'https://www.kaggle.com/datasets/spscientist/students-performance-in-exams',
        },
        'Gender, race/ethnicity, parental level of education, lunch type and test preparation course',
        'Math, reading and writing scores',
      ],
      methodology: [
        { title: 'Explore', text: 'Analysed the dataset with Pandas and visualised patterns with Seaborn and Matplotlib.' },
        { title: 'Prepare', text: 'Preprocessed the attributes for modelling.' },
        { title: 'Model', text: 'Trained a Random Forest classifier with Scikit-learn.' },
        { title: 'Evaluate', text: 'Assessed the model with accuracy, a confusion matrix and a classification report.' },
      ],
      implementation: [],
      results: [],
      challenges: [],
      screenshots: [
        {
          src: '/projects/student-performance-predictor/evaluation.png',
          alt: 'Jupyter notebook output showing a classification report and a confusion matrix heatmap',
          caption: 'Model evaluation in the project notebook — classification report and confusion matrix.',
          width: 1567,
          height: 978,
        },
      ],
    },
  },
  {
    slug: 'digital-pulse',
    title: 'Digital Pulse',
    category: 'Enterprise Application Development',
    domain: 'software',
    status: null,
    context: 'Internship · Bodyline (Pvt) Ltd — MAS Holdings',
    summary: 'A project submission and approval workflow solution.',
    tech: ['React', 'Node.js', 'Express', 'SQL Server', 'Azure SQL'],
    visual: 'workflow',
    cover: null,
    links: { github: '', demo: '' },
    caseStudy: {
      confidentiality:
        'Built for an internal business context. The visuals on this site are illustrative — no company data or proprietary information are shown.',
      overview:
        'A workflow application for submitting projects and moving them through an approval process, developed as part of my internship.',
      problem:
        'Project submissions need a clear path from submission to approval, with their status visible to everyone involved.',
      objectives: [
        'Provide a structured way to submit projects.',
        'Implement an approval workflow.',
        'Support project management activities in one application.',
      ],
      dataSources: [],
      methodology: [],
      implementation: [
        'Application feature development',
        'Workflow implementation',
        'Database integration with SQL Server / Azure SQL',
        'Project management functionality',
      ],
      results: [],
      challenges: [],
      screenshots: [],
    },
  },
  {
    slug: 'unilife',
    title: 'UniLife',
    category: 'Full-Stack Development',
    domain: 'software',
    status: null,
    context: 'Team project',
    summary:
      'A student productivity platform with assignment tracking, study planning, notes sharing and community features.',
    tech: ['Next.js', 'MongoDB', 'JavaScript'],
    visual: 'platform',
    cover: null,
    links: {
      github: 'https://github.com/Thulana666/unilife',
      demo: 'https://unilife-rouge.vercel.app',
    },
    caseStudy: {
      overview:
        'UniLife is a smart student productivity platform that brings assignment tracking, study planning, notes sharing and community features together in one place.',
      problem:
        'Students juggle assignments, study plans, notes and conversations across many different tools.',
      objectives: [
        'Track assignments and deadlines.',
        'Plan study sessions.',
        'Share notes between students.',
        'Support communication through community features.',
      ],
      role: 'Built as a team. My responsibilities were the login system and the chat feature.',
      dataSources: [],
      methodology: [],
      implementation: ['Login system', 'Chat'],
      implementationTitle: 'My contributions',
      results: [],
      challenges: [],
      screenshots: [],
    },
  },
  {
    slug: 'dhl-package-tracker',
    title: 'DHL Package Tracker',
    category: 'Business Process Automation',
    domain: 'automation',
    status: null,
    context: 'Internship · Bodyline (Pvt) Ltd — MAS Holdings',
    summary:
      'An inbound package tracking solution with automated notification and escalation workflows.',
    tech: ['Power Apps', 'Power Automate', 'SharePoint'],
    visual: 'automation',
    cover: null,
    links: { github: '', demo: '' },
    caseStudy: {
      confidentiality:
        'Built for an internal business context. The visuals on this site are illustrative — no company data or proprietary information are shown.',
      overview:
        'A low-code solution for tracking inbound packages, with automated notifications and escalation workflows.',
      problem:
        'Inbound packages need to be logged and followed up so recipients know when something has arrived and nothing is left waiting.',
      objectives: [
        'Track inbound packages in one place.',
        'Notify people automatically.',
        'Escalate items that need attention.',
      ],
      dataSources: [],
      methodology: [],
      implementation: [
        'Power Apps interface for package tracking',
        'SharePoint as the data store',
        'Power Automate flows for notifications and escalations',
      ],
      results: [],
      challenges: [],
      screenshots: [],
    },
  },
];

export const projectFilters = [
  { id: 'all', label: 'All work' },
  { id: 'data-ai', label: 'Data & AI' },
  { id: 'software', label: 'Software' },
  { id: 'automation', label: 'Automation' },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
