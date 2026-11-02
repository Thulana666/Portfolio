import { validateContact } from '@/lib/contact';
import { site } from '@/data/site';

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

function renderHtml({ name, email, subject, message }) {
  const body = escapeHtml(message).replace(/\n/g, '<br>');
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f3f5f8;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0b1018">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e1e6ee;border-radius:14px;overflow:hidden">
    <div style="padding:18px 24px;background:#080b10;color:#f5f7fa;font-weight:700;letter-spacing:.04em">
      ${escapeHtml(site.brand.toUpperCase())} <span style="color:#b9f36a">·</span> New message
    </div>
    <div style="padding:24px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b7482">Subject</p>
      <p style="margin:0 0 18px;font-size:18px;font-weight:600">${escapeHtml(subject)}</p>
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b7482">From</p>
      <p style="margin:0 0 18px">${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}" style="color:#4655d4">${escapeHtml(email)}</a>&gt;</p>
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b7482">Message</p>
      <p style="margin:0;line-height:1.6">${body}</p>
    </div>
    <div style="padding:14px 24px;border-top:1px solid #e1e6ee;font-size:12px;color:#6b7482">
      Sent from the contact form on your portfolio. Reply to this email to answer ${escapeHtml(name)} directly.
    </div>
  </div>
</body></html>`;
}

/**
 * Contact form delivery via Resend (https://resend.com): the message is
 * emailed to CONTACT_TO_EMAIL with the visitor as reply-to. Requires
 * RESEND_API_KEY and CONTACT_TO_EMAIL; without them the endpoint reports
 * that it isn't configured — it never pretends a message was sent.
 */
export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error('Contact form: RESEND_API_KEY and/or CONTACT_TO_EMAIL is not set.');
    return Response.json(
      { ok: false, code: 'not_configured', error: 'The contact form is not configured yet.' },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: 'bad_request', error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body?.company) {
    return Response.json({ ok: false, code: 'rejected', error: 'Message rejected.' }, { status: 400 });
  }

  const { errors, values } = validateContact(body ?? {});
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, code: 'invalid', errors }, { status: 422 });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || `${site.name} Portfolio <onboarding@resend.dev>`,
        to: [to],
        reply_to: values.email,
        subject: `[Portfolio] ${values.subject}`,
        text: `New message from your portfolio\n\nFrom: ${values.name} <${values.email}>\nSubject: ${values.subject}\n\n${values.message}`,
        html: renderHtml(values),
      }),
    });

    if (!response.ok) {
      // Log the provider's reason (e.g. invalid key, unverified recipient) for
      // Vercel's function logs; never the visitor's message.
      const detail = await response.text().catch(() => '');
      console.error('Contact form: Resend responded with', response.status, detail.slice(0, 300));
      return Response.json(
        { ok: false, code: 'provider_error', error: 'The message could not be delivered.' },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact form: delivery failed', error);
    return Response.json(
      { ok: false, code: 'provider_error', error: 'The message could not be delivered.' },
      { status: 502 },
    );
  }
}
