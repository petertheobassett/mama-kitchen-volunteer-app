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

  function formatDateString(dateString) {
    // Assuming the format is always "Day, MM-DD-YY"
    const parts = dateString.split(', ')[1].split('-');
    const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
    const day = parseInt(parts[1], 10);
    const year = 2000 + parseInt(parts[2], 10); // Assuming all years are in the 21st century
    return new Date(year, month, day);
  }

  function toggleAttendance(row, index, checked) {
    // ... (your toggleAttendance function remains the same) ...
  }

  const today = new Date();
  const filteredEvents = events.filter(row => {
    const rawDate = row[0];
    return rawDate && typeof rawDate === 'string' && rawDate.includes('-'); // Basic check
  });
  const pastEvents = filteredEvents.filter(row => formatDateString(row[0]) < today);
  const futureEvents = filteredEvents.filter(row => formatDateString(row[0]) >= today);

  function renderEventGroup(events, title, color) {
    return (
      <>
        <h3 style={{ color, marginTop: '32px' }}>{title}</h3>
        {events.map((row, rowIndex) => {
          const rawDate = row[0];
          const formattedDate = formatDateString(rawDate).toDateString();
          const eventName = row[1] || 'No Name';
          const expected = row[2] || '';
          const lead = row[3] || '';
          const leadPhone = row[4] || '';

          return (
            <div key={rowIndex} style={{ background: 'white', padding: '16px', marginBottom: '24px', borderRadius: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {eventName} ({formattedDate})
              </div>
              {expected && <div style={{ marginBottom: '8px', color: '#777' }}>Expected attendees: {expected}</div>}

              {[
                [row[5], row[6], row[7]],
                [row[8], row[9], row[10]],
                [row[11], row[12], row[13]],
                [row[14], row[15], row[16]],
                [row[17], row[18], row[19]],
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