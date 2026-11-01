import { validateContact } from '@/lib/contact';

/**
 * Contact form delivery via Resend (https://resend.com).
 * Requires RESEND_API_KEY and CONTACT_TO_EMAIL. Without them the endpoint
 * reports that it isn't configured — it never pretends a message was sent.
 */
export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
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
        from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: values.email,
        subject: `[Portfolio] ${values.subject}`,
        text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
      }),
    });

    if (!response.ok) {
      console.error('Contact form: email provider responded with', response.status);
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
