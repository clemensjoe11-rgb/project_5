import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contactFormSchema } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const validated = contactFormSchema.parse(data);

    // Replace this block with a real email provider if needed.
    // e.g. Resend, SendGrid, or an SMTP relay.
    console.log('Contact form submission:', {
      name: validated.name,
      email: validated.email,
      phone: validated.phone || 'Not provided',
      service: validated.service,
      message: validated.message,
      note: 'Email would be sent to a.d@traduran.lu in production'
    });

    return res.status(200).json({ success: true, message: 'Submitted. In production an email would be sent.' });
  } catch (err: any) {
    const msg = err?.message || 'Invalid form data';
    return res.status(400).json({ success: false, error: msg });
  }
}
