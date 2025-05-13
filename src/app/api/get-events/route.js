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

    return new Response(JSON.stringify(response.data.values), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Sheet fetch error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}