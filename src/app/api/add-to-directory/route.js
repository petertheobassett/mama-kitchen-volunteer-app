import { google } from 'googleapis';

export async function POST(req) {
  const { name, phone, email } = await req.json();

  if (!name || !phone || !email) {
    return Response.json({ error: 'Missing name, phone, or email' }, { status: 400 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Volunteer Directory',
  });

  const rows = res.data.values || [];
  const data = rows.slice(1); // Skip header
  const headerOffset = 2;

  const normalizedName = name.trim().toLowerCase();
  const matchedRowIndex = data.findIndex(row => row[0]?.trim().toLowerCase() === normalizedName);
  const rowNumber = matchedRowIndex + headerOffset;

  if (matchedRowIndex !== -1) {
    const row = data[matchedRowIndex];
    const currentPhone = row[1]?.trim() || '';
    const currentEmail = row[2]?.trim() || '';

    let phoneUpdated = false;
    let emailUpdated = false;

    if (currentPhone !== phone.trim()) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Volunteer Directory!B${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[phone.trim()]] },
      });
      phoneUpdated = true;
    }

    if (!currentEmail || currentEmail !== email.trim()) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Volunteer Directory!C${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[email.trim()]] },
      });
      emailUpdated = true;
    }

    return Response.json({
      message: phoneUpdated || emailUpdated
        ? 'Directory updated'
        : 'Already in directory',
      duplicate: true,
      phoneUpdated,
      emailUpdated,
    });
  }

  // Append new row
  const newRow = [name.trim(), phone.trim(), email.trim(), '', '', ''];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Volunteer Directory',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [newRow],
    },
  });

  return Response.json({
    message: 'Added to directory',
    duplicate: false,
    phoneUpdated: false,
    emailUpdated: false,
  });
}