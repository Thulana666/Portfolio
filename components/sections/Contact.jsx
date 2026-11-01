import { ArrowDownToLine, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import Reveal from '@/components/ui/Reveal';
import ContactForm from './ContactForm';
import styles from './Contact.module.css';

export default function Contact({ site, cvHref, formEnabled, index }) {
  const channels = [
    site.email && {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <Mail size={19} />,
    },
    site.socials.linkedin && {
      label: 'LinkedIn',
      value: site.socials.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.socials.linkedin,
      icon: <LinkedInIcon size={18} />,
      external: true,
    },
    site.socials.github && {
      label: 'GitHub',
      value: site.socials.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.socials.github,
      icon: <GitHubIcon size={18} />,
      external: true,
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <div className={styles.meta}>
              <span className={styles.index}>{index}</span>
              <span className="eyebrow">Contact</span>
            </div>
            <h2 id="contact-title" className={styles.title}>
              Let&apos;s turn ideas into <span className="text-gradient">intelligent solutions.</span>
            </h2>
            <p className={styles.lead}>
              Whether it&apos;s a data or AI opportunity, a project collaboration or a question about my work — I&apos;d be glad to hear from you.
            </p>

            <ul className={styles.channels}>
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className={`glass ${styles.channel}`}
                    data-glow
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={styles.channelIcon} aria-hidden="true">
                      {channel.icon}
                    </span>
                    <span className={styles.channelText}>
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                    </span>
                    <ArrowUpRight size={18} className={styles.channelArrow} aria-hidden="true" />
                    {channel.external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.footerRow}>
              {cvHref ? (
                <a href={cvHref} download className="btn btn-glass">
                  <ArrowDownToLine size={18} aria-hidden="true" /> Download CV
                </a>
              ) : (
                site.email && (
                  <a href={`mailto:${site.email}?subject=${encodeURIComponent('CV request')}`} className="btn btn-glass">
                    <Mail size={18} aria-hidden="true" /> Request my CV
                  </a>
                )
              )}
              <span className={styles.location}>
                <MapPin size={16} aria-hidden="true" /> {site.location}
              </span>
            </div>
          </Reveal>

          <Reveal className={`glass ${styles.formCard}`} delay={0.1}>
            <div className={styles.formHead}>
              <h3 className={styles.formTitle}>Send a message</h3>
              <p className={styles.formSub}>
                {formEnabled ? 'I usually reply within a few days.' : (
                  <>
                    Prefer email? Write to{' '}
                    <a href={`mailto:${site.email}`} className={styles.inlineLink}>
                      {site.email}
                    </a>
                  </>
                )}
              </p>
            </div>
            <ContactForm formEnabled={formEnabled} email={site.email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
