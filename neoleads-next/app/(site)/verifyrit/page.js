import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import VerifyritScripts from '@/components/VerifyritScripts';

export const metadata = { title: 'Verifyrit | Email Validation by NeoLeads' };

export default function VerifyritPage() {
  return (
    <>
      <main>

      {/* ===================== HERO ===================== */}
      <section className="vr-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <span className="hero-badge" data-reveal>
            <Icon name="badge-check" aria-hidden="true" />
            Verifyrit | Email Validation by NeoLeads
          </span>
          <h1 data-reveal>
            Guarantee Your Spot in the<br />
            Inbox, <span className="accent">Every Single Time.</span>
          </h1>
          <p className="hero-sub" data-reveal>
            Verifyrit runs every contact through seven layers of validation: syntax, domain health,
            spam traps, catch-all resolution, and more, so you send with confidence, not fingers crossed.
          </p>
          <div className="vr-ctas" data-reveal>
            <a href="https://verifyrit.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">Start Verifying Free <Icon name="arrow-right" /></a>
            <button className="btn-ghost">See Verifyrit in Action</button>
          </div>
          <div className="vr-trust" data-reveal>
            <span className="item"><Icon name="circle-check" aria-hidden="true" /> 7 validation layers</span>
            <span className="item"><Icon name="circle-check" aria-hidden="true" /> Real-time &amp; bulk</span>
            <span className="item"><Icon name="circle-check" aria-hidden="true" /> Spam trap detection</span>
          </div>
          <div className="vr-dash" data-reveal>
            <img src="/Verifyrit Dashboard.png" alt="Verifyrit dashboard showing email verification results with file upload and status breakdown" />
          </div>
        </div>
      </section>

      {/* ===================== 7-LAYER VERIFICATION ===================== */}
      <section className="vr-section" id="layers">
        <div className="container">

          <div className="vr-section-head" data-reveal-stagger="80">
            <span className="zeus-eyebrow" data-reveal><Icon name="layers" aria-hidden="true" /> 7 Verification Layers</span>
            <h2 data-reveal>Verification That Goes Way<br />Beyond a Basic Ping</h2>
            <p data-reveal>Most tools check format and do a quick server handshake. Verifyrit runs every address through seven distinct checks, so the verdict is one you can actually trust.</p>
          </div>

          {/* 2x2 bento */}
          <div className="vr-bento">

            {/* 1 · Syntax & Format — text top, panel bottom */}
            <div className="vr-bcard" data-reveal>
              <div className="vr-bcard-text">
                <h3>Syntax &amp; Format Check</h3>
                <p>Catches malformed addresses, double-@ typos, invalid TLDs, and broken structures before anything else runs. The fastest filter on your list.</p>
              </div>
              <div className="vr-bcard-panel">
                <div className="vr-panel-label">Syntax Validation</div>
                <div className="syn-row invalid-row">
                  <span className="syn-mail-ic"><Icon name="mail" aria-hidden="true" /></span>
                  <span className="syn-email">m.cole@@helix.io</span>
                  <span className="syn-badge inv">Double @</span>
                </div>
                <div className="syn-corrected-row" id="synArrow">
                  <Icon name="arrow-right" aria-hidden="true" />
                  Corrected to
                  <Icon name="arrow-right" aria-hidden="true" />
                </div>
                <div className="syn-row valid-row" id="synValid" style={{ opacity: '0', transition: 'opacity 0.4s ease' }}>
                  <span className="syn-mail-ic"><Icon name="mail" aria-hidden="true" /></span>
                  <span className="syn-email">m.cole@helix.io</span>
                  <span className="syn-badge ok">Valid Syntax</span>
                </div>
                <div className="syn-footer">
                  <span className="syn-footer-ic"><Icon name="check" aria-hidden="true" /></span>
                  Layer 1 of 7: Syntax &amp; Format
                </div>
              </div>
            </div>

            {/* 2 · Domain & MX — panel top, text bottom */}
            <div className="vr-bcard" data-reveal>
              <div className="vr-bcard-panel dom-diag-on" id="domPanel">
                <div className="vr-panel-label">Domain Health</div>
                <div className="dom-top-row" id="domTopRow">
                  <span className="dom-globe-ic" id="domGlobe">
                    <Icon name="globe" aria-hidden="true" />
                    <span className="dom-globe-pulse" id="domGlobePulse" aria-hidden="true"></span>
                  </span>
                  <span className="dom-info">
                    <span className="dom-name" id="domName"></span>
                    <span className="dom-sub" id="domSub">Domain registered · active</span>
                  </span>
                  <span className="dom-live-badge" id="domLive">
                    <span className="dom-live-ring" aria-hidden="true"></span>
                    <svg className="dom-live-svg" viewBox="0 0 60 22" preserveAspectRatio="none" aria-hidden="true"><rect x="0.6" y="0.6" width="58.8" height="20.8" rx="5" /></svg>
                    <span className="dom-live-txt">LIVE</span>
                  </span>
                </div>
                <div className="dom-divider" id="domDivider"></div>
                <div className="dom-checks">
                  <div className="dom-check-row" id="domRow1">
                    <span className="dom-shimmer" aria-hidden="true"></span>
                    <span className="dom-check-lbl">MX Records</span>
                    <span className="dom-resval-wrap">
                      <span className="dom-check-val" id="domRes1"></span>
                      <span className="dom-mx-hosts" id="domMx"></span>
                    </span>
                  </div>
                  <div className="dom-check-row" id="domRow2">
                    <span className="dom-shimmer" aria-hidden="true"></span>
                    <span className="dom-check-lbl">Mail Server</span>
                    <span className="dom-check-val" id="domRes2"></span>
                  </div>
                  <div className="dom-check-row" id="domRow3">
                    <span className="dom-shimmer" aria-hidden="true"></span>
                    <span className="dom-check-lbl">Last checked</span>
                    <span className="dom-check-val dom-livecount" id="domRes3"></span>
                  </div>
                </div>
              </div>
              <div className="vr-bcard-text">
                <h3>Domain &amp; MX Record Validation</h3>
                <p>Confirms the domain is real, active, and has a working mail server configured to receive, before attempting a single SMTP handshake.</p>
              </div>
            </div>

            {/* 3 · Spam Trap — text top, panel bottom */}
            <div className="vr-bcard" data-reveal>
              <div className="vr-bcard-text">
                <h3>Spam Trap &amp; Risk Detection</h3>
                <p>Known honeypots, role-based addresses, and blacklisted domains surface automatically, so every address is screened before it can damage your sender score.</p>
              </div>
              <div className="vr-bcard-panel spam-anim-on" id="spamPanel">
                <div className="vr-panel-label">Risk Detection</div>
                <div className="spam-alert" id="spamAlert">
                  <div className="spam-ring" id="spamRing" aria-hidden="true"></div>
                  <div className="spam-alert-hd">
                    <span className="spam-icons" id="spamIcons">
                      <Icon name="zap" aria-hidden="true" />
                      <Icon name="triangle-alert" aria-hidden="true" />
                    </span>
                    <span className="spam-title" id="spamTitle"></span>
                  </div>
                  <div className="spam-email-wrap" id="spamEmailWrap">
                    <span className="spam-email-addr" id="spamEmail"></span>
                    <span className="spam-scan" id="spamScan" aria-hidden="true"></span>
                  </div>
                  <div className="spam-tags" id="spamTags"></div>
                </div>
                <div className="spam-protected" id="spamProtected">
                  <span className="spam-shield" id="spamShield" aria-hidden="true">
                    <span className="spam-shield-pulse"></span>
                    <Icon name="shield-check" aria-hidden="true" />
                  </span>
                  <span className="spam-protected-txt" id="spamProtectedTxt"></span>
                  <span className="spam-clear-sweep" id="spamClearSweep" aria-hidden="true"></span>
                </div>
              </div>
            </div>

            {/* 4 · Catch-All — panel top, text bottom */}
            <div className="vr-bcard" data-reveal>
              <div className="vr-bcard-panel catch-panel catch-anim-on" id="catchPanel">
                <div className="vr-panel-label">Catch-All Resolution</div>
                <div className="catch-box c-stop" id="catchStop">
                  <div className="catch-eyebrow stop-lbl" id="catchStopLbl"></div>
                  <div className="catch-email-row">
                    <span className="catch-email" id="catchStopEmail"></span>
                    <span className="catch-dots" id="catchDots" aria-hidden="true"><i></i><i></i><i></i></span>
                  </div>
                  <div className="catch-status" id="catchStatus"></div>
                  <div className="catch-bar" id="catchBar" aria-hidden="true"><span id="catchBarFill"></span></div>
                </div>
                <div className="catch-arrow-row" id="catchArrow">
                  <Icon name="arrow-down" aria-hidden="true" />
                </div>
                <div className="catch-box c-resolve" id="catchResolve">
                  <div className="catch-scan" id="catchScan" aria-hidden="true"></div>
                  <div className="catch-eyebrow resolve-lbl" id="catchResolveLbl"></div>
                  <div className="catch-email" id="catchResolveEmail"></div>
                  <div className="catch-readout">
                    <div className="catch-probe" id="catchProbe"></div>
                    <div className="catch-result" id="catchResult">
                      <span className="catch-r-icon" id="catchRicon" aria-hidden="true"></span>
                      <span className="catch-r-status" id="catchRstatus"></span>
                      <span className="catch-r-score" id="catchRscore"><span className="catch-r-score-lbl">Score:</span> <span className="catch-r-num" id="catchRnum"></span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vr-bcard-text">
                <h3>Catch-All Resolution</h3>
                <p>Where other tools return &#8216;unknown&#8217;, Verifyrit probes deeper, giving you a real deliverability score instead of a guess that costs you a bounce.</p>
              </div>
            </div>

          </div>{/* /vr-bento */}

          {/* Sender Reputation full-width */}
          <div className="vr-rep-card" id="repCard" data-reveal>
            <div className="rep-left">
              <div className="rep-market-pill"><Icon name="activity" aria-hidden="true" /> Market Pulse</div>
              <h3>Your sender reputation is burning right now with every stale list you send.</h3>
              <p>A 5% bounce rate can trigger inbox providers to start routing your entire domain to spam, not just the bounced addresses. Verifyrit cleans the list before the damage starts.</p>
              <div className="rep-stats">
                <div className="rep-stat">
                  <div className="rep-stat-num s-orange">22%</div>
                  <div className="rep-stat-cap">B2B data decay per year</div>
                </div>
                <div className="rep-stat">
                  <div className="rep-stat-num s-purple">5%</div>
                  <div className="rep-stat-cap">Bounce rate = domain risk</div>
                </div>
                <div className="rep-stat">
                  <div className="rep-stat-num s-purple">30%</div>
                  <div className="rep-stat-cap">B2B lists are catch-all</div>
                </div>
              </div>
            </div>
            <div className="rep-right">
              <div className="rep-right-title">Sender Reputation</div>
              <div className="rep-group">
                <div className="rep-group-hdr">
                  <span className="rep-cmp-lbl">Comparison</span>
                  <span className="rep-no-vr">Without Verifyrit</span>
                </div>
                <div className="rep-bar-row">
                  <span className="rep-bar-lbl">Inbox placement rate</span>
                  <div className="rep-bar-track"><div className="rep-bar-fill f-orange" data-w="62"></div></div>
                  <span className="rep-bar-pct">62%</span>
                </div>
                <div className="rep-bar-row">
                  <span className="rep-bar-lbl">Bounce rate</span>
                  <div className="rep-bar-track"><div className="rep-bar-fill f-red" data-w="56"></div></div>
                  <span className="rep-bar-pct">8.4%</span>
                </div>
                <div className="rep-bar-row">
                  <span className="rep-bar-lbl">Spam folder rate</span>
                  <div className="rep-bar-track"><div className="rep-bar-fill f-orange" data-w="70"></div></div>
                  <span className="rep-bar-pct">21%</span>
                </div>
              </div>
              <div className="rep-group">
                <div className="rep-group-hdr">
                  <span className="rep-with-vr">With Verifyrit</span>
                </div>
                <div className="rep-bar-row">
                  <span className="rep-bar-lbl">Inbox placement rate</span>
                  <div className="rep-bar-track"><div className="rep-bar-fill f-green" data-w="97"></div></div>
                  <span className="rep-bar-pct">97%</span>
                </div>
                <div className="rep-bar-row">
                  <span className="rep-bar-lbl">Bounce rate</span>
                  <div className="rep-bar-track"><div className="rep-bar-fill f-green" data-w="2"></div></div>
                  <span className="rep-bar-pct">&lt;0.3%</span>
                </div>
                <div className="rep-bar-row">
                  <span className="rep-bar-lbl">Spam folder rate</span>
                  <div className="rep-bar-track"><div className="rep-bar-fill f-green" data-w="3"></div></div>
                  <span className="rep-bar-pct">&lt;1%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== REAL-TIME VERIFICATION ===================== */}
      <section className="rt-section">
        <div className="container">
          <div className="rt-split" data-reveal-stagger="140">

            {/* Text side */}
            <div className="rt-text" data-reveal>
              <span className="rt-eyebrow">Real-Time Verification</span>
              <h2>Validate the Moment a Lead Arrives, Not After It's Already in a Campaign.</h2>
              <p>Verifyrit checks emails at the point of entry, whether from a Zeus search result, a form submission, or a CRM sync, so bad data never makes it into your list.</p>
              <div className="rt-features">
                <div className="rt-feat">
                  <div className="rt-feat-ic"><Icon name="zap" aria-hidden="true" /></div>
                  <div className="rt-feat-body">
                    <h4>Real-Time API Validation</h4>
                    <p>Connect Verifyrit to any form, CRM, or tool. Every new email is checked the instant it's captured, with no manual cleaning required.</p>
                  </div>
                </div>
                <div className="rt-feat">
                  <div className="rt-feat-ic"><Icon name="refresh-cw" aria-hidden="true" /></div>
                  <div className="rt-feat-body">
                    <h4>Continuous List Re-Verification</h4>
                    <p>B2B data decays at ~22% per year. Verifyrit re-validates your saved lists automatically, flagging addresses that have gone cold since your last campaign.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* UI card side */}
            <div className="rt-card" data-reveal>
              <div className="rt-card-label">Real-Time Check</div>
              <div className="rt-email-field">
                <div className="rt-email-ic"><Icon name="mail" aria-hidden="true" /></div>
                <span className="rt-email-addr">alex.ford@vertex.io</span>
              </div>
              <div className="rt-checks">
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">Syntax valid</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">Domain active</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">MX records present</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">SMTP handshake</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">No spam trap match</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">Catch-all resolved</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
                <div className="rt-check-row">
                  <div className="rt-check-dot"><Icon name="check" aria-hidden="true" /></div>
                  <span className="rt-check-name">Not disposable</span>
                  <span className="rt-pass-badge">PASS</span>
                </div>
              </div>
              <div className="rt-result">
                <div className="rt-result-ic"><Icon name="check" aria-hidden="true" /></div>
                <div>
                  <span className="rt-result-label">Deliverable</span>
                  <span className="rt-result-sub">7/7 checks passed &middot; Score: 95 &middot; Checked in 0.8s</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== BULK LIST CLEANING ===================== */}
      <section className="bl-section">
        <div className="container">
          <div className="bl-split" data-reveal-stagger="140">

            {/* Table card (left) */}
            <div className="bl-card" data-reveal>
              <div className="bl-table-head">
                <span className="bl-th">Email Address</span>
                <span className="bl-th">Status</span>
                <span className="bl-th">Checks</span>
                <span className="bl-th">Score</span>
                <span className="bl-th">Action</span>
              </div>
              <div className="bl-rows">
                <div className="bl-row">
                  <span className="bl-email">j.doe@acme.co</span>
                  <span className="bl-status ok"><span className="bl-dot ok"></span>Deliverable</span>
                  <span className="bl-checks">7/7</span>
                  <span className="bl-score">98</span>
                  <span className="bl-action send">&#8594; Sendrit</span>
                </div>
                <div className="bl-row">
                  <span className="bl-email">m.cole@helix.io</span>
                  <span className="bl-status inv"><span className="bl-dot inv"></span>Invalid</span>
                  <span className="bl-checks">2/7</span>
                  <span className="bl-score s-low">4</span>
                  <span className="bl-action remove">Removed</span>
                </div>
                <div className="bl-row">
                  <span className="bl-email">s.park@global.com</span>
                  <span className="bl-status risk"><span className="bl-dot risk"></span>Risky</span>
                  <span className="bl-checks">5/7</span>
                  <span className="bl-score">61</span>
                  <span className="bl-action flag">Flagged</span>
                </div>
                <div className="bl-row">
                  <span className="bl-email">admin@tech.io</span>
                  <span className="bl-status ok"><span className="bl-dot ok"></span>Deliverable</span>
                  <span className="bl-checks">7/7</span>
                  <span className="bl-score">95</span>
                  <span className="bl-action send">&#8594; Sendrit</span>
                </div>
                <div className="bl-row">
                  <span className="bl-email">hr@startup.net</span>
                  <span className="bl-status ok"><span className="bl-dot ok"></span>Deliverable</span>
                  <span className="bl-checks">6/7</span>
                  <span className="bl-score">84</span>
                  <span className="bl-action send">&#8594; Sendrit</span>
                </div>
                <div className="bl-row">
                  <span className="bl-email">trap@filter.org</span>
                  <span className="bl-status spam">
                    <span className="bl-spam-ic"><Icon name="x" aria-hidden="true" /></span>
                    Spam Trap
                  </span>
                  <span className="bl-checks">1/7</span>
                  <span className="bl-score s-low">0</span>
                  <span className="bl-action block">Blocked</span>
                </div>
              </div>
              <div className="bl-footer">
                <span className="bl-stat s-ok">4 ready to send</span>
                <span className="bl-stat s-rem">2 removed</span>
                <span className="bl-stat s-flag">1 flagged</span>
                <span className="bl-push"><Icon name="arrow-right" aria-hidden="true" /> Push all to Sendrit</span>
              </div>
            </div>

            {/* Text side (right) */}
            <div className="bl-text" data-reveal>
              <span className="bl-eyebrow">Bulk List Cleaning</span>
              <h2>Upload a List of Thousands. Get Back a Launch-Ready Campaign.</h2>
              <p>Drop in any size list, from 50 contacts to a 50,000-row CRM export, and Verifyrit processes every address, scores it, and pushes deliverable contacts straight to Sendrit.</p>
              <div className="bl-features">
                <div className="bl-feat">
                  <div className="bl-feat-ic"><Icon name="database" aria-hidden="true" /></div>
                  <div className="bl-feat-body">
                    <h4>Any Size, Any Source</h4>
                    <p>Upload via CSV, direct CRM sync, or straight from a Zeus search. Every input format works.</p>
                  </div>
                </div>
                <div className="bl-feat">
                  <div className="bl-feat-ic"><Icon name="send" aria-hidden="true" /></div>
                  <div className="bl-feat-body">
                    <h4>One-Click Handoff to Sendrit</h4>
                    <p>Every deliverable address is immediately available to launch in a Sendrit campaign, with no re-uploading and no formatting gaps.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== LIST HEALTH AT A GLANCE ===================== */}
      <section className="lh-section">
        <div className="container">

          <div className="lh-head" data-reveal-stagger="80">
            <span className="lh-badge" data-reveal>
              <Icon name="activity" aria-hidden="true" />
              List Health at a Glance
            </span>
            <h2 data-reveal>Know the Health of Every List<br />Before It Costs You</h2>
            <p data-reveal>Verifyrit's dashboard gives you a real-time picture of every list's validity score, bounce risk, and spam trap exposure, so you're never flying blind into a campaign.</p>
          </div>

          <div className="lh-cards" data-reveal-stagger="120">

            {/* Card 1: Deliverability Score */}
            <div className="lh-card" data-reveal>
              <div className="lh-card-icon">
                <Icon name="circle-check-big" aria-hidden="true" />
              </div>
              <h3 className="lh-card-title">Deliverability Score</h3>
              <p className="lh-card-desc">Every list gets an overall health score from 0–100, so you can see at a glance whether it's launch-ready or needs cleaning.</p>
              <div className="lh-gauge-wrap">
                <svg className="lh-gauge" viewBox="0 0 120 120" aria-hidden="true">
                  <defs>
                    <linearGradient id="lhGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6C2BDF" />
                      <stop offset="100%" stopColor="#A576F8" />
                    </linearGradient>
                  </defs>
                  <circle className="lh-gauge-bg" cx="60" cy="60" r="50" />
                  <circle className="lh-gauge-fill" cx="60" cy="60" r="50" />
                </svg>
                <div className="lh-gauge-inner">
                  <span className="lh-gauge-num">91</span>
                  <span className="lh-gauge-lbl">HEALTH</span>
                </div>
              </div>
              <div className="lh-score-badges">
                <span className="lh-sbadge green">Healthy</span>
                <span className="lh-sbadge teal">Launch-ready</span>
              </div>
              <div className="lh-stats">
                <div className="lh-stat-row">
                  <span className="lh-stat-name">Deliverable</span>
                  <span className="lh-stat-val green">96.2%</span>
                </div>
                <div className="lh-stat-row">
                  <span className="lh-stat-name">Invalid</span>
                  <span className="lh-stat-val red">2.4%</span>
                </div>
                <div className="lh-stat-row">
                  <span className="lh-stat-name">Risky</span>
                  <span className="lh-stat-val amber">1.4%</span>
                </div>
              </div>
            </div>

            {/* Card 2: Bounce Risk Breakdown */}
            <div className="lh-card" data-reveal>
              <div className="lh-card-icon purple">
                <Icon name="clock" aria-hidden="true" />
              </div>
              <h3 className="lh-card-title">Bounce Risk Breakdown</h3>
              <p className="lh-card-desc">See exactly which addresses are high-risk, which are safe, and which are catch-all, not buried in a raw CSV export.</p>
              <div className="lh-bounce-panel">
                <div className="lh-bp-label">Bounce Risk Breakdown</div>
                <div className="lh-bounce-bar">
                  <div className="lh-bb-seg green" style={{ width: '72%' }}></div>
                  <div className="lh-bb-seg yellow" style={{ width: '14%' }}></div>
                  <div className="lh-bb-seg orange" style={{ width: '9%' }}></div>
                  <div className="lh-bb-seg red" style={{ width: '5%' }}></div>
                </div>
                <div className="lh-bounce-legend">
                  <div className="lh-bl-row">
                    <span className="lh-bl-dot green"></span>
                    <span className="lh-bl-name">Deliverable</span>
                    <span className="lh-bl-pct">72%</span>
                  </div>
                  <div className="lh-bl-row">
                    <span className="lh-bl-dot yellow"></span>
                    <span className="lh-bl-name">Risky</span>
                    <span className="lh-bl-pct">14%</span>
                  </div>
                  <div className="lh-bl-row">
                    <span className="lh-bl-dot orange"></span>
                    <span className="lh-bl-name">Invalid</span>
                    <span className="lh-bl-pct">9%</span>
                  </div>
                  <div className="lh-bl-row">
                    <span className="lh-bl-dot red"></span>
                    <span className="lh-bl-name">Spam Trap</span>
                    <span className="lh-bl-pct">5%</span>
                  </div>
                </div>
                <div className="lh-bounce-rate">
                  <span>Projected bounce rate</span>
                  <span className="lh-br-val">14.1%</span>
                </div>
              </div>
            </div>

            {/* Card 3: Spam Trap Exposure Log */}
            <div className="lh-card" data-reveal>
              <div className="lh-card-icon purple">
                <Icon name="shield-alert" aria-hidden="true" />
              </div>
              <h3 className="lh-card-title">Spam Trap Exposure Log</h3>
              <p className="lh-card-desc">Every spam trap and known-risk address is logged and flagged separately, with a full audit trail, so you always know what was removed and why.</p>
              <div className="lh-spam-log">
                <div className="lh-sl-header">
                  <span className="lh-sl-title">Spam Trap Log</span>
                  <span className="lh-sl-badge">3 blocked</span>
                </div>
                <div className="lh-sl-rows">
                  <div className="lh-sl-row">
                    <div className="lh-sl-email-info">
                      <span className="lh-sl-email">[email&nbsp;protected]</span>
                      <span className="lh-sl-sub">Matched known honeypot database</span>
                    </div>
                    <span className="lh-sl-tag trap">SPAM TRAP</span>
                  </div>
                  <div className="lh-sl-row">
                    <div className="lh-sl-email-info">
                      <span className="lh-sl-email">[email&nbsp;protected]</span>
                      <span className="lh-sl-sub">Throwaway inbox provider</span>
                    </div>
                    <span className="lh-sl-tag disp">DISPOSABLE</span>
                  </div>
                  <div className="lh-sl-row">
                    <div className="lh-sl-email-info">
                      <span className="lh-sl-email">[email&nbsp;protected]</span>
                      <span className="lh-sl-sub">Shared inbox, high-complaint risk</span>
                    </div>
                    <span className="lh-sl-tag role">ROLE-BASED</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="section-label" data-reveal>CUSTOMER STORIES</span>
            <h2 data-reveal>Don't just take our word for it.</h2>
          </div>
          <div className="grid-3" data-reveal-stagger="120">
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"NeoLeads completely changed our outbound workflow. We went from 5% reply rate to over 23% in 3 weeks."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container.png" alt="James T." /><div><div className="name">James T.</div><div className="role">VP Sales, TechCorp</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"The pay-per-conversation model is genius. We only pay for actual results, not wasted software subscriptions."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-2.png" alt="Maria K." /><div><div className="name">Maria K.</div><div className="role">Founder, GrowthLab</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"NeoBrain AI is scary good. It replies to leads like a human, qualifies them and books meetings on autopilot."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-1.png" alt="Derek W." /><div><div className="name">Derek W.</div><div className="role">Head of Growth, ScaleUp</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"Setup was fast and the results came quickly. This is the future of outbound sales."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-6.png" alt="Priya S." /><div><div className="name">Priya S.</div><div className="role">Marketing Director, FintechHub</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"Best investment we made this year. Our pipeline has never been healthier."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-3.png" alt="Carlos M." /><div><div className="name">Carlos M.</div><div className="role">CEO, LaunchPad</div></div></div>
            </article>
            <article className="card testi-card" data-reveal>
              <div className="stars" aria-label="5 out of 5 stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
              <p className="quote">"The unified inbox alone is worth it. Managing 10 mailboxes from one place is a game changer."</p>
              <div className="testi-author"><img className="av" src="/avatars/Container-7.png" alt="Sophie L." /><div><div className="name">Sophie L.</div><div className="role">Sales Lead, Nexvio</div></div></div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== SECURITY ===================== */}
      <section className="section alt" id="security">
        <div className="container">
          <div className="section-head" data-reveal-stagger="100">
            <span className="security-pill" data-reveal><Icon name="shield-check" /> Compliant</span>
            <h2 data-reveal>Keep your organization secure<br />and compliant.</h2>
          </div>
          <div className="badges-row" data-reveal-stagger="80">
            <span className="comp-badge" title="AICPA SOC" data-reveal><img src="/logos/compliance-1.png" alt="AICPA SOC 2 certified" /></span>
            <span className="comp-badge" title="PCI DSS" data-reveal><img src="/logos/compliance-2.png" alt="PCI DSS compliant" /></span>
            <span className="comp-badge" title="GDPR" data-reveal><img src="/logos/compliance-3.png" alt="GDPR compliant" /></span>
            <span className="comp-badge" title="Privacy" data-reveal><img src="/logos/compliance-4.png" alt="Data privacy" /></span>
            <span className="comp-badge" title="CSA STAR Level One" data-reveal><img src="/logos/compliance-5.png" alt="CSA STAR Level One" /></span>
            <span className="comp-badge" title="ISO/IEC 27001" data-reveal><img src="/logos/compliance-6.png" alt="ISO/IEC 27001 certified" /></span>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="final-cta">
        <div className="container" data-reveal-stagger="100">
          <span className="section-label" data-reveal>GET STARTED</span>
          <h2 data-reveal>Ready to Send Without Fear<br />of the Spam Folder?</h2>
          <p data-reveal>Your list is only as good as your verification. Start verifying free, no credit card needed.</p>
          <div className="final-buttons" data-reveal>
            <a href="https://verifyrit.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">Start Verifying Free <Icon name="arrow-right" /></a>
            <button className="btn-ghost">Book a Demo</button>
          </div>
          <div className="final-trust" data-reveal>
            <span className="item"><Icon name="shield-check" /> SOC 2 Certified</span>
            <span className="item"><Icon name="check" /> No credit card</span>
            <span className="item"><Icon name="check" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      </main>

      <ClientScripts />
      <VerifyritScripts />
    </>
  );
}
