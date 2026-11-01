// Shared by the contact form (client) and /api/contact (server).

export const contactLimits = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 4000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values) {
  const errors = {};
  const name = (values.name ?? '').trim();
  const email = (values.email ?? '').trim();
  const subject = (values.subject ?? '').trim();
  const message = (values.message ?? '').trim();

  if (name.length < contactLimits.name.min) errors.name = 'Please enter your name.';
  else if (name.length > contactLimits.name.max) errors.name = `Please keep your name under ${contactLimits.name.max} characters.`;

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';

  if (subject.length < contactLimits.subject.min) errors.subject = 'Please add a short subject.';
  else if (subject.length > contactLimits.subject.max) errors.subject = `Please keep the subject under ${contactLimits.subject.max} characters.`;

  if (message.length < contactLimits.message.min) errors.message = `Please write at least ${contactLimits.message.min} characters.`;
  else if (message.length > contactLimits.message.max) errors.message = `Please keep your message under ${contactLimits.message.max} characters.`;

  return { errors, values: { name, email, subject, message } };
}
