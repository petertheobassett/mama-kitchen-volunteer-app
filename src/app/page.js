'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/get-events')
      .then(res => res.json())
      .then(data => setEvents(data || []))
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  function parseGoogleDate(date) {
    if (typeof date === 'number') {
      // Google Sheets serial number (days since 1899-12-30)
      const base = new Date(Date.UTC(1899, 11, 30));
      return new Date(base.getTime() + date * 86400000);
    } else if (typeof date === 'string') {
      const trimmed = date.trim();
      // Attempt to convert "Sat, 05-11-25" to Date
      const parts = trimmed.split(', ')[1]?.split('-');
      if (parts?.length === 3) {
        const month = parseInt(parts[0], 10) - 1;
        const day = parseInt(parts[1], 10);
        const year = 2000 + parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return null;
  }

  function toggleAttendance(row, index, checked) {
    fetch('/api/update-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        row,
        index,
        checked: checked ? '👍' : ''
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') alert('Attendance saved ✔');
        else alert('Error saving attendance');
      })
      .catch(() => alert('Network error'));
  }

  const today = new Date();
  const pastEvents = [];
  const futureEvents = [];

  events.forEach((row, rowIndex) => {
    const rawDate = row[0];
    const parsedDate = parseGoogleDate(rawDate);
    if (parsedDate) {
      const entry = { row, rowIndex, parsedDate };
      if (parsedDate < today) {
        pastEvents.push(entry);
      } else {
        futureEvents.push(entry);
      }
    }
  });

  function renderEventGroup(eventsList, title, color) {
    return (
      <>
        <h3 style={{ color, marginTop: '32px' }}>{title}</h3>
        {eventsList.map(({ row, rowIndex, parsedDate }) => {
          const formattedDate = parsedDate.toDateString();
          const [_, eventName, expected, lead, leadPhone,
            vol1, phone1, vol2, phone2, vol3, phone3, vol4, phone4, vol5, phone5,
            att1, att2, att3, att4, att5] = row;

          return (
            <div key={rowIndex} style={{ background: 'white', padding: '16px', marginBottom: '24px', borderRadius: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {eventName} ({formattedDate})
              </div>
              {expected && <div style={{ marginBottom: '8px', color: '#777' }}>Expected attendees: {expected}</div>}

              {[
                [vol1, phone1, att1],
                [vol2, phone2, att2],
                [vol3, phone3, att3],
                [vol4, phone4, att4],
                [vol5, phone5, att5],
              ].map(([vol, phone, att], i) => (
                vol ? (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <label>
                      <input
                        type="checkbox"
                        defaultChecked={att === '👍' || att === 'TRUE'}
                        onChange={e => toggleAttendance(rowIndex + 2, i + 1, e.target.checked)}
                      /> {vol}
                    </label>
                    {phone && (
                      <a href={`sms:${phone}`} style={buttonStyle}>{phone}</a>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', background: '#f2f2f2' }}>
      <h2 style={{ textAlign: 'center', padding: '12px 0' }}>MCMA Kitchen Volunteers</h2>
      {renderEventGroup(futureEvents, '🔵 Upcoming Events', 'navy')}
      {renderEventGroup(pastEvents, '⚫ Past Events', 'black')}
    </div>
  );
}

const buttonStyle = {
  marginLeft: 'auto',
  background: '#0079c2',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '0.9em',
  fontFamily: 'monospace',
};