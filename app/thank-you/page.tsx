"use client";

export default function ThankYou() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --blush-light: #F4F7FA;
          --blush-mid:   #E8F0F8;
          --orange:      #E8772E;
          --orange-dark: #d06a28;
          --accent:      #E8772E;
          --lavender:    #4A8BC2;
          --plum:        #2B5F8A;
          --white:       #ffffff;
          --text-dark:   #1e1e1e;
          --text-mid:    #4a3a3a;
          --text-soft:   #9a7a80;

          --grad-hero: linear-gradient(135deg, #E8772E 0%, #2B5F8A 55%, #1E4A6E 100%);
          --grad-card: linear-gradient(135deg, #E8F0F8 0%, #F4F7FA 100%);
          --grad-btn:  linear-gradient(135deg, #E8772E 0%, #d06a28 100%);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--blush-light);
          color: var(--text-dark);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .top-bar {
          background: var(--plum);
          text-align: center;
          padding: 9px 20px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.88);
          letter-spacing: 0.3px;
        }

        header {
          background: var(--white);
          padding: 15px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0,0,0,0.06);
        }
        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: var(--plum);
          font-weight: 700;
        }
        .logo-text span { color: var(--orange); }

        .hero {
          background: var(--grad-hero);
          padding: 52px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -70px; right: -70px;
          width: 260px; height: 260px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: -90px; left: -50px;
          width: 220px; height: 220px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
        }

        .check-circle {
          width: 70px; height: 70px;
          background: rgba(255,255,255,0.18);
          border: 2.5px solid rgba(255,255,255,0.45);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: popIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .check-circle svg { width: 32px; height: 32px; }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 5.5vw, 40px);
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
          margin-bottom: 12px;
          animation: fadeUp 0.55s 0.2s ease both;
        }
        .hero p {
          font-size: 14.5px;
          color: rgba(255,255,255,0.84);
          line-height: 1.65;
          max-width: 390px;
          margin: 0 auto;
          animation: fadeUp 0.55s 0.35s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .app-section {
          margin: 26px 16px;
          border-radius: 24px;
          overflow: hidden;
          animation: fadeUp 0.55s 0.65s ease both;
          box-shadow: 0 12px 48px rgba(123,63,140,0.18);
        }

        .app-header {
          background: var(--grad-hero);
          padding: 28px 24px 22px;
          position: relative;
          overflow: hidden;
        }
        .app-header::after {
          content: '';
          position: absolute;
          top: -50px; right: -50px;
          width: 180px; height: 180px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }

        .app-header-inner {
          display: flex;
          align-items: flex-end;
          gap: 16px;
        }
        .app-header-text { flex: 1; }
        .app-screenshot {
          width: 130px;
          flex-shrink: 0;
          margin-bottom: -22px;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.35));
          animation: floatUp 0.7s 0.5s cubic-bezier(0.34,1.4,0.64,1) both;
        }
        .app-screenshot img { width: 100%; display: block; border-radius: 16px; }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .app-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 100px;
          padding: 5px 13px;
          margin-bottom: 14px;
        }
        .app-badge span { font-size: 11px; color: white; font-weight: 600; letter-spacing: 0.6px; text-transform: uppercase; }

        .app-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 5vw, 30px);
          color: var(--white);
          font-weight: 700;
          line-height: 1.22;
          margin-bottom: 8px;
        }
        .app-header h2 em { font-style: italic; color: var(--blush-mid); }
        .app-header .subtitle {
          font-size: 13.5px;
          color: rgba(255,255,255,0.78);
          line-height: 1.6;
        }

        .app-body {
          background: var(--white);
          padding: 22px 22px 24px;
        }

        .app-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--blush-light);
          border: 1.5px solid var(--blush-mid);
          border-radius: 16px;
          padding: 14px;
          margin-bottom: 18px;
        }
        .app-icon {
          width: 54px; height: 54px;
          border-radius: 14px;
          background: var(--grad-btn);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .app-icon svg { width: 26px; height: 26px; fill: white; }
        .app-info { flex: 1; }
        .app-info .app-name { font-weight: 700; color: var(--plum); font-size: 15px; margin-bottom: 2px; }
        .app-info .app-meta { font-size: 11.5px; color: var(--text-soft); margin-bottom: 4px; }
        .stars { color: var(--orange); font-size: 12px; }

        .feature-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 20px;
        }
        .pill {
          background: linear-gradient(135deg, #FDE9F1, #FCF5F8);
          border: 1px solid var(--accent);
          border-radius: 100px;
          padding: 5px 12px;
          font-size: 12px;
          color: var(--plum);
          font-weight: 500;
          display: flex; align-items: center; gap: 5px;
        }

        .download-buttons { display: flex; flex-direction: column; gap: 11px; }

        .dl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 15px 20px;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.18s, box-shadow 0.18s;
          cursor: pointer;
          border: none;
        }
        .dl-btn:active { transform: scale(0.97); }

        .dl-btn-android {
          background: var(--grad-btn);
          color: white;
          box-shadow: 0 6px 24px rgba(255,129,0,0.35);
        }
        .dl-btn-android:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(255,129,0,0.45); }

        .dl-btn-ios {
          background: var(--plum);
          color: white;
          box-shadow: 0 6px 24px rgba(123,63,140,0.35);
        }
        .dl-btn-ios:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(123,63,140,0.45); }

        .dl-btn-icon { width: 26px; height: 26px; flex-shrink: 0; }
        .dl-btn-text { text-align: left; }
        .dl-btn-text .small { font-size: 10px; opacity: 0.75; text-transform: uppercase; letter-spacing: 0.5px; display: block; }
        .dl-btn-text .large { font-size: 16px; font-weight: 700; display: block; line-height: 1.2; }

        .or-divider {
          display: flex; align-items: center; gap: 10px;
          color: var(--text-soft); font-size: 12px;
        }
        .or-divider::before, .or-divider::after {
          content: ''; flex: 1; height: 1px; background: var(--blush-mid);
        }

        .qr-row {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--blush-light);
          border: 1px solid var(--blush-mid);
          border-radius: 14px;
          padding: 13px 15px;
          margin-top: 14px;
        }
        .qr-box {
          width: 68px; height: 68px;
          background: white;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          padding: 5px;
          border: 1px solid var(--blush-mid);
        }
        .qr-box img { width: 100%; height: 100%; object-fit: contain; border-radius: 6px; }
        .qr-text { font-size: 12px; color: var(--text-mid); line-height: 1.5; }
        .qr-text strong { color: var(--plum); font-size: 13px; display: block; margin-bottom: 2px; }

        .why-section {
          margin: 0 16px 26px;
          animation: fadeUp 0.55s 0.8s ease both;
        }
        .why-section h3 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--plum);
          margin-bottom: 14px;
          text-align: center;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .feature-card {
          background: var(--white);
          border-radius: 16px;
          padding: 18px 15px;
          border: 1.5px solid var(--blush-mid);
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .feature-card:nth-child(1)::before { background: var(--orange); }
        .feature-card:nth-child(2)::before { background: var(--accent); }
        .feature-card:nth-child(3)::before { background: var(--lavender); }
        .feature-card:nth-child(4)::before { background: var(--plum); }
        .feature-card .icon { font-size: 26px; margin-bottom: 9px; display: block; }
        .feature-card h4 { font-size: 13px; font-weight: 700; color: var(--text-dark); margin-bottom: 4px; line-height: 1.3; }
        .feature-card p { font-size: 11.5px; color: var(--text-soft); line-height: 1.5; }

        .social-proof {
          margin: 0 16px 26px;
          background: var(--white);
          border-radius: 20px;
          padding: 22px;
          border: 1.5px solid var(--blush-mid);
          animation: fadeUp 0.55s 0.9s ease both;
        }
        .rating-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .big-rating {
          font-family: 'Playfair Display', serif;
          font-size: 46px;
          font-weight: 700;
          color: var(--orange);
          line-height: 1;
        }
        .rating-stars { color: var(--orange); font-size: 17px; margin-bottom: 3px; }
        .rating-label { font-size: 12px; color: var(--text-soft); }

        .review-card {
          background: var(--blush-light);
          border-radius: 13px;
          padding: 14px 16px;
          border-left: 3px solid var(--orange);
        }
        .review-text {
          font-size: 13px;
          color: var(--text-mid);
          line-height: 1.65;
          margin-bottom: 8px;
          font-style: italic;
        }
        .review-author { font-size: 12px; font-weight: 700; color: var(--plum); }

        .sticky-cta {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--white);
          padding: 11px 14px 18px;
          box-shadow: 0 -4px 24px rgba(123,63,140,0.12);
          z-index: 100;
          display: flex;
          gap: 10px;
          animation: slideUp 0.45s 1.1s ease both;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .sticky-cta a {
          flex: 1;
          padding: 13px 10px;
          border-radius: 13px;
          text-align: center;
          font-weight: 700;
          font-size: 13.5px;
          text-decoration: none;
          transition: all 0.18s;
        }
        .sticky-android { background: var(--grad-btn); color: white; box-shadow: 0 4px 16px rgba(255,129,0,0.3); }
        .sticky-ios { background: var(--plum); color: white; box-shadow: 0 4px 16px rgba(123,63,140,0.3); }
        .sticky-cta .small-label { display: block; font-size: 10px; font-weight: 400; opacity: 0.75; margin-bottom: 2px; }
        .sticky-cta .btn-main { display: block; font-size: 15px; font-weight: 700; }

        .spacer { height: 88px; }

        footer {
          text-align: center;
          padding: 22px;
          font-size: 12px;
          color: var(--text-soft);
          border-top: 1px solid var(--blush-mid);
        }
        footer a { color: var(--plum); text-decoration: none; }

        @media (min-width: 600px) {
          .app-section, .why-section, .social-proof { margin-left: 40px; margin-right: 40px; }
          .download-buttons { flex-direction: row; }
          .dl-btn { flex: 1; }
          .features-grid { grid-template-columns: repeat(4, 1fr); }
          .sticky-cta {
            max-width: 480px;
            left: 50%;
            transform: translateX(-50%);
            animation: none;
            bottom: 12px;
            border-radius: 18px;
          }
        }
        @media (min-width: 900px) {
          .sticky-cta { display: none; }
          .spacer { height: 0; }
          .hero { padding: 72px 24px 80px; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar">
        📞 A senior specialist will call you within 1 minute — keep your phone nearby!
      </div>

      {/* HEADER */}
      <header>
        <span className="logo-text">
          Oasis <span>Fertility</span>
        </span>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="check-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1>
          You&apos;re All Set!<br />We&apos;ll Call You Shortly.
        </h1>
        <p>
          Thank you for taking the first step toward your dream of parenthood. While you wait, download the Oasis Saarathi app to manage your entire journey.
        </p>
      </section>

      {/* APP SECTION */}
      <div className="app-section">
        <div className="app-header">
          <div className="app-header-inner">
            <div className="app-header-text">
              <div className="app-badge">
                <span>⭐ Rated 4.9 on Play Store</span>
              </div>
              <h2>
                Download <em>Oasis Saarathi App</em> —<br />Your Fertility Companion
              </h2>
              <p className="subtitle">
                Track your treatment, view reports, book appointments &amp; get medication reminders — free for all Oasis patients.
              </p>
            </div>
            <div className="app-screenshot">
              <img src="/WhatsApp.webp" alt="App Screenshot" />
            </div>
          </div>
        </div>

        <div className="app-body">
          {/* App Card */}
          <div className="app-card">
            <div className="app-icon">
              <svg viewBox="0 0 24 24">
                <path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20zm5-4H7V4h10v12z" />
              </svg>
            </div>
            <div className="app-info">
              <div className="app-name">Oasis Saarathi</div>
              <div className="app-meta">Free · Medical App · Oasis Fertility</div>
              <div className="stars">
                ★★★★★{" "}
                <span style={{ color: "var(--text-soft)", fontSize: "11px" }}>
                  4.9 · 14 ratings
                </span>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="feature-pills">
            <div className="pill">📅 Appointments</div>
            <div className="pill">📋 Reports</div>
            <div className="pill">📚 Info Hub</div>
            <div className="pill">💬 Expert Chat</div>
            <div className="pill">🔒 100% Private</div>
          </div>

          {/* Download Buttons */}
          <div className="download-buttons">
            <a
              href="https://oasis-saarathi-app.oasisindia.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="dl-btn dl-btn-android"
            >
              <svg className="dl-btn-icon" viewBox="0 0 48 48">
                <defs>
                  <linearGradient id="g1" x1="9.8" x2="41" y1="9.9" y2="40.3" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#32a071" />
                    <stop offset=".07" stopColor="#2da65f" />
                    <stop offset=".48" stopColor="#15cf74" />
                    <stop offset=".8" stopColor="#06e775" />
                    <stop offset="1" stopColor="#17ff83" />
                  </linearGradient>
                  <linearGradient id="g2" x1="21.5" x2="45.3" y1="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffe000" />
                    <stop offset=".41" stopColor="#ffbd00" />
                    <stop offset=".78" stopColor="orange" />
                    <stop offset="1" stopColor="#ff9c00" />
                  </linearGradient>
                  <linearGradient id="g3" x1="11.7" x2="38.5" y1="31.5" y2="31.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ff3a44" />
                    <stop offset="1" stopColor="#c31162" />
                  </linearGradient>
                  <linearGradient id="g4" x1="7.1" x2="23.9" y1="16.5" y2="16.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#32a071" />
                    <stop offset=".07" stopColor="#2da65f" />
                    <stop offset=".48" stopColor="#15cf74" />
                    <stop offset=".8" stopColor="#06e775" />
                    <stop offset="1" stopColor="#17ff83" />
                  </linearGradient>
                </defs>
                <path fill="url(#g1)" d="M7 45.1L33.4 24 7 2.9C6.4 3.3 6 4 6 5v38c0 1 .4 1.7 1 2.1z" />
                <path fill="url(#g2)" d="M40.3 27.9L34.6 31 33.4 24l1.2-7 5.7 3.1c1.8 1 1.8 5.8 0 6.8z" />
                <path fill="url(#g3)" d="M34.6 31L7 45.1c.6.4 1.4.4 2.1 0l28.6-16L34.6 31z" />
                <path fill="url(#g4)" d="M9.1 2.9L34.6 17 31.8 24l-24.8-21c-.6-.4-1.4-.4-2.1 0z" />
              </svg>
              <div className="dl-btn-text">
                <span className="small">Get it on</span>
                <span className="large">Google Play</span>
              </div>
            </a>

            <div className="or-divider">or</div>

            <a
              href="https://oasis-saarathi-app.oasisindia.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="dl-btn dl-btn-ios"
            >
              <svg className="dl-btn-icon" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="dl-btn-text">
                <span className="small">iPhone</span>
                <span className="large"> App Store</span>
              </div>
            </a>
          </div>

          {/* QR Row */}
          <div className="qr-row">
            <div className="qr-box">
              <img src="/QR.jpg" alt="QR Code" />
            </div>
            <div className="qr-text">
              <strong>📱 Scan to Download Instantly</strong>
              Point your phone camera at this code — no typing needed. Opens directly in the Play Store.
            </div>
          </div>
        </div>
      </div>

      {/* WHY DOWNLOAD */}
      <section className="why-section">
        <h3>Everything You Need, In One App</h3>
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon">📅</span>
            <h4>Appointment Management</h4>
            <p>Book, reschedule &amp; track all clinic visits easily.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📋</span>
            <h4>Reports at a Tap</h4>
            <p>View all your test results &amp; records anytime.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📚</span>
            <h4>Information Hub</h4>
            <p>Trusted articles, videos, FAQs, and guidance.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🛡️</span>
            <h4>100% Private &amp; Secure</h4>
            <p>Your sensitive health data is fully protected.</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-proof">
        <div className="rating-row">
          <div className="big-rating">4.9</div>
          <div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-label">Google Play · 14 verified ratings</div>
          </div>
        </div>
        <div className="review-card">
          <div className="review-text">
            &ldquo;Oasis Saarathi is very helpful for fertility patients. It helps manage appointments, view reports, and get reminders on time. Everything is well organized — makes the treatment journey smooth and stress-free.&rdquo;
          </div>
          <div className="review-author">— Naga Aditya · Verified Oasis Patient ✓</div>
        </div>
      </section>

      <div className="spacer" />

      {/* FOOTER */}
      <footer>
        © 2026 Oasis Fertility &nbsp;·&nbsp;
        <a href="https://oasisindia.in/privacy-policy/">Privacy Policy</a> &nbsp;·&nbsp;
        <a href="mailto:support@oasisindia.in">App Support</a>
      </footer>

      {/* STICKY CTA */}
      <div className="sticky-cta">
        <a
          href="https://oasis-saarathi-app.oasisindia.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-android"
        >
          <span className="small-label">Android</span>
          <span className="btn-main">▶ Google Play</span>
        </a>
        <a
          href="https://oasis-saarathi-app.oasisindia.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-ios"
        >
          <span className="small-label">iPhone</span>
          <span className="btn-main"> App Store</span>
        </a>
      </div>
    </>
  );
}