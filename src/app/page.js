'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/get-events')
      .then(res => res.json())
      .then(data => {
        setEvents(data || []);
        console.log("Fetched events:", data);
      })
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  function formatDateString(dateString) {
    console.log("Input dateString:", dateString);
    if (!dateString || typeof dateString !== 'string' || !dateString.includes('-')) {
      console.log("Invalid date format");
      return new Date('').toDateString(); // Invalid date
    }
    const parts = dateString.split(', ')[1]?.split('-');
    if (!parts || parts.length !== 3) {
      console.log("Parts are invalid:", parts);
      return new Date('').toDateString(); // Invalid format
    }
    const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
    const day = parseInt(parts[1], 10);
    const year = 2000 + parseInt(parts[2], 10); // Assuming all years are in the 21st century
    const date = new Date(year, month, day);
    console.log("Parsed date:", date);
    return date.toDateString();
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
  console.log("Today's Date:", today.toDateString());
  const filteredEvents = events.filter(row => {
    const rawDate = row[0];
    const isValid = rawDate && typeof rawDate === 'string' && rawDate.includes('-');
    console.log("Filtering - Raw Date:", rawDate, "IsValid:", isValid);
    return isValid;
  });
  const pastEvents = filteredEvents.filter(row => {
    const rawDate = row[0];
    const parsedDate = formatDateString(rawDate);
    const isPast = rawDate && parsedDate < today;
    console.log("Past Filter - Raw Date:", rawDate, "Parsed Date:", parsedDate, "Is Past:", isPast);
    return isPast;
  });
  const futureEvents = filteredEvents.filter(row => {
    const rawDate = row[0];
    const parsedDate = formatDateString(rawDate);
    const isFuture = rawDate && parsedDate >= today;
    console.log("Future Filter - Raw Date:", rawDate, "Parsed Date:", parsedDate, "Is Future:", isFuture);
    return isFuture;
  });

  function renderEventGroup(events, title, color) {
    return (
      <>
        <h3 style={{ color, marginTop: '32px' }}>{title}</h3>
        {events.map((row, rowIndex) => {
          const rawDate = row[0];
          const formattedDate = formatDateString(rawDate);
          const eventName = row[1] || 'No Name';
          const expected = row[2] || '';
          const lead = row[3] || '';
          const leadPhone = row[4] || '';

          const vol1 = row[5];
          const phone1 = row[6];
          const vol2 = row[7];
          const phone2 = row[8];
          const vol3 = row[9];
          const phone3 = row[10];
          const vol4 = row[11];
          const phone4 = row[12];
          const vol5 = row[13];
          const phone5 = row[14];

          const att1 = row[15];
          const att2 = row[16];
          const att3 = row[17];
          const att4 = row[18];
          const att5 = row[19];

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

  console.log("All events:", events);
  console.log("Filtered events:", filteredEvents);
  console.log("Past events:", pastEvents);
  console.log("Future events:", futureEvents);

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