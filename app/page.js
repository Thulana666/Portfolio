import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Expertise from '@/components/sections/Expertise';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import SkillsBento from '@/components/sections/SkillsBento';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import SectionHeader from '@/components/ui/SectionHeader';
import Ticker from '@/components/ui/Ticker';
import { about, site } from '@/data/site';
import { expertise } from '@/data/expertise';
import { experience } from '@/data/experience';
import { projectFilters, projects } from '@/data/projects';
import { skillGroups } from '@/data/skills';
import { education } from '@/data/education';
import { certifications } from '@/data/certifications';
import { publicAsset } from '@/lib/assets';

export default function HomePage() {
  const photo = publicAsset(site.photo);
  const cvHref = publicAsset(site.cv);
  const formEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  const hasCertifications = certifications.some((c) => c?.name);

  return (
    <>
      <Hero site={site} photo={photo} cvHref={cvHref} />
      <Ticker items={['Data Analytics', 'Artificial Intelligence', 'Machine Learning', ...about.focus]} />
      <About site={site} about={about} photo={photo} />
      <Expertise items={expertise} />
      <Experience items={experience} />

      <section id="projects" className="section" aria-labelledby="projects-title">
        <div className="container">
          <SectionHeader
            index="04"
            eyebrow="Featured projects"
            title="Selected work, data and AI first."
            intro="From an in-progress AI research framework to analytics dashboards and enterprise applications. Each project has a case study."
            id="projects-title"
          />
          <Projects projects={projects} filters={projectFilters} />
        </div>
      </section>

      <section id="skills" className="section" aria-labelledby="skills-title">
        <div className="container">
          <SectionHeader
            index="05"
            eyebrow="Technical skills"
            title="A toolkit organised by priority."
            intro="Sized by what I focus on most. No percentage bars, just the tools I use and what I use them for."
            id="skills-title"
          />
          <SkillsBento groups={skillGroups} />
        </div>
      </section>

      <Education items={education} />
      <Certifications items={certifications} />
      <Contact site={site} cvHref={cvHref} formEnabled={formEnabled} index={hasCertifications ? '08' : '07'} />
    </>
  );
}
