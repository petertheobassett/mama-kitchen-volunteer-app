import { google } from 'googleapis';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const [signupsRes, directoryRes, eventsRes] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Volunteer Signups' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: 'Volunteer Directory' }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: '2025 Schedule of Events' }),
    ]);

    const signups = signupsRes.data.values?.slice(1) || [];
    const directory = directoryRes.data.values?.slice(1) || [];
    const events = eventsRes.data.values || [];

    const eventRows = events.slice(1).filter(row => row[0]?.trim() && row[1]?.trim());
    const volunteerCols = [5, 7, 9, 11, 13, 15];

    const normalize = str =>
      (str || '').replace(/\s+/g, ' ').trim().toLowerCase();

    const toISODate = (val) => {
      const date = new Date(val);
      if (isNaN(date)) return '';
      return date.toISOString().slice(0, 10);
    };

    const getVolunteerHistory = (volunteerName) => {
      const normalized = normalize(volunteerName);
      for (const row of eventRows) {
        for (const col of volunteerCols) {
          const cell = row[col]?.trim().toLowerCase();
          if (cell === normalized) {
            return {
              lastEvent: row[1],
              lastDate: toISODate(row[0]),
            };
          }
        }
      }
      return null;
    };

    const getSpotsLeft = (eventName, eventDate) => {
      const normalizedName = normalize(eventName);
      const normalizedDate = toISODate(eventDate);
      const match = eventRows.find(row => {
        const rowName = normalize(row[1]);
        const rowDate = toISODate(row[0]);
        return rowName === normalizedName && rowDate === normalizedDate;
      });
      if (!match) return 0;

      let filled = 0;
      for (const col of volunteerCols) {
        if (match[col]?.trim()) filled++;
      }

      return 6 - filled;
    };

    const enriched = signups.map(([timestamp, eventName, eventDate, name, phone, email]) => {
      const normalizedName = normalize(name);
      const directoryRow = directory.find(row =>
        normalize(row[0]) === normalizedName
      );

      const currentPhone = directoryRow?.[1]?.trim() || '';
      const currentEmail = directoryRow?.[2]?.trim() || '';
      const rating = directoryRow?.[4] ?? '';
      const isInDirectory = !!directoryRow;

      const needsDirectoryUpdate =
        isInDirectory &&
        (currentPhone !== phone.trim() || currentEmail !== email.trim());

      const history = getVolunteerHistory(name);
      const spotsLeft = getSpotsLeft(eventName, eventDate);

      return {
        name,
        phone,
        email,
        event: eventName,
        date: timestamp,
        eventDate: toISODate(eventDate),
        rating,
        isInDirectory,
        needsDirectoryUpdate,
        lastEvent: history?.lastEvent || '',
        lastDate: history?.lastDate || '',
        spotsLeft,
      };
    });

    return Response.json(enriched);

  } catch (err) {
    console.error('❌ signups-overview error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}