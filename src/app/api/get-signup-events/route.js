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
      range: '2025 Schedule of Events!A2:Q1000',
    });

    const rows = response.data.values || [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const volunteerCols = [5, 7, 9, 11, 13, 15];

    const events = rows
      .map((row) => {
        const rawDate = row[0];
        const name = row[1];
        if (!rawDate || !name) return null;

        const [yyyy, m, d] = rawDate.split('-');
        const mm = m.padStart(2, '0');
        const dd = d.padStart(2, '0');
        const parsed = new Date(+yyyy, +mm - 1, +dd);

        if (isNaN(parsed)) return null;

        const parsedMidnight = new Date(parsed);
        parsedMidnight.setHours(0, 0, 0, 0);
        if (parsedMidnight < today) return null;

        const filledSpots = volunteerCols.reduce((count, col) => {
          const cell = row[col];
          return cell?.trim() ? count + 1 : count;
        }, 0);

        const spotsLeft = 6 - filledSpots;

        return {
          name: name.trim(),
          date: `${parsed.getFullYear()}-${mm}-${dd}`,
          label: `${parsed.toDateString()} – ${name.trim()}${spotsLeft === 0 ? ' (FULL)' : ''}`,
          spotsLeft,
        };
      })
      .filter(Boolean);

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Error fetching signup events:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
