'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const testData = [
      // June 15, 2025 (future event) → serial: 45546
      [45546, 'Ice Cream Social', 30, 'Mariah', '5552220000', 'Liam', '5550001111', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      // April 15, 2025 (past event) → serial: 45500
      [45500, 'BBQ Lunch', 50, 'Sally', '5551230000', 'Jane Doe', '5551112222', 'John Smith', '5553334444', '', '', '', '', '', '', '👍', '', '', '', '']
    ];
    setEvents(testData);
  }, []);

  function toggleAttendance(row, index, checked) {
    alert(`Would have saved: row ${row}, index ${index}, checked ${checked}`);
  }

  function getTodaySerial() {
    const now = new Date();
    const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return Math.floor((utcMidnight - Date.UTC(1899, 11, 30)) / 86400000);
  }

  const todaySerial = getTodaySerial();
  const futureEvents = [];
  const pastEvents = [];

  events.forEach((row, rowIndex) => {
    const [rawDate] = row;
    const serial = Number(rawDate);
    if (!serial || isNaN(serial)) return;

    const dateObj = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
    const displayDate = dateObj.toDateString();

    const target = serial >= todaySerial ? futureEvents : pastEvents;
    target.push({ row, rowIndex, displayDate });
  });

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', background: '#f2f2f2' }}>
      <h2 style={{ textAlign: 'center', padding: '12px 0' }}>MCMA Kitchen Volunteers</h2>

      <h3 style={{ padding: '8px 0' }}>🔵 Upcoming Events</h3>
      {futureEvents.map(e => renderEvent(e, toggleAttendance))}

      <h3 style={{ padding: '16px 0 8px' }}>⚫ Past Events</h3>
      {pastEvents.map(e => renderEvent(e, toggleAttendance))}
    </div>
  );
}

function renderEvent({ row, rowIndex, displayDate }, toggleAttendance) {
  const [_, eventName, expected, lead, leadPhone,
    vol1, phone1, vol2, phone2, vol3, phone3, vol4, phone4, vol5, phone5,
    att1, att2, att3, att4, att5] = row;

  if (!eventName) return null;

  return (
    <div key={rowIndex} style={{ background: 'white', padding: '16px', marginBottom: '24px', borderRadius: '10px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {eventName} ({displayDate})
      </div>
      <div style={{ marginBottom: '8px', color: '#777' }}>Expected attendees: {expected}</div>

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
              <a href={`tel:${phone}`} style={buttonStyle}>{phone}</a>
            )}
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
