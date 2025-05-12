import { google } from 'googleapis';

export async function GET() {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: '2025 mcma events!A2:B100',
    });

    const rows = response.data.values || [];

    const events = rows.map(([rawDate, name]) => {
      // Attempt to parse custom-formatted date: "Wed, 06-11-25"
      const parts = rawDate?.trim().split(', ')[1]?.split('-');
      if (!parts || parts.length !== 3) return null;

      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = 2000 + parseInt(parts[2], 10);
      const date = new Date(year, month, day);

      return {
        name,
        date: date.toISOString(),
        label: `${rawDate} – ${name}`,
      };
    }).filter(Boolean);

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
