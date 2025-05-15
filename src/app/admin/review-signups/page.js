'use client';

import { useEffect, useState } from 'react';

export default function ReviewSignupsPage() {
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusRow, setStatusRow] = useState(null);

  const fetchSignups = async () => {
    try {
      const res = await fetch('/api/signups-overview');
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error('❌ Invalid API response:', data);
        setStatusMessage('⚠️ Error loading volunteer data.');
        setSignups([]);
        return;
      }

      setSignups(data);
    } catch (err) {
      console.error('❌ Network or parse error:', err);
      setStatusMessage('⚠️ Failed to load signups.');
      setSignups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignups();
  }, []);

  const handleAdd = async (vol, row) => {
    const res = await fetch('/api/add-to-directory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: vol.name, phone: vol.phone, email: vol.email }),
    });
    const result = await res.json();
    if (result.phoneUpdated) {
      setStatusMessage(`Phone updated in directory: ${vol.phone}`);
    } else {
      setStatusMessage(result.message);
    }
    setStatusRow(row);
    setTimeout(() => setStatusRow(null), 2000);
  };

  const handleConfirm = async (vol, row) => {
    const res = await fetch('/api/confirm-to-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: vol.name,
        phone: vol.phone,
        eventName: vol.event,
        eventDate: vol.eventDate,
      }),
    });

    const result = await res.json();
    setStatusRow(row);
    setStatusMessage(result.message);
    setTimeout(() => setStatusRow(null), 2000);

    await fetchSignups(); // Refresh after confirming
  };

  const isInDirectory = (vol) => vol.isInDirectory;

  function getWeekdayAbbr(dateStr) {
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  if (loading) {
    return (
      <div style={loaderWrapper}>
        <div style={spinnerStyle} />
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
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
        <h2 style={titleStyle}>🧑‍🍳 Review Volunteer Signups</h2>
        {statusMessage && <p style={{ color: 'red', marginTop: 12 }}>{statusMessage}</p>}
      </div>

      {signups.map((vol, i) => (
        <div key={i} className="event-card" style={eventCardStyle}>
          <div style={{ marginBottom: 12 }}>
            <strong>{vol.name}</strong>
            <div style={{ fontSize: '0.9em', marginTop: 6 }}>{vol.email}</div>
            <div style={{ fontSize: '0.9em', marginTop: 2 }}>📞 {vol.phone}</div>
            <div style={{ fontSize: '0.9em', marginTop: 6 }}>
              🗓️ {getWeekdayAbbr(vol.eventDate)} – {vol.eventDate || vol.date}
            </div>
            {vol.rating && (
              <div style={{ fontSize: '0.9em', marginTop: 6 }}>⭐ Rating: {vol.rating}</div>
            )}
            {vol.lastEvent && (
              <div style={{ fontSize: '0.9em', marginTop: 6 }}>
                🕓 Last: {vol.lastEvent} ({vol.lastDate})
              </div>
            )}
            <div style={{ fontSize: '0.9em', marginTop: 6 }}>
              🧍‍♂️ Spots left: {vol.spotsLeft}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isInDirectory(vol) && !vol.needsDirectoryUpdate && (
              <button onClick={() => handleAdd(vol, i)} style={buttonStyle('green')}>
                ➕ Add to Directory
              </button>
            )}

            {isInDirectory(vol) && vol.needsDirectoryUpdate && (
              <button onClick={() => handleAdd(vol, i)} style={buttonStyle('orange')}>
                ✏️ Update in Directory
              </button>
            )}

            <button
              onClick={() => vol.spotsLeft > 0 && handleConfirm(vol, i)}
              disabled={vol.spotsLeft === 0}
              style={buttonStyle(vol.spotsLeft > 0 ? 'blue' : 'gray')}
            >
              ✅ Confirm to Event
            </button>
          </div>

          {statusRow === i && (
            <div style={inlineToastStyle}>{statusMessage}</div>
          )}
        </div>
      ))}

      <style jsx global>{`
        body {
          background-color: #f4f4f4;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #000;
        }

        .event-card {
          background-color: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #121212;
            color: #fff;
          }

          .event-card {
            background-color: #1e1e1e;
            border-color: #333;
            color: #fff;
          }
        }
      `}</style>
    </div>
  );
}

const pageWrapper = {
  maxWidth: 720,
  margin: '0 auto',
  padding: 24,
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '1.6em',
  fontWeight: 600,
};

const eventCardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
  marginBottom: '24px',
};

const buttonStyle = (color) => ({
  backgroundColor:
    color === 'green' ? '#27ae60' :
    color === 'blue' ? '#2980b9' :
    color === 'orange' ? '#f39c12' :
    '#aaa',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '0.95em',
  border: 'none',
  cursor: color === 'gray' ? 'not-allowed' : 'pointer',
});

const inlineToastStyle = {
  marginTop: '12px',
  backgroundColor: '#ff0003',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '0.9em',
  textAlign: 'center',
};

const loaderWrapper = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f4f4f4',
};

const spinnerStyle = {
  width: '36px',
  height: '36px',
  border: '3px solid rgba(0, 0, 0, 0.1)',
  borderTop: '3px solid rgba(0, 0, 0, 0.7)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};