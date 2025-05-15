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
    console.log('📄 Raw sheet rows:', rows);

    const serialToDate = (val) => {
      const msPerDay = 24 * 60 * 60 * 1000;
      const baseDate = new Date(Date.UTC(1899, 11, 30));
      return new Date(baseDate.getTime() + val * msPerDay);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize

    const events = rows.map(([rawDate, name]) => {
      if (!rawDate || !name) {
        console.warn('⚠️ Skipping row with missing data:', rawDate, name);
        return null;
      }

      let parsed;
      if (!isNaN(rawDate)) {
        // Serial number format
        parsed = serialToDate(Number(rawDate));
      } else {
        // ISO string format
        parsed = new Date(rawDate.trim());
      }

      if (isNaN(parsed)) {
        console.warn('⚠️ Invalid date format:', rawDate);
        return null;
      }

      // Normalize for comparison
      const parsedCopy = new Date(parsed);
      parsedCopy.setHours(0, 0, 0, 0);

      if (parsedCopy < today) {
        return null; // Exclude past events
      }

      return {
        name: name.trim(),
        date: parsed.toISOString().slice(0, 10), // "yyyy-mm-dd"
        label: `${parsed.toDateString()} – ${name.trim()}`,
      };
    }).filter(Boolean);

    console.log('✅ Parsed future events:', events);

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}