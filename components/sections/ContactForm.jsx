'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import { contactLimits, validateContact } from '@/lib/contact';
import styles from './ContactForm.module.css';

const initial = { name: '', email: '', subject: '', message: '' };
const fieldOrder = ['name', 'email', 'subject', 'message'];

/**
 * Sends messages through /api/contact, which emails them to the site owner.
 * Success is only shown when the server confirms delivery.
 */
export default function ContactForm({ email }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const formRef = useRef(null);

  // Links with data-contact-subject (e.g. "Request CV") pre-fill the subject
  // and put the cursor in the message box, instead of opening an email app.
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('[data-contact-subject]') : null;
      if (!link) return;
      const subject = link.getAttribute('data-contact-subject');
      setValues((current) => (current.subject ? current : { ...current, subject }));
      setTimeout(() => formRef.current?.querySelector('[name="message"]')?.focus({ preventScroll: true }), 500);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const loading = status.state === 'loading';
  const failureMessage = email
    ? `Sorry, your message couldn't be sent right now. Please try again in a moment, or email me at ${email}.`
    : "Sorry, your message couldn't be sent right now. Please try again in a moment.";

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next).errors);
    if (status.state === 'error') setStatus({ state: 'idle', message: '' });
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContact(values).errors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { errors: found, values: clean } = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });

    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ state: 'loading', message: '' });
    try {
      const honeypot = formRef.current?.elements.namedItem('company')?.value ?? '';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...clean, company: honeypot }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setValues(initial);
        setTouched({});
        setStatus({
          state: 'success',
          message: `Thank you, ${clean.name.split(' ')[0]}. Your message has been sent and I'll reply to ${clean.email}.`,
        });
        return;
      }
      if (data.code === 'invalid' && data.errors) {
        setErrors(data.errors);
        setStatus({ state: 'error', message: 'Please check the highlighted fields.' });
        return;
      }
      setStatus({ state: 'error', message: failureMessage });
    } catch {
      setStatus({ state: 'error', message: failureMessage });
    }
  };

  const fieldProps = (field) => {
    const invalid = Boolean(touched[field] && errors[field]);
    return {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      onChange: update(field),
      onBlur: blur(field),
      'aria-invalid': invalid || undefined,
      'aria-describedby': invalid ? `contact-${field}-error` : undefined,
      disabled: loading,
    };
  };

  const errorFor = (field) =>
    touched[field] && errors[field] ? (
      <p id={`contact-${field}-error`} className={styles.error}>
        <AlertCircle size={14} aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      id="contact-form"
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="contact-form-note"
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input type="text" autoComplete="name" placeholder="Your name" maxLength={contactLimits.name.max} {...fieldProps('name')} />
          {errorFor('name')}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...fieldProps('email')} />
          {errorFor('email')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-subject">Subject</label>
        <input type="text" placeholder="What would you like to discuss?" maxLength={contactLimits.subject.max} {...fieldProps('subject')} />
        {errorFor('subject')}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-message">Message</label>
          <span className={styles.counter} aria-hidden="true">
            {values.message.length}/{contactLimits.message.max}
          </span>
        </div>
        <textarea rows={6} placeholder="Tell me a little about your idea, role or question…" maxLength={contactLimits.message.max} {...fieldProps('message')} />
        {errorFor('message')}
      </div>

      {/* Honeypot for bots */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.actions}>
        <Magnetic strength={0.2} className={styles.submitWrap}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className={styles.spin} aria-hidden="true" /> Sending…
              </>
            ) : (
              <>
                Send message <Send size={17} data-arrow="diag" aria-hidden="true" />
              </>
            )}
          </button>
        </Magnetic>
        <p id="contact-form-note" className={styles.note}>
          Your details are only used to reply to you.
        </p>
      </div>

      <div aria-live="polite" role="status" className={styles.live}>
        <AnimatePresence>
          {status.message && (
            <motion.p
              key={status.state + status.message}
              className={styles.status}
              data-state={status.state}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {status.state === 'success' ? (
                <CheckCircle2 size={18} aria-hidden="true" />
              ) : (
                <AlertCircle size={18} aria-hidden="true" />
              )}
              {status.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
