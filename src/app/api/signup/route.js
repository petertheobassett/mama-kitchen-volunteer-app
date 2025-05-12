import { google } from 'googleapis';
import { Resend } from 'resend';

function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) throw new Error('Invalid phone number');
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function generateICS({ eventName, formattedEventDate, name, email }) {
  const now = new Date();
  const eventDate = new Date(formattedEventDate);
  eventDate.setHours(16, 30); // Default start time: 4:30 PM
  const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // +2 hours

  const format = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MCMA Kitchen//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${format(eventDate)}
DTEND:${format(endDate)}
DTSTAMP:${format(now)}
SUMMARY:MCMA Kitchen – ${eventName}
DESCRIPTION:Thanks for volunteering, ${name}!
ORGANIZER;CN=MCMA Kitchen:mailto:${process.env.ADMIN_EMAIL}
ATTENDEE;CN=${name};RSVP=TRUE:mailto:${email}
LOCATION:MCMA Kitchen
UID:${Date.now()}@mcmakitchen.org
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR
  `.trim();
}

function getGoogleCalendarURL({ eventName, eventDate, name }) {
  const start = new Date(eventDate);
  start.setHours(16, 30);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const format = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `MCMA Kitchen – ${eventName}`,
    dates: `${format(start)}/${format(end)}`,
    details: `Volunteer sign-up for ${eventName}. Thanks, ${name}!`,
    location: 'MCMA Kitchen',
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export async function POST(req) {
  try {
    const { eventName, eventDate, name, phone, email } = await req.json();

    if (!eventName || !eventDate || !name || !phone || !email) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const formattedPhone = formatPhone(phone);

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-US', {
      weekday: 'long',
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const formattedEventDate = new Date(eventDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });

    const newRow = [
      formattedTimestamp,
      eventName,
      formattedEventDate,
      name,
      formattedPhone,
      email,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Volunteer Signups!A:F',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [newRow],
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.EMAIL_FROM;
    const admin = process.env.ADMIN_EMAIL;
    const replyTo = process.env.ADMIN_EMAIL;

    const calendarICS = generateICS({ eventName, formattedEventDate, name, email });
    const googleCalendarLink = getGoogleCalendarURL({ eventName, eventDate, name });

    const htmlBody = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; background:#fff; padding:24px; border-radius:12px; border:1px solid #ddd; max-width:480px; margin:0 auto; font-size:16px; line-height:1.6;">
  <div style="text-align:center; margin-bottom:24px;">
    <img src="https://mcma.vercel.app/media/mcmaLogo.png" alt="MCMA Logo" style="max-width:140px; height:auto;" />
  </div>
  <h2 style="margin-bottom:12px;">Thank you for signing up!</h2>
  <p><strong>Event:</strong> ${eventName}</p>
  <p><strong>Date:</strong> ${formattedEventDate}</p>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Phone:</strong> ${formattedPhone}</p>
  <p><strong>Email:</strong> ${email}</p>
  <div style="margin-top:30px; text-align:center;">
    <a href="${googleCalendarLink}" target="_blank" style="text-decoration:none;">
      <button style="background:#4285F4; color:#fff; padding:10px 18px; font-size:15px; border:none; border-radius:6px; margin-right:12px; cursor:pointer;">
        Add to Google Calendar
      </button>
    </a>
    <a href="cid:calendar" download="mcma-volunteer.ics">
      <button style="background:#333; color:#fff; padding:10px 18px; font-size:15px; border:none; border-radius:6px; cursor:pointer;">
        Add to Apple Calendar
      </button>
    </a>
  </div>
</div>
`;

    const plainText = `
Thanks for signing up!

Event: ${eventName}
Date: ${formattedEventDate}
Name: ${name}
Phone: ${formattedPhone}
Email: ${email}
`;

    // ✅ Email to volunteer
    await resend.emails.send({
      from,
      to: email,
      subject: `MCMA Kitchen – Thanks for signing up to help at the ${eventName} ${formattedEventDate}`,
      html: htmlBody,
      text: plainText,
      reply_to: replyTo,
      attachments: [
        {
          filename: 'mcma-volunteer.ics',
          content: calendarICS,
          contentType: 'text/calendar',
          contentDisposition: 'inline',
          cid: 'calendar',
        },
      ],
    });

    // ✅ Email to admin
    await resend.emails.send({
      from,
      to: admin,
      subject: `New MCMA Volunteer Sign-Up: ${name} for ${eventName}`,
      html: htmlBody,
      text: plainText,
      reply_to: replyTo,
    });

    return new Response(JSON.stringify({
      status: 'OK',
      submitted: { eventName, formattedEventDate, name, formattedPhone, email }
    }), { status: 200 });

  } catch (err) {
    console.error('❌ Signup form error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}