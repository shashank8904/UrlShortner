import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('http://localhost:3000/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(`http://localhost:3000/${data.id}`);
        setUrl('');
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalytics = async () => {
    if (!shortUrl) return;

    const shortId = shortUrl.split('/').pop();

    try {
      const response = await fetch(`http://localhost:3000/url/analytics/${shortId}`);
      const data = await response.json();

      if (response.ok) {
        setAnalytics(data);
        setShowAnalytics(true);
      } else {
        setError(data.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError('Failed to fetch analytics');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  const handleGenerateQRCode = async () => {
    if (!shortUrl) return;

    const shortId = shortUrl.split('/').pop();

    try {
      const response = await fetch(`http://localhost:3000/url/qrcode/${shortId}`);
      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setShowQRCode(true);
      } else {
        setError(data.error || 'Failed to generate QR code');
      }
    } catch (err) {
      setError('Failed to generate QR code');
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="App">
      <div className="aurora" />
      <div className="container">
        <header className="nav">
          <div className="brand">
            <div className="brand-mark">⇲</div>
            <div>
              <div className="brand-name">Link Forge</div>
              <div className="brand-tag">Shorten • Track • Share</div>
            </div>
          </div>
          <div className="nav-actions">
            <span className="pill pill-soft">Realtime analytics</span>
            <span className="pill pill-soft">QR ready</span>
          </div>
        </header>

        <main className="layout">
          <section className="hero">
            <div className="pill pill-primary">Our work</div>
            <h1>
              We build fast short links with live analytics and QR delivery.
            </h1>
            <p className="hero-subtitle">
              We design, ship, and maintain clean redirects, click tracking, and QR codes
              so your campaigns stay measurable and easy to share.
            </p>
            <div className="hero-grid">
              <div className="stat-card">
                <div className="stat-label">Redirect speed</div>
                <div className="stat-value">45ms</div>
                <div className="stat-hint">Optimized delivery</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Links shipped</div>
                <div className="stat-value">12k</div>
                <div className="stat-hint">Tracked and monitored</div>
              </div>
              <div className="pill-row">
                <span className="pill pill-ghost">Link building</span>
                <span className="pill pill-ghost">Live analytics</span>
                <span className="pill pill-ghost">QR export</span>
              </div>
            </div>
          </section>

          <section className="form-wrapper">
            <div className="form-card">
              <div className="form-header">
                <div>
                  <p className="eyebrow">What we deliver</p>
                  <h2>Create and track your link</h2>
                  <p className="muted">
                    Paste a destination and we’ll return a clean link with analytics and QR,
                    the same workflow we use on client projects.
                  </p>
                </div>
                <span className="pill pill-primary subtle">Built by our team</span>
              </div>

              <form onSubmit={handleSubmit} className="form-body">
                <label className="input-label" htmlFor="url-input">
                  Destination URL
                </label>
                <div className="input-row">
                  <input
                    id="url-input"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-long-link.com/with/utm?source=launch"
                    required
                    className="input-field"
                  />
                  <button type="submit" disabled={loading} className="primary-btn">
                    {loading ? 'Shortening…' : 'Shorten'}
                  </button>
                </div>
              </form>

              {error && (
                <div className="toast error">
                  <span className="dot" />
                  <div>
                    <strong>Something went wrong</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {shortUrl && (
                <div className="result-panel">
                  <div className="result-header">
                    <span className="pill pill-success">Live link</span>
                    <span className="muted">Ready to embed in your work.</span>
                  </div>
                  <div className="result-input-row">
                    <input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="result-input"
                    />
                    <button onClick={copyToClipboard} className="ghost-btn">
                      Copy
                    </button>
                  </div>
                  <div className="action-grid">
                    <button onClick={handleGetAnalytics} className="secondary-btn">
                      View analytics
                    </button>
                    <button onClick={handleGenerateQRCode} className="secondary-btn">
                      Generate QR
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        {showQRCode && qrCode && (
          <div className="card-surface qr-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Instant share</p>
                <h2>QR code we generate</h2>
              </div>
              <span className="pill pill-soft">PNG export</span>
            </div>
            <div className="qr-body">
              <div className="qr-code-frame">
                <img src={qrCode} alt="QR Code" className="qr-code-image" />
              </div>
              <p className="muted">
                Scan from any device or drop it into your deck—this is how we package links
                for events and print.
              </p>
              <div className="action-grid">
                <button onClick={downloadQRCode} className="primary-btn">
                  Download QR
                </button>
                <button 
                  onClick={() => setShowQRCode(false)} 
                  className="ghost-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showAnalytics && analytics && (
          <div className="card-surface analytics-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Engagement</p>
                <h2>Analytics we track</h2>
              </div>
              <span className="pill pill-soft">Updates on refresh</span>
            </div>

            <div className="analytics-stats">
              <div className="stat-box">
                <div className="stat-number">{analytics.totalClicks}</div>
                <div className="stat-label">Total clicks</div>
              </div>
            </div>

            {analytics.analytics.length > 0 && (
              <div className="visit-history">
                <div className="history-heading">
                  <h3>Visit history</h3>
                  <span className="muted">Most recent first</span>
                </div>
                <div className="history-list">
                  {analytics.analytics.map((visit, index) => (
                    <div key={index} className="history-item">
                      <div className="history-meta">
                        <span className="visit-number">#{index + 1}</span>
                        <span className="visit-time">
                          {new Date(visit.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="visit-chip">Redirect</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => setShowAnalytics(false)} 
              className="ghost-btn wide"
            >
              Close analytics
            </button>
          </div>
        )}

        <footer className="footer">
          <p>Built for fast campaigns — React + Node.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
