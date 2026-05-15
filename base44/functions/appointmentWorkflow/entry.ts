import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = 'hello@bioshield.live';
const FROM_EMAIL = 'BioShield <noreply@bioshield.live>';
const SITE_URL = 'https://bioshield.live';
const WEBHOOK_BASE = 'https://bioshield.live/api/functions/appointmentWorkflow';

async function sendEmail(to, subject, html, attachments = []) {
  const body = { from: FROM_EMAIL, to, subject, html };
  if (attachments.length > 0) body.attachments = attachments;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

function parseDateTime(dateStr, timeStr) {
  const start = new Date(dateStr || Date.now());
  const parts = String(timeStr || '09:00 AM').split(/[: ]/);
  const rawHour = parts[0], rawMinute = parts[1];
  const isPm = String(timeStr || '').toLowerCase().includes('pm');
  let hour = Number(rawHour || 9);
  if (isPm && hour < 12) hour += 12;
  if (!isPm && hour === 12) hour = 0;
  start.setHours(hour, Number(rawMinute || 0), 0, 0);
  return start;
}

function generateICS(start, end, summary, description, attendeeEmail) {
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace('.000', '');
  const uid = `bioshield-${Date.now()}@bioshield.live`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BioShield//Meeting//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `ORGANIZER;CN=BioShield:mailto:hello@bioshield.live`,
    attendeeEmail ? `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${attendeeEmail}:mailto:${attendeeEmail}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
  return lines;
}

function actionButton(href, label, color = '#a66432') {
  return `<a href="${href}" style="display:inline-block;margin:6px 8px 6px 0;padding:12px 22px;background:${color};color:#ffffff;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;">${label}</a>`;
}

function adminEmailHtml({ clientName, clientEmail, date, time, duration, acceptUrl, rescheduleUrl, declineUrl }) {
  const dateLabel = date ? new Date(date).toDateString() : 'N/A';
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b1a0d;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1a0d;"><tr><td align="center" style="padding:40px 20px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111c13;border:1px solid #a66432;border-radius:12px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#a66432,#c87a3c);padding:24px 32px;">
    <p style="margin:0;color:#fff;font-size:11px;letter-spacing:4px;font-weight:bold;">BIO-SHIELD · MEETING REQUEST</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="color:#e8f5e9;font-size:15px;margin:0 0 24px;">A new consultation has been requested.</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;background:#0d1f10;border:1px solid rgba(166,100,50,0.25);border-radius:8px;margin-bottom:28px;">
      <tr><td style="padding:18px 20px;">
        <p style="margin:0 0 8px;color:#8a9e8c;font-size:10px;letter-spacing:3px;">CLIENT</p>
        <p style="margin:0;color:#e8f5e9;font-size:15px;font-weight:bold;">${clientName || 'N/A'}</p>
        <p style="margin:4px 0 0;color:#a0b8a2;font-size:13px;">${clientEmail || 'N/A'}</p>
      </td></tr>
      <tr><td style="padding:0 20px 18px;">
        <p style="margin:0 0 8px;color:#8a9e8c;font-size:10px;letter-spacing:3px;">DATE &amp; TIME</p>
        <p style="margin:0;color:#e8f5e9;font-size:15px;font-weight:bold;">${dateLabel} · ${time || 'N/A'}</p>
        <p style="margin:4px 0 0;color:#a0b8a2;font-size:13px;">Duration: ${duration || '30 min'}</p>
      </td></tr>
    </table>
    <p style="color:#8a9e8c;font-size:10px;letter-spacing:3px;margin:0 0 12px;">YOUR RESPONSE</p>
    <div>
      ${actionButton(acceptUrl, '✔ ACCEPT', '#2e7d32')}
      ${actionButton(rescheduleUrl, '⟳ RESCHEDULE', '#a66432')}
      ${actionButton(declineUrl, '✘ DECLINE', '#b71c1c')}
    </div>
    <p style="color:#4a634c;font-size:11px;margin:24px 0 0;">Clicking a button will process your decision automatically and notify the client.</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function confirmEmailHtml({ clientName, date, time, duration, lang }) {
  const dateLabel = date ? new Date(date).toDateString() : 'N/A';
  const cc = confirmContent[lang] || confirmContent.EN;
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b1a0d;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1a0d;"><tr><td align="center" style="padding:40px 20px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111c13;border:1px solid #a66432;border-radius:12px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#a66432,#c87a3c);padding:24px 32px;">
    <p style="margin:0;color:#fff;font-size:11px;letter-spacing:4px;font-weight:bold;">${cc.headerLabel}</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="color:#e8f5e9;font-size:22px;font-weight:bold;margin:0 0 8px;">${cc.title}</p>
    <p style="color:#a0b8a2;font-size:14px;margin:0 0 28px;">${cc.greeting(clientName)}</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;background:#0d1f10;border:1px solid rgba(166,100,50,0.25);border-radius:8px;margin-bottom:28px;">
      <tr><td style="padding:18px 20px;">
        <p style="margin:0 0 4px;color:#8a9e8c;font-size:10px;letter-spacing:3px;">${cc.dateLabel}</p>
        <p style="margin:0;color:#e8f5e9;font-size:15px;font-weight:bold;">${dateLabel}</p>
      </td></tr>
      <tr><td style="padding:0 20px 18px;">
        <p style="margin:0 0 4px;color:#8a9e8c;font-size:10px;letter-spacing:3px;">${cc.timeLabel}</p>
        <p style="margin:0;color:#e8f5e9;font-size:15px;font-weight:bold;">${time || 'N/A'} · ${duration || '30 min'}</p>
      </td></tr>
    </table>
    <p style="color:#a0b8a2;font-size:13px;margin:0 0 4px;">${cc.icsNote}</p>
    <p style="color:#a0b8a2;font-size:13px;margin:0;">${cc.contactNote} <a href="mailto:hello@bioshield.live" style="color:#c87a3c;">hello@bioshield.live</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function rescheduleEmailHtml({ clientName }) {
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b1a0d;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1a0d;"><tr><td align="center" style="padding:40px 20px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111c13;border:1px solid #a66432;border-radius:12px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#a66432,#c87a3c);padding:24px 32px;">
    <p style="margin:0;color:#fff;font-size:11px;letter-spacing:4px;font-weight:bold;">BIO-SHIELD · RESCHEDULE REQUEST</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="color:#e8f5e9;font-size:18px;font-weight:bold;margin:0 0 16px;">Dear ${clientName || 'Visitor'},</p>
    <p style="color:#a0b8a2;font-size:14px;line-height:1.6;margin:0 0 24px;">Please accept our apologies, but we are unable to make this particular time slot. Could you please select another time that works for you?</p>
    ${actionButton(`${SITE_URL}/#contact`, 'SELECT A NEW TIME →', '#a66432')}
    <p style="color:#4a634c;font-size:12px;margin:24px 0 0;">We apologise for any inconvenience and look forward to connecting with you soon.<br>— The BioShield Team</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function declineEmailHtml({ clientName }) {
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b1a0d;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1a0d;"><tr><td align="center" style="padding:40px 20px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111c13;border:1px solid #a66432;border-radius:12px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#7b1a1a,#b71c1c);padding:24px 32px;">
    <p style="margin:0;color:#fff;font-size:11px;letter-spacing:4px;font-weight:bold;">BIO-SHIELD · MEETING UPDATE</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="color:#e8f5e9;font-size:18px;font-weight:bold;margin:0 0 16px;">Dear ${clientName || 'Visitor'},</p>
    <p style="color:#a0b8a2;font-size:14px;line-height:1.6;margin:0 0 24px;">We apologise, but we are unable to accept the meeting request at this moment. Our team will contact you shortly via email to discuss alternative ways to connect.</p>
    <p style="color:#a0b8a2;font-size:13px;margin:0;">In the meantime, feel free to reach us at <a href="mailto:hello@bioshield.live" style="color:#c87a3c;">hello@bioshield.live</a> or via WhatsApp at <a href="https://wa.me/994502121233" style="color:#c87a3c;">+994 50 212 12 33</a>.</p>
    <p style="color:#4a634c;font-size:12px;margin:24px 0 0;">— The BioShield Team</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const requestReceivedContent = {
  EN: {
    subject: 'We received your meeting request — BioShield',
    headerLabel: 'BIO-SHIELD · REQUEST RECEIVED',
    greeting: (name) => `Dear ${name || 'Visitor'},`,
    body: (date, time) => `Thank you for reaching out! We have successfully received your meeting request for <strong style="color:#e8f5e9;">${date} at ${time}</strong>.`,
    followUp: 'Our team will review your request and respond within <strong style="color:#e8f5e9;">12 hours</strong>. You will receive a confirmation or alternative proposal shortly.',
    sign: '— The BioShield Team · hello@bioshield.live',
  },
  RU: {
    subject: 'Мы получили вашу заявку на встречу — BioShield',
    headerLabel: 'BIO-SHIELD · ЗАЯВКА ПОЛУЧЕНА',
    greeting: (name) => `Уважаемый(ая) ${name || 'Посетитель'},`,
    body: (date, time) => `Благодарим за обращение! Ваша заявка на встречу на <strong style="color:#e8f5e9;">${date} в ${time}</strong> успешно получена.`,
    followUp: 'Наша команда рассмотрит вашу заявку и ответит в течение <strong style="color:#e8f5e9;">12 часов</strong>. Вы получите подтверждение или альтернативное предложение.',
    sign: '— Команда BioShield · hello@bioshield.live',
  },
  AZ: {
    subject: 'Görüş müraciətiniz qəbul edildi — BioShield',
    headerLabel: 'BIO-SHIELD · MÜRACİƏT ALINDI',
    greeting: (name) => `Hörmətli ${name || 'Ziyarətçi'},`,
    body: (date, time) => `Bizimlə əlaqə saxladığınız üçün təşəkkür edirik! <strong style="color:#e8f5e9;">${date}, saat ${time}</strong> üçün görüş müraciətiniz uğurla qəbul edildi.`,
    followUp: 'Komandamız müraciətinizi nəzərdən keçirəcək və <strong style="color:#e8f5e9;">12 saat</strong> ərzində sizinlə əlaqə saxlayacaq.',
    sign: '— BioShield Komandası · hello@bioshield.live',
  },
};

const confirmContent = {
  EN: {
    subject: 'Your BioShield Meeting is Confirmed ✓',
    headerLabel: 'BIO-SHIELD · MEETING CONFIRMED',
    title: 'Your meeting is confirmed ✓',
    greeting: (name) => `Dear ${name || 'Visitor'}, we look forward to speaking with you.`,
    dateLabel: 'DATE',
    timeLabel: 'TIME & DURATION',
    icsNote: 'A calendar invite (.ics) is attached — add it directly to your calendar.',
    contactNote: 'If you have questions, contact us at',
  },
  RU: {
    subject: 'Ваша встреча с BioShield подтверждена ✓',
    headerLabel: 'BIO-SHIELD · ВСТРЕЧА ПОДТВЕРЖДЕНА',
    title: 'Ваша встреча подтверждена ✓',
    greeting: (name) => `Уважаемый(ая) ${name || 'Посетитель'}, мы с нетерпением ждём разговора с вами.`,
    dateLabel: 'ДАТА',
    timeLabel: 'ВРЕМЯ И ПРОДОЛЖИТЕЛЬНОСТЬ',
    icsNote: 'К письму прикреплено приглашение в календарь (.ics) — добавьте его в ваш календарь.',
    contactNote: 'Если у вас возникнут вопросы, свяжитесь с нами по адресу',
  },
  AZ: {
    subject: 'BioShield görüşünüz təsdiqləndi ✓',
    headerLabel: 'BIO-SHIELD · GÖRÜŞ TƏSDİQLƏNDİ',
    title: 'Görüşünüz təsdiqləndi ✓',
    greeting: (name) => `Hörmətli ${name || 'Ziyarətçi'}, sizinlə danışmağı səbirsizliklə gözləyirik.`,
    dateLabel: 'TARİX',
    timeLabel: 'SAAT VƏ MÜDDƏT',
    icsNote: 'Təqvim dəvətnaməsi (.ics) əlavə edilib — onu birbaşa təqviminizə əlavə edin.',
    contactNote: 'Suallarınız varsa, bizimlə əlaqə saxlayın:',
  },
};

async function createCalendarEvents(base44, start, end, clientName, clientEmail, duration) {
  const summary = 'BioShield Consultation';
  const description = `Confirmed consultation with the BioShield team.\nClient: ${clientName || clientEmail}\nDuration: ${duration || '30 min'}`;

  try {
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary, description,
        start: { dateTime: start.toISOString(), timeZone: 'Asia/Baku' },
        end: { dateTime: end.toISOString(), timeZone: 'Asia/Baku' },
        attendees: clientEmail ? [{ email: clientEmail }] : [],
      }),
    });
  } catch (_) {}

  try {
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('outlook');
    await fetch('https://graph.microsoft.com/v1.0/me/events', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: summary,
        body: { contentType: 'HTML', content: description },
        start: { dateTime: start.toISOString(), timeZone: 'Asia/Baku' },
        end: { dateTime: end.toISOString(), timeZone: 'Asia/Baku' },
        attendees: clientEmail ? [{ emailAddress: { address: clientEmail }, type: 'required' }] : [],
      }),
    });
  } catch (_) {}
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);

    const payload = req.method === 'GET'
      ? Object.fromEntries(url.searchParams.entries())
      : await req.json();

    const action = payload.action || 'request';
    const { clientName, clientEmail, date, time, duration, lang } = payload;

    if (action === 'request') {
      const params = new URLSearchParams({
        clientName: clientName || '',
        clientEmail: clientEmail || '',
        date: date || '',
        time: time || '',
        duration: duration || '30 min',
      }).toString();

      const acceptUrl = `${WEBHOOK_BASE}?action=accept&${params}`;
      const rescheduleUrl = `${WEBHOOK_BASE}?action=reschedule&${params}`;
      const declineUrl = `${WEBHOOK_BASE}?action=decline&${params}`;

      await sendEmail(
        ADMIN_EMAIL,
        `Meeting Request: ${clientName || clientEmail} — BioShield`,
        adminEmailHtml({ clientName, clientEmail, date, time, duration, acceptUrl, rescheduleUrl, declineUrl })
      );

      if (clientEmail) {
        const rc = requestReceivedContent[lang] || requestReceivedContent.EN;
        const dateLabel = date ? new Date(date).toDateString() : 'N/A';
        await sendEmail(
          clientEmail,
          rc.subject,
          `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b1a0d;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1a0d;"><tr><td align="center" style="padding:40px 20px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111c13;border:1px solid #a66432;border-radius:12px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#a66432,#c87a3c);padding:24px 32px;">
    <p style="margin:0;color:#fff;font-size:11px;letter-spacing:4px;font-weight:bold;">${rc.headerLabel}</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="color:#e8f5e9;font-size:18px;font-weight:bold;margin:0 0 16px;">${rc.greeting(clientName)}</p>
    <p style="color:#a0b8a2;font-size:14px;line-height:1.6;margin:0 0 16px;">${rc.body(dateLabel, time || 'N/A')}</p>
    <p style="color:#a0b8a2;font-size:14px;line-height:1.6;margin:0;">${rc.followUp}</p>
    <p style="color:#4a634c;font-size:12px;margin:28px 0 0;">${rc.sign}</p>
  </td></tr>
</table></td></tr></table></body></html>`
        );
      }

      return Response.json({ success: true });
    }

    if (action === 'accept') {
      const start = parseDateTime(date, time);
      const durationMins = parseInt(String(duration || '30')) || 30;
      const end = new Date(start.getTime() + durationMins * 60 * 1000);

      await createCalendarEvents(base44, start, end, clientName, clientEmail, duration);

      const icsContent = generateICS(start, end, 'BioShield Consultation', `Consultation with BioShield team. Duration: ${duration || '30 min'}`, clientEmail);
      const icsBase64 = btoa(unescape(encodeURIComponent(icsContent)));

      const cc = confirmContent[lang] || confirmContent.EN;

      // Send confirmation + .ics to visitor in their language
      await sendEmail(
        clientEmail || ADMIN_EMAIL,
        cc.subject,
        confirmEmailHtml({ clientName, date, time, duration, lang }),
        [{ filename: 'bioshield-meeting.ics', content: icsBase64, type: 'text/calendar' }]
      );

      // CC admin with .ics (always in English for Zoho Calendar injection)
      await sendEmail(
        ADMIN_EMAIL,
        `[Confirmed] Meeting with ${clientName || clientEmail} — ${date ? new Date(date).toDateString() : ''} ${time || ''}`,
        confirmEmailHtml({ clientName, date, time, duration, lang: 'EN' }),
        [{ filename: 'bioshield-meeting.ics', content: icsBase64, type: 'text/calendar' }]
      );

      return new Response(`
        <html><body style="font-family:Arial,sans-serif;background:#0b1a0d;color:#e8f5e9;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
          <div style="text-align:center;padding:40px;background:#111c13;border:1px solid #a66432;border-radius:12px;max-width:400px;">
            <div style="font-size:48px;margin-bottom:16px;">✓</div>
            <h2 style="margin:0 0 8px;color:#e8f5e9;">Meeting Accepted</h2>
            <p style="color:#a0b8a2;margin:0;">Confirmation sent to ${clientEmail}. Calendar events have been created.</p>
          </div>
        </body></html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    if (action === 'reschedule') {
      await sendEmail(
        clientEmail || ADMIN_EMAIL,
        'Meeting Reschedule Request — BioShield',
        rescheduleEmailHtml({ clientName })
      );
      return new Response(`
        <html><body style="font-family:Arial,sans-serif;background:#0b1a0d;color:#e8f5e9;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
          <div style="text-align:center;padding:40px;background:#111c13;border:1px solid #a66432;border-radius:12px;max-width:400px;">
            <div style="font-size:48px;margin-bottom:16px;">⟳</div>
            <h2 style="margin:0 0 8px;color:#e8f5e9;">Reschedule Email Sent</h2>
            <p style="color:#a0b8a2;margin:0;">The visitor has been asked to select a new time.</p>
          </div>
        </body></html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    if (action === 'decline') {
      await sendEmail(
        clientEmail || ADMIN_EMAIL,
        'BioShield Meeting Update',
        declineEmailHtml({ clientName })
      );
      return new Response(`
        <html><body style="font-family:Arial,sans-serif;background:#0b1a0d;color:#e8f5e9;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
          <div style="text-align:center;padding:40px;background:#111c13;border:1px solid #7b1a1a;border-radius:12px;max-width:400px;">
            <div style="font-size:48px;margin-bottom:16px;">✘</div>
            <h2 style="margin:0 0 8px;color:#e8f5e9;">Meeting Declined</h2>
            <p style="color:#a0b8a2;margin:0;">An apology email has been sent to the visitor.</p>
          </div>
        </body></html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});