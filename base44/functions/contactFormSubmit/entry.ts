import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = 'hello@bioshield.live';
const FROM_EMAIL = 'BioShield <noreply@bioshield.live>';

async function sendEmail(to, subject, text) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, text }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

const visitorReplyContent = {
  EN: {
    subject: 'Thank you for contacting BioShield',
    greeting: (name) => `Dear ${name || 'Visitor'},`,
    body: 'Thank you for contacting us! We have successfully received your message. Our team members will review your request and get back to you within 12 hours.',
    sign: 'Best regards,\nThe BioShield Team\nhello@bioshield.live',
  },
  RU: {
    subject: 'Благодарим за обращение в BioShield',
    greeting: (name) => `Уважаемый(ая) ${name || 'Посетитель'},`,
    body: 'Благодарим за то, что вы с нами связались! Ваше сообщение успешно получено. Наша команда рассмотрит ваш запрос и свяжется с вами в течение 12 часов.',
    sign: 'С уважением,\nКоманда BioShield\nhello@bioshield.live',
  },
  AZ: {
    subject: 'BioShield ilə əlaqə saxladığınız üçün təşəkkür edirik',
    greeting: (name) => `Hörmətli ${name || 'Ziyarətçi'},`,
    body: 'Bizimlə əlaqə saxladığınız üçün təşəkkür edirik! Müraciətiniz uğurla qəbul edildi. Komandamız sorğunuza baxıb 12 saat ərzində sizinlə əlaqə saxlayacaq.',
    sign: 'Hörmətlə,\nBioShield Komandası\nhello@bioshield.live',
  },
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, subject, message, lang } = await req.json();

    if (!email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const reply = visitorReplyContent[lang] || visitorReplyContent.EN;

    // Notify admin (always in English)
    await sendEmail(
      ADMIN_EMAIL,
      `Contact Form: ${subject || 'New Message'}`,
      `New contact form submission:\n\nName: ${name || 'N/A'}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\nLanguage: ${lang || 'en'}\n\nMessage:\n${message}`
    );

    // Auto-reply to visitor in their language
    await sendEmail(
      email,
      reply.subject,
      `${reply.greeting(name)}\n\n${reply.body}\n\n${reply.sign}`
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});