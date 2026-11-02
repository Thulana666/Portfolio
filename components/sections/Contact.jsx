import { ArrowDownToLine, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import Magnetic from '@/components/ui/Magnetic';
import Reveal from '@/components/ui/Reveal';
import ContactForm from './ContactForm';
import styles from './Contact.module.css';

export default function Contact({ site, cvHref, formEnabled, index }) {
  const channels = [
    site.socials.linkedin && {
      label: 'LinkedIn',
      value: site.socials.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.socials.linkedin,
      icon: <LinkedInIcon size={18} />,
    },
    site.socials.github && {
      label: 'GitHub',
      value: site.socials.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.socials.github,
      icon: <GitHubIcon size={18} />,
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        {/* Closing statement: oversized headline with the email as the main CTA */}
        <Reveal className={styles.header}>
          <span className={`numeral ${styles.numeral}`} aria-hidden="true">
            {index}
          </span>
          <div className={styles.meta}>
            <span className="label">Contact</span>
            <span className={styles.rule} aria-hidden="true" />
          </div>
          <h2 id="contact-title" className={styles.title}>
            Let&apos;s turn ideas into <span className="text-gradient">intelligent solutions.</span>
          </h2>
          <div className={styles.headerFoot}>
            <p className={styles.lead}>
              Whether it&apos;s a data or AI opportunity, a project collaboration or a question about my work, I&apos;d be glad to hear from you.
            </p>
            {site.email && (
              <Magnetic strength={0.12} className={styles.emailWrap}>
                <a href={`mailto:${site.email}`} className={styles.bigEmail}>
                  <span className={styles.bigEmailText}>{site.email}</span>
                  <ArrowUpRight className={styles.bigEmailArrow} aria-hidden="true" />
                </a>
              </Magnetic>
            )}
          </div>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.side}>
            <ul className={styles.channels}>
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className={`glass ${styles.channel}`}
                    data-glow
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.channelIcon} aria-hidden="true">
                      {channel.icon}
                    </span>
                    <span className={styles.channelText}>
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                    </span>
                    <ArrowUpRight size={18} className={styles.channelArrow} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className={`surface ${styles.infoCard}`}>
              <span className={styles.infoKey}>Based in</span>
              <span className={styles.infoValue}>
                <MapPin size={16} aria-hidden="true" /> {site.location}
              </span>
              <span className={styles.infoKey}>Focus</span>
              <span className={styles.infoValue}>Data Analytics · AI · Software</span>
              <div className={styles.infoAction}>
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
              </div>
            </div>
          </Reveal>

          <Reveal className={`glass glass-thick ${styles.formCard}`} delay={0.1}>
            <div className={styles.formHead}>
              <h3 className={styles.formTitle}>Send a message</h3>
              <p className={styles.formSub}>
                {formEnabled ? 'I usually reply within a few days.' : 'Your message opens in your email app, ready to send.'}
              </p>
            </div>
            <ContactForm formEnabled={formEnabled} email={site.email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
