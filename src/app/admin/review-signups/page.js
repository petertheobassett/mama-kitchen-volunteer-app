'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function ReviewSignupsPage() {
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusRow, setStatusRow] = useState(null);
  const [removedRows, setRemovedRows] = useState([]);
  const [fadingRows, setFadingRows] = useState([]);
  const [confirmedRows, setConfirmedRows] = useState([]);

  const fetchSignups = async () => {
    try {
      const res = await fetch('/api/signups-overview');
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error('❌ Invalid API response:', data);
        setStatusRow(null);
        return;
      }

      setSignups(data);
    } catch (err) {
      console.error('❌ Network or parse error:', err);
      setStatusRow(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignups();
  }, []);

  const handleConfirm = async (vol, row) => {
    const key = `${vol.name}-${vol.phone}`;
    setStatusRow(row);
    setStatusMessage('⏳ Updating contact info...');

    try {
      const dirRes = await fetch('/api/add-to-directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: vol.name, phone: vol.phone, email: vol.email }),
      });

      const dirResult = await dirRes.json();
      const dirMsg = dirResult.phoneUpdated
        ? `📇 Contact info updated`
        : dirResult.message || `📇 Already in directory`;

      setStatusMessage(`${dirMsg} – confirming...`);

      const confirmRes = await fetch('/api/confirm-to-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: vol.name,
          phone: vol.phone,
          eventName: vol.event,
          eventDate: vol.eventDate,
        }),
      });

      const confirmResult = await confirmRes.json();
      const confirmMsg = confirmResult.message || 'Confirmed';

      setStatusMessage(`✅ ${dirMsg} + ${confirmMsg}`);
      setConfirmedRows((prev) => [...prev, key]);

      setTimeout(() => {
        setFadingRows((prev) => [...prev, key]);
      }, 300);

      setTimeout(() => {
        setRemovedRows((prev) => [...prev, key]);
        setFadingRows((prev) => prev.filter((k) => k !== key));
        setStatusRow(null);
        fetchSignups(); // delayed refresh
      }, 700); // animation duration + buffer
    } catch (err) {
      console.error('❌ Confirmation error:', err);
      setStatusMessage('❌ Failed to confirm volunteer.');
      setStatusRow(null);
    }
  };

  function parseYMDToLocal(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function getWeekdayAbbr(dateStr) {
    const date = parseYMDToLocal(dateStr);
    return isNaN(date)
      ? ''
      : date.toLocaleDateString('en-US', {
          weekday: 'short',
          timeZone: 'America/Los_Angeles',
        });
  }

  if (loading) {
    return (
      <div style={loaderWrapper}>
        <div style={spinnerStyle} />
        <style jsx global>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Header autoCollapse={true} />
      <div style={pageWrapper}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src="https://mcma.s3.us-east-1.amazonaws.com/mcmaLogo.png"
            alt="MCMA Kitchen Logo"
            style={{ maxWidth: 120, marginBottom: 12 }}
          />
          <h2 style={titleStyle}>🧑‍🍳 Review Volunteer Signups</h2>
        </div>

        {signups
          .filter((vol) => !removedRows.includes(`${vol.name}-${vol.phone}`))
          .map((vol, i) => {
            const key = `${vol.name}-${vol.phone}`;
            const isFading = fadingRows.includes(key);
            const isConfirmed = confirmedRows.includes(key);

            return (
              <div
                key={key}
                className={`event-card ${isFading ? 'fade-out' : ''}`}
                style={{ ...eventCardStyle, position: 'relative' }}
              >
                {isConfirmed && <div style={checkmarkStyle}>✅</div>}

                <div style={{ marginBottom: 12 }}>
                  <strong>{vol.name}</strong>
                  <div style={{ fontSize: '0.9em', marginTop: 6 }}>{vol.email}</div>
                  <div style={{ fontSize: '0.9em', marginTop: 2 }}>📞 {vol.phone}</div>
                  <div style={{ fontSize: '0.9em', marginTop: 6 }}>
                    🗓️ {getWeekdayAbbr(vol.eventDate)} –{' '}
                    {parseYMDToLocal(vol.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'America/Los_Angeles',
                    })}{' '}
                    – {vol.event}
                  </div>
                  {vol.rating && (
                    <div style={{ fontSize: '0.9em', marginTop: 6 }}>⭐ Rating: {vol.rating}</div>
                  )}
                  {vol.lastEvent && (
                    <div style={{ fontSize: '0.9em', marginTop: 6 }}>
                      🕓 Last: {vol.lastEvent} (
                      {new Date(vol.lastDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        timeZone: 'America/Los_Angeles',
                      })}
                      )
                    </div>
                  )}
                  <div style={{ fontSize: '0.9em', marginTop: 6 }}>
                    🧍‍♂️ Spots left: {vol.spotsLeft}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {vol.spotsLeft === 0 ? (
                    <button disabled style={buttonStyle('gray')}>
                      ❌ Event Full
                    </button>
                  ) : vol.lastEvent === vol.event ? (
                    <button disabled style={buttonStyle('green')}>
                      ✅ Volunteer Confirmed
                    </button>
                  ) : (
                    <button onClick={() => handleConfirm(vol, i)} style={buttonStyle('blue')}>
                      ✅ Confirm to Event
                    </button>
                  )}
                </div>

                {statusRow === i && <div style={inlineToastStyle}>{statusMessage}</div>}
              </div>
            );
          })}

        <style jsx global>{`
          body {
            background-color: #f4f4f4;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
              sans-serif;
            color: #000;
          }

          .event-card {
            background-color: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
            margin-bottom: 24px;
            transition: all 300ms ease;
          }

          .fade-out {
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
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
    </>
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
    color === 'green'
      ? '#27ae60'
      : color === 'blue'
      ? '#2980b9'
      : color === 'orange'
      ? '#f39c12'
      : '#aaa',
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

const checkmarkStyle = {
  position: 'absolute',
  top: 10,
  right: 14,
  fontSize: '1.5em',
  opacity: 1,
  transition: 'opacity 0.3s ease',
};
