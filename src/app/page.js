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
  const futureEvents = [];
  const pastEvents = [];

  events.forEach((row, rowIndex) => {
    const [dateStr] = row;

    let eventDate;

    if (typeof dateStr === 'number') {
      // Google Sheets sometimes sends dates as serial numbers
      const serialOffset = Date.UTC(1899, 11, 30); // Excel base date
      eventDate = new Date(serialOffset + dateStr * 86400000);
    } else if (typeof dateStr === 'string') {
      eventDate = new Date(dateStr);
      if (isNaN(eventDate)) {
        const parts = dateStr.split(/[\/\-]/);
        if (parts.length === 3) {
          const [month, day, year] = parts;
          eventDate = new Date(`${year}-${month}-${day}`);
        }
      }
    } else if (dateStr instanceof Date) {
      eventDate = dateStr;
    }

    console.log('📅 Parsed:', dateStr, '→', eventDate?.toString());

    if (!eventDate || isNaN(eventDate)) {
      console.warn('⚠️ Invalid date format:', dateStr);
      return;
    }

    const isFuture = eventDate >= new Date(new Date().setHours(0, 0, 0, 0));
    (isFuture ? futureEvents : pastEvents).push({ row, rowIndex });
  });

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', background: '#f2f2f2' }}>
      <h2 style={{ textAlign: 'center', padding: '12px 0' }}>MCMA Kitchen Volunteers</h2>

      <h3 style={{ padding: '8px 0' }}>🔵 Upcoming Events</h3>
      {futureEvents.map(({ row, rowIndex }) => renderEvent(row, rowIndex, toggleAttendance))}

      <h3 style={{ padding: '16px 0 8px' }}>⚫ Past Events</h3>
      {pastEvents.map(({ row, rowIndex }) => renderEvent(row, rowIndex, toggleAttendance))}
    </div>
  );
}

function renderEvent(row, rowIndex, toggleAttendance) {
  const [date, eventName, expected, lead, leadPhone,
    vol1, phone1, vol2, phone2, vol3, phone3, vol4, phone4, vol5, phone5,
    att1, att2, att3, att4, att5] = row;

  if (!eventName) return null;

  return (
    <div key={rowIndex} style={{ background: 'white', padding: '16px', marginBottom: '24px', borderRadius: '10px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {eventName} ({date})
      </div>
      <div style={{ marginBottom: '8px', color: '#777' }}>Expected attendees: {expected}</div>

      {[
        [vol1, phone1, att1],
        [vol2, phone2, att2],
        [vol3, phone3, att3],
        [vol4, phone4, att4],
        [vol5, phone5, att5]
      ].map(([vol, phone, att], i) => (
        vol ? (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <label>
              <input
                type="checkbox"
                defaultChecked={att === 'TRUE' || att === '👍'}
                onChange={e => toggleAttendance(rowIndex + 2, i + 1, e.target.checked)}
              /> {vol}
            </label>
            {phone ? (
              <a href={`tel:${phone}`} style={buttonStyle}>{phone}</a>
            ) : null}
          </div>
        ) : null
      ))}
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