import Icon from '@/components/Icon';
import ClientScripts from '@/components/ClientScripts';
import Link from 'next/link';
import ZeusProspectingScripts from '@/components/ZeusProspectingScripts';

export const metadata = { title: 'Zeus Prospecting | NeoLeads' };

export default function ZeusProspectingPage() {
  return (
    <>
      <main>

      {/* ===================== ZEUS HERO ===================== */}
      <section className="zeus-hero">
        <div className="container" data-reveal-stagger="100" data-reveal-onload>
          <span className="hero-badge" data-reveal>
            <Icon name="zap" aria-hidden="true" />
            Zeus Prospecting
          </span>
          <h1 data-reveal>
            Stop Searching. Start Closing<br />
            with <span className="grow">High-Intent Leads.</span>
          </h1>
          <p className="hero-sub" data-reveal>
            Type what you're looking and Zeus searches millions of companies and contacts in real time to hand you a ranked list of verified decision-makers, each flagged with the signal that makes them worth reaching out to today.
          </p>
          <div className="zeus-ctas" data-reveal>
            <Link href="/zeus-coming-soon" className="btn-primary">Get Zeus Prospecting</Link>
            <button className="btn-ghost">Start Free Trial</button>
          </div>
          <div className="zeus-trust" data-reveal>
            <span className="item">
              <Icon name="circle-check" aria-hidden="true" />
              Continuously refreshed database
            </span>
            <span className="item">
              <Icon name="circle-check" aria-hidden="true" />
              Real-time buying signals
            </span>
            <span className="item">
              <Icon name="circle-check" aria-hidden="true" />
              Verified Contacts
            </span>
          </div>

          <div className="zeus-dash" data-reveal>
            <img src="/zeus-dashboard.png" alt="Zeus Prospecting dashboard showing a ranked, filterable list of verified contacts with company, title, location and buying signals" />
          </div>
        </div>
      </section>

      {/* ===================== FIND THE RIGHT PERSON ===================== */}
      <section className="zeus-section">
        <div className="container">
          <div className="zeus-section-head" data-reveal-stagger="100">
            <span className="zeus-eyebrow" data-reveal><Icon name="search" /> Search that actually understands you</span>
            <h2 data-reveal>Find the Right Person, the Moment<br />They're Ready</h2>
            <p data-reveal>Whether you're building a target list from scratch or chasing a single hot account, Zeus turns a plain-English description into a verified, ranked list of decision-makers.</p>
          </div>

          <div className="bento" data-reveal-stagger="120">
            {/* Card 1: AI Search */}
            <article className="bento-card" data-reveal>
              <div className="bc-text">
                <h3>AI Search</h3>
                <p>Describe your ideal buyer in a sentence. Zeus finds them, no filter-stacking required.</p>
              </div>
              <div className="bc-panel" id="aiSearchPanel">
                <div className="ai-search">
                  <Icon name="search" />
                  <span className="as-text"><span className="as-typed"></span><span className="cursor" aria-hidden="true">|</span></span>
                  <button className="as-btn" type="button">Search<span className="as-ripple" aria-hidden="true"></span></button>
                  <svg className="as-scan" aria-hidden="true" preserveAspectRatio="none">
                    <rect className="as-scan-rect"></rect>
                    <rect className="as-scan-rest"></rect>
                  </svg>
                </div>
                <div className="ai-chips">
                  <span className="ai-chip-row"></span>
                  <span className="matches"></span>
                </div>
                <div className="ai-results"></div>
                <div className="ai-scanline" aria-hidden="true"></div>
                {/* Static fallback (prefers-reduced-motion / no-JS) */}
                <noscript>
                  <div style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    Tom Keller · CEO · Arc Pay · 96 &nbsp;|&nbsp; Rhea Vance · Founder · Ledgr · 93
                  </div>
                </noscript>
              </div>
            </article>

            {/* Card 2: Verified Contacts */}
            <article className="bento-card" data-reveal>
              <div className="bc-panel" id="vcPanel">
                <div className="vc-body">
                  <div className="vc-head">
                    <span className="vc-av-wrap">
                      <img className="vc-av" src="/avatars/Container-6.png" alt="" />
                      <span className="vc-ring" aria-hidden="true"></span>
                    </span>
                    <div className="vc-id"><div className="vc-name"></div><div className="vc-sub"></div></div>
                    <span className="vc-via">
                      <span className="vc-via-txt">via Verifyrit</span>
                      <svg className="vc-via-svg" aria-hidden="true" preserveAspectRatio="none"><rect className="vc-via-rect"></rect></svg>
                    </span>
                  </div>
                  <div className="vc-row" data-field="email">
                    <Icon name="mail" />
                    <span className="vc-val link"></span>
                    <span className="vc-dots" aria-hidden="true"><span></span><span></span><span></span></span>
                    <span className="vc-spacer"></span>
                    <span className="vc-valid">
                      <svg className="vc-check" viewBox="0 0 22 22" aria-hidden="true">
                        <circle className="vc-check-c" cx="11" cy="11" r="9"></circle>
                        <path className="vc-check-p" d="M6.4 11.3 L9.5 14.4 L15.6 7.4"></path>
                      </svg>
                      <span className="vc-valid-txt">VALID</span>
                    </span>
                    <span className="vc-beam" aria-hidden="true"></span>
                  </div>
                  <div className="vc-row" data-field="phone">
                    <Icon name="phone" />
                    <span className="vc-val plain"></span>
                    <span className="vc-dots" aria-hidden="true"><span></span><span></span><span></span></span>
                    <span className="vc-spacer"></span>
                    <span className="vc-valid">
                      <svg className="vc-check" viewBox="0 0 22 22" aria-hidden="true">
                        <circle className="vc-check-c" cx="11" cy="11" r="9"></circle>
                        <path className="vc-check-p" d="M6.4 11.3 L9.5 14.4 L15.6 7.4"></path>
                      </svg>
                      <span className="vc-valid-txt">VALID</span>
                    </span>
                    <span className="vc-beam" aria-hidden="true"></span>
                  </div>
                  <div className="vc-foot">
                    <span className="recheck">Re-checked 4 min ago</span>
                    <span className="deliver"><span className="deliver-num">0.0%</span> <span className="deliver-lbl">DELIVERABLE</span></span>
                  </div>
                </div>
                {/* Static fallback (prefers-reduced-motion / no-JS) */}
                <noscript>
                  <div style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    Sofia Lang · VP Marketing · Vertex · sofia@vertex.io VALID · +1 (415) 660-0112 VALID · 99.2% DELIVERABLE
                  </div>
                </noscript>
              </div>
              <div className="bc-text">
                <h3>Verified Contacts</h3>
                <p>Every email and direct dial is checked against continuously refreshed records, paired live with Verifyrit.</p>
              </div>
            </article>

            {/* Card 3: Buying Signals */}
            <article className="bento-card" data-reveal>
              <div className="bc-text">
                <h3>Buying Signals</h3>
                <p>Funding rounds, leadership changes, and hiring sprees surface next to every contact, automatically.</p>
              </div>
              <div className="bc-panel" id="bsPanel">
                <svg className="bs-border" preserveAspectRatio="none" aria-hidden="true">
                  <rect className="bs-border-rect" x="1" y="1" rx="13" ry="13" />
                </svg>
                <div className="bs-head">
                  <span className="bs-ping"></span>
                  <span className="bs-title">Live signal feed</span>
                  <span className="bs-stream">
                    <span className="bs-dot-wrap">
                      <span className="bs-ring"></span>
                      <span className="bs-ring2"></span>
                      <span className="bs-dot"></span>
                    </span>
                    <span className="bs-stream-txt">Streaming</span>
                  </span>
                </div>
                <div className="bs-feed">{/* signal rows injected by script */}</div>
              </div>
            </article>

            {/* Card 4: Smart Scoring */}
            <article className="bento-card" id="ssCard" data-reveal>
              <div className="bc-panel" id="ssPanel">
                <div className="ss-top">
                  <span className="ss-lbl">Avg. Fit<br />Score</span>
                  <div className="ss-score">
                    <span className="ss-num" id="ssNum">92</span>
                    <span className="ss-delta" id="ssDelta">↑ <span id="ssDNum">+8</span><span className="ss-ripple" id="ssRipple"></span></span>
                  </div>
                </div>
                <div className="ss-chart-wrap">
                  <svg className="ss-chart" id="ssChartSvg" viewBox="0 0 360 120" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="ssFillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" id="ssFillStop" stopColor="#9333EA" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#9333EA" stopOpacity="0"/>
                      </linearGradient>
                      <clipPath id="ssRefClip">
                        <rect id="ssRefRect" x="0" y="0" width="0" height="120"/>
                      </clipPath>
                    </defs>
                    <line id="ssRefLine"
                          x1="0" y1="58" x2="360" y2="58"
                          stroke="rgba(255,255,255,0.18)" strokeWidth="1"
                          strokeDasharray="4 4"
                          clipPath="url(#ssRefClip)"/>
                    <path id="ssFillPath"
                          d="M0,82 C32,80 50,58 76,60 C104,62 115,80 144,82 C173,84 187,72 220,68 C252,64 270,40 299,38 C317,37 331,56 360,66 L360,120 L0,120 Z"
                          fill="url(#ssFillGrad)" opacity="0"/>
                    <path id="ssLinePath"
                          d="M0,82 C32,80 50,58 76,60 C104,62 115,80 144,82 C173,84 187,72 220,68 C252,64 270,40 299,38 C317,37 331,56 360,66"
                          fill="none" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle id="ssDot" cx="0" cy="82" r="4" fill="#9333EA" opacity="0"/>
                  </svg>
                </div>
                <div className="ss-pills" id="ssPills">
                  <span className="ss-pill" data-ss-tab="0">ICP Fit</span>
                  <span className="ss-pill" data-ss-tab="1">Intent</span>
                  <span className="ss-pill" data-ss-tab="2">Timing</span>
                  <div className="ss-ind" id="ssInd"></div>
                </div>
              </div>
              <div className="bc-text">
                <h3>Smart Scoring</h3>
                <p>Zeus AI ranks every result by fit and intent, so your best leads rise to the top automatically.</p>
              </div>
            </article>

            {/* Card 5: Watch Your Whole Market Move (full width) */}
            <article className="bento-card full" id="mpCard">
              <div className="mp">
                <div className="mp-left">
                  <span className="mp-pill" data-mp-el="pill">Market Pulse</span>
                  <h3 data-mp-el="h3"><span data-mp-el="line1">Watch Your Whole</span><br /><span data-mp-el="line2">Market Move</span></h3>
                  <p data-mp-el="sub">Zeus tracks new matches and fresh signals across your saved searches every day, so you always know when activity in your target market is heating up.</p>
                  <div className="mp-stats" data-mp-el="statsblock">
                    <div className="mp-stat">
                      <div className="mp-num" data-mp-el="stat1">1,284</div>
                      <div className="mp-cap" data-mp-el="cap1">New matches / wk</div>
                    </div>
                    <div className="mp-stat">
                      <div className="mp-num green" data-mp-el="stat2">+18%</div>
                      <div className="mp-cap" data-mp-el="cap2">vs last week</div>
                    </div>
                  </div>
                </div>
                <div className="mp-chart-card" data-mp-el="chartcard">
                  <div className="mp-chart-head">
                    <span className="t">Signals this month</span>
                    <span className="mp-toggle">
                      <span data-mp-el="btn30">30d</span>
                      <span data-mp-el="btn90" className="active">90d</span>
                    </span>
                  </div>
                  <div className="mp-chart-svg-wrap" data-mp-el="svgwrap"></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== AUTOPILOT / RANKED SHORTLIST ===================== */}
      <section className="split-section">
        <div className="container">

          {/* Row 1: Set It Once. Zeus Keeps Watching. */}
          <div className="split" data-reveal-stagger="140">
            <div className="split-text" data-reveal>
              <span className="split-eyebrow">Search on Autopilot</span>
              <h2>Set It Once. Zeus Keeps Watching.</h2>
              <p>Save a search and Zeus keeps monitoring your market for you, surfacing new matches and fresh signals the moment they appear.</p>
              <div className="feat-list">
                <div className="feat-item">
                  <span className="feat-ic"><Icon name="bookmark" /></span>
                  <div className="feat-body">
                    <h4>Saved Searches</h4>
                    <p>Turn any search into a living list that updates itself as your market changes.</p>
                  </div>
                </div>
                <div className="feat-item">
                  <span className="feat-ic"><Icon name="bell" /></span>
                  <div className="feat-body">
                    <h4>Signal Alerts</h4>
                    <p>Get notified the instant a saved-search contact shows a buying signal worth acting on.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="saved-card" data-reveal>
              <div className="saved-head">
                <span className="st"><Icon name="bookmark" /> Saved Search</span>
                <span className="saved-live"><span className="dot"></span>Live</span>
              </div>
              <div className="saved-query">
                <div className="q1">VP Sales · Series B SaaS · United States</div>
                <div className="q2">Created 14 days ago · Auto-updating</div>
              </div>
              <div className="saved-actions">
                <button className="saved-new"><Icon name="plus" /> 3 new matches this week</button>
                <span className="saved-alerts"><span className="dot"></span>Alerts ON</span>
              </div>
              <div className="saved-people">
                <div className="saved-avs">
                  <img className="av-init" src="/avatars/Container-1.png" alt="" />
                  <img className="av-init" src="/avatars/Container-3.png" alt="" />
                  <img className="av-init" src="/avatars/Container-4.png" alt="" />
                  <img className="av-init" src="/avatars/Container-7.png" alt="" />
                  <img className="av-init" src="/avatars/Container-5.png" alt="" />
                </div>
                <span className="saved-total">217 total matches</span>
              </div>
              <div className="saved-rs-label">Recent signals</div>
              <div className="saved-sig">
                <img className="av-init" src="/avatars/Container-7.png" alt="Sarah Chen" />
                <span className="stext"><span className="sname">Sarah Chen</span><span className="sevent"> · Raised $18M</span></span>
                <span className="stime">2h ago</span>
              </div>
              <div className="saved-sig">
                <img className="av-init" src="/avatars/Container-1.png" alt="Marcus Reid" />
                <span className="stext"><span className="sname">Marcus Reid</span><span className="sevent"> · Hiring 8 SDRs</span></span>
                <span className="stime">5h ago</span>
              </div>
              <div className="saved-sig">
                <img className="av-init" src="/avatars/Container-6.png" alt="Amara Osei" />
                <span className="stext"><span className="sname">Amara Osei</span><span className="sevent"> · New CRO role</span></span>
                <span className="stime">1d ago</span>
              </div>
            </div>
          </div>

          {/* Row 2: Every Result Is a Ranked, Verified Shortlist */}
          <div className="split flip" data-reveal-stagger="140">
            <div className="ranked-card" data-reveal>
              <div className="ranked-head">
                <span className="ranked-title"><Icon name="filter" /> Ranked Results · 4,218 contacts</span>
                <div className="ranked-btns">
                  <span className="ranked-btn export">Export <Icon name="arrow-right" /></span>
                  <span className="ranked-btn crm">Push to CRM</span>
                </div>
              </div>
              <div className="ranked-scroll">
                <table className="ranked-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Signal</th>
                      <th className="col-score">Score</th>
                      <th className="col-check"><Icon name="check" style={{ width: '13px', height: '13px' }} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="rt-name"><img className="av-init" src="/avatars/Container-7.png" alt="Sarah Chen" /><span className="n">Sarah Chen</span></span></td>
                      <td className="rt-co">Acme Cloud</td>
                      <td><span className="sig-pill purple">Series B Funding</span></td>
                      <td className="col-score rt-score">96</td>
                      <td className="col-check rt-check ok"><Icon name="circle-check-big" /></td>
                    </tr>
                    <tr>
                      <td><span className="rt-name"><img className="av-init" src="/avatars/Container-1.png" alt="Marcus Reid" /><span className="n">Marcus Reid</span></span></td>
                      <td className="rt-co">TechFlow Inc</td>
                      <td><span className="sig-pill green">Hiring Spree</span></td>
                      <td className="col-score rt-score">92</td>
                      <td className="col-check rt-check ok"><Icon name="circle-check-big" /></td>
                    </tr>
                    <tr>
                      <td><span className="rt-name"><img className="av-init" src="/avatars/Container-6.png" alt="Amara Osei" /><span className="n">Amara Osei</span></span></td>
                      <td className="rt-co">DataBridge</td>
                      <td><span className="sig-pill teal">New CRO</span></td>
                      <td className="col-score rt-score">89</td>
                      <td className="col-check rt-check ok"><Icon name="circle-check-big" /></td>
                    </tr>
                    <tr>
                      <td><span className="rt-name"><img className="av-init" src="/avatars/Container-3.png" alt="James Park" /><span className="n">James Park</span></span></td>
                      <td className="rt-co">Velocity AI</td>
                      <td><span className="sig-pill amber">EMEA Expansion</span></td>
                      <td className="col-score rt-score">84</td>
                      <td className="col-check rt-check ok"><Icon name="circle-check-big" /></td>
                    </tr>
                    <tr>
                      <td><span className="rt-name"><img className="av-init" src="/avatars/Container-2.png" alt="Lena Fischer" /><span className="n">Lena Fischer</span></span></td>
                      <td className="rt-co">Nexus Labs</td>
                      <td><span className="sig-pill purple">Funding Round</span></td>
                      <td className="col-score rt-score">81</td>
                      <td className="col-check rt-check warn"><Icon name="circle-alert" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="split-text" data-reveal>
              <span className="split-eyebrow">Built for Real Pipelines</span>
              <h2>Every Result Is a Ranked, Verified Shortlist</h2>
              <p>No more raw exports. Every Zeus search returns a clean, sortable list, ready to act on or hand straight to your outreach campaign.</p>
              <div className="feat-list">
                <div className="feat-item">
                  <span className="feat-ic"><Icon name="target" /></span>
                  <div className="feat-body">
                    <h4>Fit-Ranked Results</h4>
                    <p>Closest matches to your ICP rise automatically, with no manual sorting required.</p>
                  </div>
                </div>
                <div className="feat-item">
                  <span className="feat-ic"><Icon name="send" /></span>
                  <div className="feat-body">
                    <h4>One-Click Handoff</h4>
                    <p>Push any list straight into Sendrit for a campaign, or sync to your CRM in a click.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== LEAD OVERVIEW ===================== */}
      <section className="zeus-section">
        <div className="container">
          <div className="zeus-section-head" data-reveal-stagger="100">
            <span className="zeus-eyebrow" data-reveal><Icon name="layout-dashboard" /> Lead Overview</span>
            <h2 data-reveal>Get a Quick Overview of Every<br />Lead in One Place</h2>
            <p data-reveal>From verification status to buying signals to fit score, every contact's full picture is visible at a glance, organized and up to date in real time.</p>
          </div>

          <div className="overview-grid" data-reveal-stagger="120">
            {/* Card 1: Real-Time Contact Status */}
            <article className="ov-card" data-reveal>
              <span className="ov-ic green"><Icon name="circle-check-big" /></span>
              <h3>Real-Time Contact Status</h3>
              <p>Always know whether an email or number has been freshly verified.</p>
              <div className="ov-field">
                <div className="fb"><div className="flabel">Email</div><div className="fval">sarah@acme.io</div></div>
                <span className="fcheck"><Icon name="circle-check-big" /></span>
              </div>
              <div className="ov-field">
                <div className="fb"><div className="flabel">Mobile</div><div className="fval">+1 (555) 982-1234</div></div>
                <span className="fcheck"><Icon name="circle-check-big" /></span>
              </div>
              <div className="ov-field">
                <div className="fb"><div className="flabel">LinkedIn</div><div className="fval">linkedin.com/in/schen</div></div>
                <span className="fcheck"><Icon name="circle-check-big" /></span>
              </div>
            </article>

            {/* Card 2: Signal Timeline */}
            <article className="ov-card" data-reveal>
              <span className="ov-ic purple"><Icon name="clock" /></span>
              <h3>Signal Timeline</h3>
              <p>See every buying signal tied to a contact, from funding news to job changes.</p>
              <div className="ov-timeline">
                <div className="ov-tl">
                  <span className="ov-dot purple"></span>
                  <div className="ov-tl-body"><div className="t">Raised $18M Series B</div><div className="d">Dec 12</div></div>
                </div>
                <div className="ov-tl">
                  <span className="ov-dot purple"></span>
                  <div className="ov-tl-body"><div className="t">Hired 12 Sales Reps</div><div className="d">Dec 18</div></div>
                </div>
                <div className="ov-tl">
                  <span className="ov-dot green"></span>
                  <div className="ov-tl-body"><div className="t">New CRO Appointed</div><div className="d">Jan 3</div></div>
                </div>
                <div className="ov-tl">
                  <span className="ov-dot purple"></span>
                  <div className="ov-tl-body"><div className="t">Expanded to EMEA</div><div className="d">Jan 9</div></div>
                </div>
              </div>
            </article>

            {/* Card 3: Fit & Intent Score */}
            <article className="ov-card" data-reveal>
              <span className="ov-ic purple"><Icon name="target" /></span>
              <h3>Fit &amp; Intent Score</h3>
              <p>Track how each lead ranks against your ICP, updated automatically as new signals appear.</p>
              <div className="ov-gauge">
                <div className="ov-gauge-wrap">
                  <svg viewBox="0 0 180 104" aria-hidden="true">
                    <defs><linearGradient id="ovGauge" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6C2BDF"/><stop offset="100%" stopColor="#A576F8"/>
                    </linearGradient></defs>
                    <path d="M14,94 A76,76 0 0 1 166,94" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" strokeLinecap="round"/>
                    <path d="M14,94 A76,76 0 0 1 166,94" fill="none" stroke="url(#ovGauge)" strokeWidth="11" strokeLinecap="round" strokeDasharray="238.8" strokeDashoffset="31"/>
                  </svg>
                  <div className="gval-wrap"><div className="gval">87</div><div className="glabel">Fit Score</div></div>
                </div>
                <div className="ov-pills">
                  <div className="ov-pill"><div className="pv">92%</div><div className="pl">ICP Fit</div></div>
                  <div className="ov-pill"><div className="pv">High</div><div className="pl">Intent</div></div>
                  <div className="ov-pill"><div className="pv">Now</div><div className="pl">Timing</div></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== NETWORK INTELLIGENCE ===================== */}
      <section className="network" id="network">
        <div className="container">
          <div className="zeus-section-head" style={{ maxWidth: '720px' }} data-reveal-stagger="100">
            <span className="zeus-eyebrow" data-reveal><Icon name="waypoints" /> Network Intelligence</span>
            <h2 data-reveal>Zeus Finds the <span className="accent">Right People.</span><br />And Tells You When to Reach Out.</h2>
            <p data-reveal>Zeus doesn&rsquo;t just surface contacts. It maps the full relationship graph around your ICP: shared signals, mutual connections, and warm paths that cold lists can never reveal.</p>
          </div>

          <div className="map-stage" data-reveal data-reveal-delay="150">
            <img className="map-img" src="/Map%20Website.svg" alt="" aria-hidden="true" />

            {/* connector overlay (1419 x 616 coordinate space). Hub = Jeremiah (710,296) */}
            <svg className="map-lines" viewBox="0 0 1419 616" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <g className="statics">
                <path className="line-static" d="M710 296 Q740 190 710 99" />
                <path className="line-static" d="M710 296 Q500 200 341 160" />
                <path className="line-static" d="M710 296 Q450 300 227 333" />
                <path className="line-static" d="M710 296 Q540 410 426 480" />
                <path className="line-static" d="M710 296 Q880 410 993 480" />
                <path className="line-static" d="M710 296 Q980 300 1192 320" />
                <path className="line-static" d="M710 296 Q920 200 1078 160" />
              </g>
              <g className="flows">
                <path className="line-flow" style={{ animationDuration: '8s' }}   d="M710 296 Q740 190 710 99" />
                <path className="line-flow" style={{ animationDuration: '10s' }}  d="M710 296 Q500 200 341 160" />
                <path className="line-flow" style={{ animationDuration: '9s' }}   d="M710 296 Q450 300 227 333" />
                <path className="line-flow" style={{ animationDuration: '11s' }}  d="M710 296 Q540 410 426 480" />
                <path className="line-flow" style={{ animationDuration: '8.5s' }} d="M710 296 Q880 410 993 480" />
                <path className="line-flow" style={{ animationDuration: '12s' }}  d="M710 296 Q980 300 1192 320" />
                <path className="line-flow" style={{ animationDuration: '9.5s' }} d="M710 296 Q920 200 1078 160" />
              </g>
            </svg>

            {/* avatar pins, spread around the map. The hub at center is the
                convergence point for the connector lines (no avatar rendered). */}
            <div className="map-node glow" style={{ left: '50%', top: '16%', animationDelay: '0s' }}>
              <img src="/avatars/Container-2.png" alt="Balia Daniela" />
              <span className="nlabel"><b>Balia Daniela</b><span>VP Sales</span></span>
            </div>
            <div className="map-node" style={{ left: '24%', top: '26%', animationDelay: '1.2s' }}>
              <img src="/avatars/Container-1.png" alt="Cody Fisher" />
              <span className="nlabel"><b>Cody Fisher</b><span>CRO</span></span>
            </div>
            <div className="map-node" style={{ left: '16%', top: '54%', animationDelay: '.5s' }}>
              <img src="/avatars/Container.png" alt="Albert Flores" />
              <span className="nlabel"><b>Albert Flores</b><span>VP Growth</span></span>
            </div>
            <div className="map-node" style={{ left: '30%', top: '78%', animationDelay: '2.1s' }}>
              <img src="/avatars/Container-7.png" alt="Lena Park" />
              <span className="nlabel"><b>Lena Park</b><span>Head of Growth</span></span>
            </div>
            <div className="map-node glow" style={{ left: '70%', top: '78%', animationDelay: '1.5s' }}>
              <img src="/avatars/Container-6.png" alt="Tynisha Obey" />
              <span className="nlabel"><b>Tynisha Obey</b><span>VP Sales</span></span>
            </div>
            <div className="map-node glow" style={{ left: '84%', top: '52%', animationDelay: '.3s' }}>
              <img src="/avatars/Container-4.png" alt="Andrew Cole" />
              <span className="nlabel"><b>Andrew Cole</b><span>VP Sales</span></span>
            </div>
            <div className="map-node" style={{ left: '76%', top: '26%', animationDelay: '1.7s' }}>
              <img src="/avatars/Container-5.png" alt="Marcus Lee" />
              <span className="nlabel"><b>Marcus Lee</b><span>Head of Sales</span></span>
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
          <h2 data-reveal>Ready to Stop Guessing Who to Contact?</h2>
          <p data-reveal>Your next customer is already searchable. Ask Zeus, and find them in seconds.</p>
          <div className="final-buttons" data-reveal>
            <button className="btn-primary">Start for Free <Icon name="arrow-right" /></button>
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
      <ZeusProspectingScripts />
    </>
  );
}
