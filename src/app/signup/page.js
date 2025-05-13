'use client';

export const metadata = {
  title: 'Volunteer Signup – MCMA Kitchen',
  description: 'Sign up to help prepare and serve meals with MCMA Kitchen.',
};

import { useEffect, useState } from 'react';

export default function SignupPage() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    fetch('/api/get-signup-events')
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        const future = data.filter(event => new Date(event.date) >= today);
        setEvents(future);
      })
      .catch(() => setEvents([]));

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function formatPhone(input) {
    const digits = input.replace(/\D/g, '').slice(0, 10);
    if (digits.length !== 10) return '';
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    const formattedPhone = formatPhone(phone);
    if (!formattedPhone) {
      setStatus('❌ Invalid phone number. Please enter 10 digits.');
      return;
    }

    setStatus('Submitting...');

    if (!window.grecaptcha) {
      setStatus('❌ CAPTCHA failed to load. Please try again.');
      return;
    }

    try {
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' });

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          eventDate,
          name,
          phone: formattedPhone,
          email,
          token,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('✅ Signed up successfully!');
        setSubmittedData(result.submitted);
        setEventName('');
        setEventDate('');
        setName('');
        setPhone('');
        setEmail('');
      } else {
        setStatus(`❌ ${result.error}`);
      }
    } catch (err) {
      setStatus('❌ Something went wrong. Please try again.');
    }
  }

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img
          src="https://mcma.s3.us-east-1.amazonaws.com/mcmaLogo.png"
          alt="MCMA Kitchen Logo"
          style={{ maxWidth: 120, marginBottom: 12 }}
        />
        <h2 style={titleStyle}>Kitchen Volunteer Signup</h2>
      </div>

      {submittedData ? (
        <>
          <div className="confirmation-box" style={confirmationBox}>
            <h3 style={{ marginBottom: 12 }}>✅ You're signed up!</h3>
            <p><strong>Event:</strong> {submittedData.eventName}</p>
            <p><strong>Date:</strong> {submittedData.formattedEventDate}</p>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Phone:</strong> {submittedData.formattedPhone}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p style={{ marginTop: 20 }}>You’ll receive an email confirmation shortly.</p>
          </div>
          <p style={disclaimerStyle}>
            We respect your privacy. Your information is used only for coordinating volunteers. It will never be sold or shared.
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label htmlFor="event" style={labelStyle}>Event</label>
              <select
                id="event"
                name="event"
                required
                value={eventDate && eventName ? `${eventDate}---${eventName}` : ''}
                onChange={e => {
                  const [selectedDate, ...nameParts] = e.target.value.split('---');
                  const selectedName = nameParts.join('---');
                  setEventDate(selectedDate);
                  setEventName(selectedName);
                }}
                style={inputStyle}
              >
                <option value="">-- Select an event --</option>
                {events.map(({ label, name, date }) => (
                  <option key={label} value={`${date}---${name}`}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label htmlFor="name" style={labelStyle}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label htmlFor="phone" style={labelStyle}>Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onBlur={e => {
                  const formatted = formatPhone(e.target.value);
                  if (formatted) setPhone(formatted);
                  else setStatus('❌ Invalid phone number (must be 10 digits)');
                }}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <button type="submit" style={buttonStyle}>Submit</button>
            {status && <p style={{ marginTop: 20, fontSize: '0.95em' }}>{status}</p>}
          </form>
          <p style={disclaimerStyle}>
            We respect your privacy. Your information is used only for coordinating volunteers. It will never be sold or shared.
          </p>
        </>
      )}

      <style jsx global>{`
        body {
          background-color: #ffffff;
          color: #000000;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #121212;
            color: #ffffff;
          }

          form {
            background: #1e1e1e !important;
            border-color: #333 !important;
          }

          input, select {
            background-color: #2a2a2a !important;
            color: #ffffff !important;
            border-color: #444 !important;
          }

          label {
            color: #ccc !important;
          }

          button {
            background-color: #e0e0e0 !important;
            color: #000 !important;
          }

          .confirmation-box {
            background: #1f1f1f !important;
            border-color: #333 !important;
          }
        }
      `}</style>
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: 540,
  margin: '0 auto',
  padding: 32,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '1.8em',
  fontWeight: 600,
  marginBottom: 28,
};

const formStyle = {
  background: '#fff',
  padding: 32,
  borderRadius: 16,
  boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
  border: '1px solid #e5e5e5',
};

const fieldStyle = {
  marginBottom: 20,
};

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontSize: '0.95em',
  fontWeight: 500,
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '1em',
  border: '1px solid #ccc',
  borderRadius: 8,
  outline: 'none',
  transition: 'border 0.2s ease-in-out',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '12px 0',
  borderRadius: 10,
  fontSize: '1em',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
};

const confirmationBox = {
  background: '#f9f9f9',
  padding: 24,
  borderRadius: 12,
  border: '1px solid #ddd',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  fontSize: '1em',
  lineHeight: 1.6,
};

const disclaimerStyle = {
  fontSize: '0.85em',
  color: '#666',
  marginTop: 32,
  textAlign: 'center',
  lineHeight: 1.5,
};