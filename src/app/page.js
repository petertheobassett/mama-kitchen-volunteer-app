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
      const base = new Date(Date.UTC(1899, 11, 30));
      return new Date(base.getTime() + date * 86400000);
    } else if (typeof date === 'string') {
      const trimmed = date.trim();
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

  if (Array.isArray(events)) {
    events.forEach((row, rowIndex) => {
      const parsedDate = parseGoogleDate(row[0]);
      if (!parsedDate) return;

      const eventObj = { row, rowIndex, parsedDate };
      if (parsedDate >= today) {
        futureEvents.push(eventObj);
      } else {
        pastEvents.push(eventObj);
      }
    });

    futureEvents.sort((a, b) => a.parsedDate - b.parsedDate);
    pastEvents.sort((a, b) => b.parsedDate - a.parsedDate);
  }

  function renderEventGroup(eventsList, title, color) {
    return (
      <>
        <h3 style={{ color, marginTop: '40px', fontSize: '1.25em' }}>{title}</h3>
        {eventsList.map(({ row, rowIndex, parsedDate }) => {
          const formattedDate = parsedDate.toDateString();
          const [_, eventName, expected, lead, leadPhone,
            vol1, phone1, vol2, phone2, vol3, phone3, vol4, phone4, vol5, phone5,
            att1, att2, att3, att4, att5] = row;

          return (
            <div key={rowIndex} className="event-card" style={eventCardStyle}>
              <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '1.05em' }}>
                {eventName} <span style={{ fontWeight: 400 }}>({formattedDate})</span>
              </div>
              {expected && <div style={{ marginBottom: '12px', fontSize: '0.95em', color: 'inherit' }}>Expected attendees: {expected}</div>}

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
    <div style={pageWrapper}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <img
          src="https://mcma.s3.us-east-1.amazonaws.com/mcmaLogo.png"
          alt="MCMA Kitchen Logo"
          style={{ maxWidth: 120, marginBottom: 12 }}
        />
        <h2 style={titleStyle}>Volunteer Dashboard</h2>
      </div>

      {renderEventGroup(futureEvents, '🔵 Upcoming Events', 'navy')}
      {renderEventGroup(pastEvents, '⚫ Past Events', 'black')}

      <style jsx global>{`
        body {
          background-color: #f4f4f4;
          color: #000;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .event-card {
          background-color: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
          color: #000000;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #121212;
            color: #ffffff;
          }

          .event-card {
            background-color: #1e1e1e;
            border-color: #333;
            color: #ffffff;
          }

          a[href^="sms:"] {
            background-color: #2980b9 !important;
            color: white !important;
          }
        }
      `}</style>
    </div>
  );
}

// Shared styles
const pageWrapper = {
  maxWidth: 720,
  margin: '0 auto',
  padding: 32,
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '1.8em',
  fontWeight: 600,
};

const eventCardStyle = {
  padding: 24,
  borderRadius: 16,
  border: '1px solid',
  boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
  marginBottom: 32,
};

const buttonStyle = {
  marginLeft: 'auto',
  background: '#0079c2',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '0.9em',
  fontFamily: 'monospace',
  transition: 'background-color 0.2s ease',
};