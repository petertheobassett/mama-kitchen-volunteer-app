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
    const range = '2025 Schedule of Events!A2:AH1000';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const rows = response.data.values || [];

    const serialToDate = (serial) => {
      const base = new Date(Date.UTC(1899, 11, 30));
      return new Date(base.getTime() + serial * 86400000);
    };

    const normalizedEvents = rows.map((row, i) => {
      const rawDate = row[0];
      if (!rawDate) return null;

      let parsed;
      if (!isNaN(rawDate)) {
        parsed = serialToDate(Number(rawDate));
      } else {
        parsed = new Date(rawDate.trim());
      }

      if (isNaN(parsed)) {
        console.warn(`❌ Skipping row ${i + 2} — invalid date:`, rawDate);
        return null;
      }

      return {
        raw: row,
        date: rawDate,
        parsedDate: parsed.toISOString(), // you can re-parse this as new Date(parsedDate) in frontend
      };
    }).filter(Boolean);

    console.log(`✅ Loaded ${normalizedEvents.length} events from sheet`);

    return new Response(JSON.stringify(normalizedEvents), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Sheet fetch error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}